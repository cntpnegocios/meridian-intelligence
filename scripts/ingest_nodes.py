import os
#!/usr/bin/env python3
"""
Meridian Intelligence — Global Transport Node Ingestor v2
Sources:
  - UN/LOCODE: datasets/un-locode on GitHub (CSV, public domain mirror)
  - NGA World Port Index: GitHub mirror (US Gov, public domain)  
  - OurAirports: Direct CSV (public domain, 74K airports)

All real authoritative data. No mocks. No fabrication.
Inserts via direct psycopg2 connection to Supabase.
"""
import io, csv, json, zipfile, logging, requests, psycopg2, psycopg2.extras
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
log = logging.getLogger("ingest")

DB_URL = os.getenv("DATABASE_URL")

# ── Source URLs (all public domain / open government) ──────────────────────
LOCODE_CSV_URL   = "https://raw.githubusercontent.com/datasets/un-locode/main/data/code-list.csv"
NGA_WPI_URL      = "https://raw.githubusercontent.com/tayljordan/ports/main/ports.json"
OURAIRPORTS_URL  = "https://davidmegginson.github.io/ourairports-data/airports.csv"

EU_ISO = {'AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','HR',
          'HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK'}

COUNTRY_NAMES = {
    'BR':'Brazil','NL':'Netherlands','ES':'Spain','DE':'Germany','BE':'Belgium',
    'FR':'France','IT':'Italy','PT':'Portugal','GB':'United Kingdom','US':'United States',
    'SG':'Singapore','CN':'China','JP':'Japan','KR':'South Korea','AU':'Australia',
    'AE':'United Arab Emirates','SA':'Saudi Arabia','IN':'India','ZA':'South Africa',
    'AR':'Argentina','MX':'Mexico','CA':'Canada','NG':'Nigeria','EG':'Egypt',
    'MA':'Morocco','GR':'Greece','DK':'Denmark','SE':'Sweden','FI':'Finland',
    'NO':'Norway','PL':'Poland','TR':'Turkey','UA':'Ukraine','RU':'Russia',
    'CL':'Chile','PE':'Peru','CO':'Colombia','PA':'Panama','VE':'Venezuela',
    'MY':'Malaysia','ID':'Indonesia','TH':'Thailand','PH':'Philippines','VN':'Vietnam',
    'ZA':'South Africa','KE':'Kenya','TZ':'Tanzania','GH':'Ghana','SN':'Senegal',
}

def country_name(iso: str) -> str:
    return COUNTRY_NAMES.get(iso, iso)


def upsert_batch(cur, records: list, batch_size: int = 500) -> int:
    if not records:
        return 0
    
    cols = list(records[0].keys())
    
    # Build ON CONFLICT DO UPDATE clause
    update_cols = [c for c in cols if c not in ('id','created_at')]
    update_clause = ", ".join(f"{c}=EXCLUDED.{c}" for c in update_cols)
    
    # Unique key: (unlocode) for ports, (icao) for airports
    conflict_target = """
        ON CONFLICT (unlocode) WHERE unlocode IS NOT NULL DO UPDATE SET """ + update_clause + """
    """
    
    placeholders = "(" + ",".join(["%s"] * len(cols)) + ")"
    col_str = "(" + ",".join(cols) + ")"
    sql = f"""
        INSERT INTO transport_nodes {col_str} VALUES {placeholders}
        ON CONFLICT DO NOTHING
    """
    
    inserted = 0
    for i in range(0, len(records), batch_size):
        chunk = records[i:i+batch_size]
        values = [[r.get(c) for c in cols] for r in chunk]
        try:
            psycopg2.extras.execute_batch(cur, sql, values, page_size=batch_size)
            inserted += len(chunk)
        except Exception as e:
            log.warning(f"  Batch error: {e}")
    return inserted


def ingest_unlocode(cur) -> int:
    log.info("Downloading UN/LOCODE from GitHub mirror (datasets/un-locode)...")
    try:
        r = requests.get(LOCODE_CSV_URL, timeout=120)
        r.raise_for_status()
    except Exception as e:
        log.error(f"  UN/LOCODE failed: {e}")
        return 0
    
    log.info(f"  Downloaded {len(r.content):,} bytes. Parsing CSV...")
    
    records = []
    now = datetime.now(timezone.utc).isoformat()
    
    reader = csv.DictReader(io.StringIO(r.text))
    for row in reader:
        try:
            country_iso = (row.get('Country') or '').strip()
            loc         = (row.get('Location') or '').strip()
            name        = (row.get('Name') or row.get('NameWoDiacritics') or '').strip()
            func_str    = (row.get('Function') or '').strip()
            lat_str     = (row.get('Latitude') or '').strip()
            lon_str     = (row.get('Longitude') or '').strip()
            
            if not country_iso or not loc or not name:
                continue
            
            # Function codes: 1=Port, 2=Rail, 3=Road, 4=Airport, 5=Postal, 6=ICD, 7=Fixed, B=Border, 0=Not known
            is_port    = '1' in func_str
            is_airport = '4' in func_str
            if not is_port and not is_airport:
                continue
            
            # Parse decimal coords
            try:
                lat = float(lat_str) if lat_str else None
                lon = float(lon_str) if lon_str else None
            except ValueError:
                lat = lon = None
            
            if lat is None or lon is None:
                continue
            
            unlocode  = f"{country_iso}{loc}"
            node_type = 'MULTIMODAL' if (is_port and is_airport) else ('PORT' if is_port else 'AIRPORT')
            in_eu     = country_iso in EU_ISO
            
            records.append({
                "node_type":        node_type,
                "name":             name[:200],
                "country":          country_name(country_iso),
                "country_iso":      country_iso,
                "unlocode":         unlocode,
                "latitude":         lat,
                "longitude":        lon,
                "in_eu_ets_scope":  in_eu and node_type in ('PORT','MULTIMODAL'),
                "in_fueleu_scope":  in_eu and node_type in ('PORT','MULTIMODAL'),
                "in_eca_seca":      False,
                "source":           "UNLOCODE",
                "source_updated_at": now,
                "confidence":       "HIGH",
            })
        except Exception as ex:
            log.debug(f"  Row error: {ex}")
            continue
    
    log.info(f"  Parsed {len(records):,} records with coords. Upserting...")
    n = upsert_batch(cur, records)
    log.info(f"  UN/LOCODE: {n:,} nodes inserted")
    return n


def ingest_nga_wpi(cur) -> int:
    log.info("Downloading NGA World Port Index (US Government, public domain)...")
    try:
        r = requests.get(NGA_WPI_URL, timeout=60)
        r.raise_for_status()
        ports = r.json()
    except Exception as e:
        log.error(f"  NGA WPI failed: {e}")
        return 0
    
    log.info(f"  {len(ports)} WPI records. Enriching transport_nodes with physical data...")
    updated = 0
    
    for p in ports:
        try:
            locode = (p.get('locode') or '').strip().replace(' ','').upper()
            if not locode or len(locode) not in (4,5):
                continue
            
            def nf(v):
                try: return float(v) if v not in (None,'','U','N','Unknown') else None
                except: return None
            
            update_parts = []
            values = []
            
            if p.get('harbour_type'):
                update_parts.append("harbour_type = %s")
                values.append(str(p['harbour_type'])[:50])
            if p.get('harbour_size'):
                update_parts.append("harbour_size = %s")
                values.append(str(p['harbour_size'])[:50])
            if nf(p.get('max_vessel_draft')):
                update_parts.append("max_draft_m = %s")
                values.append(nf(p['max_vessel_draft']))
            if nf(p.get('channel_depth')):
                update_parts.append("channel_depth_m = %s")
                values.append(nf(p['channel_depth']))
            if nf(p.get('anchorage_depth')):
                update_parts.append("anchorage_depth_m = %s")
                values.append(nf(p['anchorage_depth']))
            if p.get('containers') == 'Yes':
                update_parts.append("has_containers = %s"); values.append(True)
            if p.get('liquid_bulk') == 'Yes':
                update_parts.append("has_lng = %s"); values.append(True)
            if p.get('rail_terminal') == 'Yes':
                update_parts.append("has_rail = %s"); values.append(True)
            if p.get('dry_dock') == 'Yes':
                update_parts.append("has_drydock = %s"); values.append(True)
            if p.get('fuel_oil') == 'Yes':
                update_parts.append("has_bunker = %s"); values.append(True)
            if p.get('airport') == 'Yes':
                update_parts.append("has_airport_nearby = %s"); values.append(True)
            if p.get('index_number'):
                update_parts.append("wpi_id = %s")
                values.append(str(p['index_number']))
            
            if not update_parts:
                continue
            
            update_parts.append("updated_at = now()")
            sql = f"UPDATE transport_nodes SET {', '.join(update_parts)} WHERE unlocode = %s AND node_type IN ('PORT','MULTIMODAL')"
            values.append(locode)
            cur.execute(sql, values)
            if cur.rowcount > 0:
                updated += 1
        except Exception as ex:
            log.debug(f"  WPI record error: {ex}")
    
    log.info(f"  NGA WPI: {updated:,} port records enriched with physical data")
    return updated


def ingest_ourairports(cur) -> int:
    log.info("Downloading OurAirports (public domain, 74K airports)...")
    try:
        r = requests.get(OURAIRPORTS_URL, timeout=60)
        r.raise_for_status()
    except Exception as e:
        log.error(f"  OurAirports failed: {e}")
        return 0
    
    reader = csv.DictReader(io.StringIO(r.text))
    records = []
    now = datetime.now(timezone.utc).isoformat()
    INCLUDE = {'large_airport', 'medium_airport'}
    
    for row in reader:
        atype = row.get('type','').strip()
        if atype not in INCLUDE:
            continue
        
        iata = row.get('iata_code','').strip() or None
        icao = row.get('ident','').strip() or None
        name = row.get('name','').strip()
        country_iso = row.get('iso_country','').strip()
        
        def nf(v):
            try: return float(v)
            except: return None
        
        lat = nf(row.get('latitude_deg'))
        lon = nf(row.get('longitude_deg'))
        elev = nf(row.get('elevation_ft'))
        scheduled = row.get('scheduled_service','no').lower() == 'yes'
        in_eu = country_iso in EU_ISO
        
        if not name or lat is None or lon is None:
            continue
        
        records.append({
            "node_type":             "AIRPORT",
            "name":                  name[:200],
            "country":               country_name(country_iso),
            "country_iso":           country_iso,
            "iata":                  iata,
            "icao":                  icao,
            "latitude":              lat,
            "longitude":             lon,
            "airport_type":          atype,
            "elevation_ft":          int(elev) if elev is not None else None,
            "has_scheduled_service": scheduled,
            "in_eu_ets_scope":       in_eu,
            "in_fueleu_scope":       in_eu,
            "in_eca_seca":           False,
            "source":                "OURAIRPORTS",
            "source_updated_at":     now,
            "confidence":            "HIGH",
        })
    
    log.info(f"  Parsed {len(records):,} airports. Upserting...")
    n = upsert_batch(cur, records)
    log.info(f"  OurAirports: {n:,} airports inserted")
    return n


def main():
    log.info("="*60)
    log.info("MERIDIAN — Global Transport Node Registry Ingestor v2")
    log.info("Sources: UN/LOCODE + NGA WPI + OurAirports (all real data)")
    log.info("="*60)
    
    conn = psycopg2.connect(DB_URL, connect_timeout=30)
    conn.autocommit = False
    cur = conn.cursor()
    
    try:
        n1 = ingest_unlocode(cur)
        conn.commit()
        log.info("UN/LOCODE committed.")
        
        n2 = ingest_nga_wpi(cur)
        conn.commit()
        log.info("NGA WPI committed.")
        
        n3 = ingest_ourairports(cur)
        conn.commit()
        log.info("OurAirports committed.")
        
        cur.execute("SELECT node_type, COUNT(*) FROM transport_nodes GROUP BY node_type ORDER BY 2 DESC")
        rows = cur.fetchall()
        
        log.info("="*60)
        log.info("INGESTION COMPLETE")
        total = sum(r[1] for r in rows)
        for nt, cnt in rows:
            log.info(f"  {nt}: {cnt:,}")
        log.info(f"  TOTAL: {total:,} transport nodes")
        log.info("="*60)
    
    except Exception as e:
        conn.rollback()
        log.error(f"Fatal error: {e}")
        raise
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()


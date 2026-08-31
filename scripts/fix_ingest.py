import os
#!/usr/bin/env python3
"""Fix schema and re-run ingest with correct parsers."""
import psycopg2, psycopg2.extras, io, csv, requests, logging
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
log = logging.getLogger("fix")

DB = os.getenv("DATABASE_URL")

EU_ISO = {'AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','HR',
          'HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK'}

COUNTRY_NAMES = {
    'BR':'Brazil','NL':'Netherlands','ES':'Spain','DE':'Germany','BE':'Belgium',
    'FR':'France','IT':'Italy','PT':'Portugal','GB':'United Kingdom','US':'United States',
    'SG':'Singapore','CN':'China','JP':'Japan','KR':'South Korea','AU':'Australia',
    'AE':'UAE','SA':'Saudi Arabia','IN':'India','ZA':'South Africa','AR':'Argentina',
    'MX':'Mexico','CA':'Canada','NG':'Nigeria','EG':'Egypt','MA':'Morocco',
    'GR':'Greece','DK':'Denmark','SE':'Sweden','FI':'Finland','NO':'Norway',
    'PL':'Poland','TR':'Turkey','UA':'Ukraine','RU':'Russia','CL':'Chile',
    'PE':'Peru','CO':'Colombia','PA':'Panama','VE':'Venezuela','MY':'Malaysia',
}
def cn(iso): return COUNTRY_NAMES.get(iso, iso)

def dms_to_dd(s):
    """Convert DDMMN/DDDMMW to decimal degrees. e.g. '4230N' -> 42.50, '00131E' -> 1.5166"""
    s = s.strip()
    if not s: return None
    try:
        hemi = s[-1].upper()
        n = s[:-1]
        if len(n) == 4:     # DDMM
            deg = int(n[0:2]); mins = int(n[2:4])
        elif len(n) == 5:   # DDDMM
            deg = int(n[0:3]); mins = int(n[3:5])
        else:
            return None
        dd = deg + mins / 60.0
        return -dd if hemi in ('S', 'W') else dd
    except:
        return None

def main():
    conn = psycopg2.connect(DB, connect_timeout=30)
    conn.autocommit = False
    cur = conn.cursor()

    # Fix 1: Expand icao column to TEXT
    log.info("Fixing schema: icao → TEXT...")
    cur.execute("ALTER TABLE transport_nodes ALTER COLUMN icao TYPE TEXT")
    conn.commit()
    log.info("Schema fixed.")

    # Fix 2: Ingest UN/LOCODE with correct DMS parser
    log.info("Downloading UN/LOCODE (7MB)...")
    r = requests.get("https://raw.githubusercontent.com/datasets/un-locode/main/data/code-list.csv", timeout=60)
    r.raise_for_status()
    log.info(f"  Downloaded {len(r.content):,} bytes. Parsing...")

    reader = csv.DictReader(io.StringIO(r.text))
    records = []
    now = datetime.now(timezone.utc).isoformat()

    for row in reader:
        country_iso = (row.get('Country') or '').strip()
        loc         = (row.get('Location') or '').strip()
        name        = (row.get('Name') or row.get('NameWoDiacritics') or '').strip()
        func_str    = (row.get('Function') or '').strip()
        coord_str   = (row.get('Coordinates') or '').strip()
        iata        = (row.get('IATA') or '').strip() or None

        if not country_iso or not loc or not name: continue

        is_port    = '1' in func_str
        is_airport = '4' in func_str
        if not is_port and not is_airport: continue

        lat = lon = None
        if coord_str and ' ' in coord_str:
            parts = coord_str.split()
            if len(parts) == 2:
                lat = dms_to_dd(parts[0])
                lon = dms_to_dd(parts[1])
        if lat is None or lon is None: continue

        unlocode  = f"{country_iso}{loc}"
        node_type = 'MULTIMODAL' if (is_port and is_airport) else ('PORT' if is_port else 'AIRPORT')
        in_eu     = country_iso in EU_ISO

        records.append({
            "node_type":        node_type,
            "name":             name[:200],
            "country":          cn(country_iso),
            "country_iso":      country_iso,
            "unlocode":         unlocode,
            "iata":             iata,
            "latitude":         lat,
            "longitude":        lon,
            "in_eu_ets_scope":  in_eu and node_type in ('PORT','MULTIMODAL'),
            "in_fueleu_scope":  in_eu and node_type in ('PORT','MULTIMODAL'),
            "in_eca_seca":      False,
            "source":           "UNLOCODE",
            "source_updated_at": now,
            "confidence":       "HIGH",
        })

    log.info(f"  Parsed {len(records):,} records. Inserting in batches of 500...")
    cols = list(records[0].keys())
    ph   = ','.join(['%s']*len(cols))
    sql  = f"INSERT INTO transport_nodes ({','.join(cols)}) VALUES ({ph}) ON CONFLICT DO NOTHING"

    inserted = 0
    for i in range(0, len(records), 500):
        chunk = records[i:i+500]
        vals  = [[r[c] for c in cols] for r in chunk]
        try:
            psycopg2.extras.execute_batch(cur, sql, vals)
            inserted += len(chunk)
        except Exception as e:
            conn.rollback()
            log.warning(f"  Batch {i//500} error: {e}")
            conn.autocommit = False

    conn.commit()
    log.info(f"  UN/LOCODE committed: {inserted:,} records")

    # Fix 3: OurAirports (now icao is TEXT, no truncation)
    log.info("Downloading OurAirports...")
    r2 = requests.get("https://davidmegginson.github.io/ourairports-data/airports.csv", timeout=60)
    r2.raise_for_status()
    reader2 = csv.DictReader(io.StringIO(r2.text))
    air_records = []
    INCLUDE = {'large_airport', 'medium_airport'}

    for row in reader2:
        if row.get('type','') not in INCLUDE: continue
        iata2 = row.get('iata_code','').strip() or None
        icao2 = row.get('ident','').strip() or None
        name2 = row.get('name','').strip()
        ci2   = row.get('iso_country','').strip()
        try:
            lat2 = float(row.get('latitude_deg',''))
            lon2 = float(row.get('longitude_deg',''))
        except: continue
        elev2 = None
        try: elev2 = int(float(row.get('elevation_ft','')))
        except: pass
        sched2 = row.get('scheduled_service','no').lower() == 'yes'
        in_eu2 = ci2 in EU_ISO

        if not name2 or lat2 is None: continue
        air_records.append({
            "node_type": "AIRPORT","name": name2[:200],"country": cn(ci2),"country_iso": ci2,
            "iata": iata2,"icao": icao2,"latitude": lat2,"longitude": lon2,
            "airport_type": row.get('type',''),"elevation_ft": elev2,
            "has_scheduled_service": sched2,"in_eu_ets_scope": in_eu2,"in_fueleu_scope": in_eu2,
            "in_eca_seca": False,"source": "OURAIRPORTS","source_updated_at": now,"confidence": "HIGH",
        })

    log.info(f"  Parsed {len(air_records):,} airports. Inserting...")
    if air_records:
        cols2 = list(air_records[0].keys())
        ph2   = ','.join(['%s']*len(cols2))
        sql2  = f"INSERT INTO transport_nodes ({','.join(cols2)}) VALUES ({ph2}) ON CONFLICT DO NOTHING"
        inserted2 = 0
        for i in range(0, len(air_records), 500):
            chunk = air_records[i:i+500]
            vals  = [[r[c] for c in cols2] for r in chunk]
            try:
                psycopg2.extras.execute_batch(cur, sql2, vals)
                inserted2 += len(chunk)
            except Exception as e:
                conn.rollback()
                log.warning(f"  Airport batch {i//500} error: {e}")
        conn.commit()
        log.info(f"  OurAirports committed: {inserted2:,}")

    # Final count
    cur.execute("SELECT node_type, COUNT(*) FROM transport_nodes GROUP BY node_type ORDER BY 2 DESC")
    rows = cur.fetchall()
    total = sum(r[1] for r in rows)
    log.info("="*60)
    log.info(f"INGEST COMPLETE — {total:,} total transport nodes in DB")
    for nt, cnt in rows:
        log.info(f"  {nt}: {cnt:,}")
    log.info("="*60)

    cur.close()
    conn.close()

if __name__ == "__main__":
    main()


#!/usr/bin/env python3
"""
Meridian Intelligence — Real Data Ingest via Supabase REST API
Downloads UN/LOCODE, NGA WPI, OurAirports and POSTs to Supabase.
No mocks. Real open-data only.
"""
import io, csv, json, zipfile, logging, requests, hashlib
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
log = logging.getLogger("ingest")

SUPABASE_URL = "https://fjkynzvsfowexahoscai.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqa3luenZzZm93ZXhhaG9zY2FpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODA1NjkzMCwiZXhwIjoyMTAzNjMyOTMwfQ.placeholder"
# We use the service role key — only server-side, never exposed to frontend

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=ignore-duplicates",
}

UNLOCODE_URL    = "https://service.unece.org/trade/locode/loc242csv.zip"
NGA_WPI_URL     = "https://raw.githubusercontent.com/tayljordan/ports/main/ports.json"
OURAIRPORTS_URL = "https://davidmegginson.github.io/ourairports-data/airports.csv"

EU_ISO = {'AT','BE','BG','CY','CZ','DE','DK','EE','EL','ES','FI','FR','HR',
          'HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK'}

COUNTRY_NAMES = {
    'BR':'Brazil','NL':'Netherlands','ES':'Spain','DE':'Germany','BE':'Belgium',
    'FR':'France','IT':'Italy','PT':'Portugal','GB':'United Kingdom','US':'United States',
    'SG':'Singapore','CN':'China','JP':'Japan','KR':'South Korea','AU':'Australia',
    'AE':'UAE','SA':'Saudi Arabia','IN':'India','ZA':'South Africa','AR':'Argentina',
    'MX':'Mexico','CA':'Canada','NG':'Nigeria','EG':'Egypt','MA':'Morocco',
    'GR':'Greece','DK':'Denmark','SE':'Sweden','FI':'Finland','NO':'Norway',
    'PL':'Poland','TR':'Turkey','UA':'Ukraine','RU':'Russia','CL':'Chile',
    'PE':'Peru','CO':'Colombia','VE':'Venezuela','EC':'Ecuador','PA':'Panama',
}

def country_name(iso):
    return COUNTRY_NAMES.get(iso, iso)

def dms_to_dd(s):
    if not s or len(s) < 5:
        return None
    try:
        d = s[-1].upper()
        n = s[:-1]
        deg = int(n[:-2])
        mins = int(n[-2:])
        dd = deg + mins/60.0
        return -dd if d in ('S','W') else dd
    except:
        return None

def upsert_batch(records, table="transport_nodes"):
    if not records:
        return 0
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    # Split into chunks of 200
    inserted = 0
    for i in range(0, len(records), 200):
        chunk = records[i:i+200]
        r = requests.post(url, headers=HEADERS, json=chunk, timeout=30)
        if r.status_code not in (200, 201):
            log.warning(f"  Upsert error {r.status_code}: {r.text[:200]}")
        else:
            inserted += len(chunk)
    return inserted


def ingest_unlocode():
    log.info("Downloading UN/LOCODE from UNECE (real open data)...")
    r = requests.get(UNLOCODE_URL, timeout=120, stream=True)
    r.raise_for_status()
    
    records = []
    now = datetime.now(timezone.utc).isoformat()
    
    with zipfile.ZipFile(io.BytesIO(r.content)) as zf:
        csv_files = sorted([f for f in zf.namelist() if 'CodeListPart' in f and f.endswith('.csv')])
        log.info(f"  {len(csv_files)} part files found")
        
        for fname in csv_files:
            log.info(f"  Parsing {fname}...")
            with zf.open(fname) as f:
                content = f.read().decode('latin-1', errors='replace')
                reader = csv.reader(io.StringIO(content))
                next(reader, None)
                
                for row in reader:
                    if len(row) < 10:
                        continue
                    country_iso = row[1].strip()
                    loc_code    = row[2].strip()
                    name        = (row[3] or row[4]).strip().strip('"')
                    func_str    = row[6].strip()
                    coords_str  = row[10].strip() if len(row) > 10 else ''
                    
                    if not country_iso or not loc_code or not name:
                        continue
                    
                    is_port    = '1' in func_str
                    is_airport = '4' in func_str
                    if not is_port and not is_airport:
                        continue
                    
                    lat = lon = None
                    if coords_str:
                        parts = coords_str.split()
                        if len(parts) == 2:
                            lat = dms_to_dd(parts[0])
                            lon = dms_to_dd(parts[1])
                    
                    if lat is None or lon is None:
                        continue
                    
                    unlocode  = f"{country_iso}{loc_code}"
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
                        "source":           "UNLOCODE",
                        "source_updated_at": now,
                    })
    
    log.info(f"  Upserting {len(records)} LOCODE nodes...")
    n = upsert_batch(records)
    log.info(f"  UN/LOCODE: {n} nodes upserted")
    return n


def ingest_nga_wpi():
    log.info("Downloading NGA World Port Index (real US Government data)...")
    try:
        r = requests.get(NGA_WPI_URL, timeout=60)
        r.raise_for_status()
        ports = r.json()
    except Exception as e:
        log.error(f"  NGA WPI failed: {e}")
        return 0
    
    log.info(f"  {len(ports)} WPI records downloaded")
    now = datetime.now(timezone.utc).isoformat()
    updates = 0
    
    for p in ports:
        try:
            unlocode = p.get('locode','').strip().replace(' ','').upper()
            if not unlocode or len(unlocode) != 5:
                continue
            
            patch = {}
            if p.get('harbour_type'): patch['harbour_type'] = str(p['harbour_type'])[:50]
            if p.get('harbour_size'): patch['harbour_size'] = str(p['harbour_size'])[:50]
            
            def nf(v):
                try: return float(v) if v not in (None,'','U','N') else None
                except: return None
            
            if nf(p.get('max_vessel_draft')): patch['max_draft_m'] = nf(p['max_vessel_draft'])
            if nf(p.get('channel_depth')):    patch['channel_depth_m'] = nf(p['channel_depth'])
            if nf(p.get('anchorage_depth')):  patch['anchorage_depth_m'] = nf(p['anchorage_depth'])
            if p.get('containers'):  patch['has_containers'] = True
            if p.get('liquid_bulk'): patch['has_lng'] = True
            if p.get('rail_terminal'): patch['has_rail'] = True
            if p.get('dry_dock'):    patch['has_drydock'] = True
            if p.get('fuel_oil'):    patch['has_bunker'] = True
            if p.get('airport'):     patch['has_airport_nearby'] = True
            if p.get('index_number'): patch['wpi_id'] = str(p['index_number'])
            
            if not patch:
                continue
            
            patch['updated_at'] = now
            url = f"{SUPABASE_URL}/rest/v1/transport_nodes?unlocode=eq.{unlocode}&node_type=in.(PORT,MULTIMODAL)"
            r2 = requests.patch(url, headers=HEADERS, json=patch, timeout=10)
            if r2.status_code == 204:
                updates += 1
        except Exception as ex:
            log.debug(f"  WPI record error: {ex}")
    
    log.info(f"  NGA WPI: {updates} port records enriched with physical data")
    return updates


def ingest_ourairports():
    log.info("Downloading OurAirports data (public domain)...")
    r = requests.get(OURAIRPORTS_URL, timeout=60)
    r.raise_for_status()
    
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
        elevation = nf(row.get('elevation_ft'))
        scheduled = row.get('scheduled_service','no').lower() == 'yes'
        in_eu = country_iso in EU_ISO
        
        if not name or lat is None or lon is None:
            continue
        
        records.append({
            "node_type": "AIRPORT",
            "name": name[:200],
            "country": country_name(country_iso),
            "country_iso": country_iso,
            "iata": iata,
            "icao": icao,
            "latitude": lat,
            "longitude": lon,
            "airport_type": atype,
            "elevation_ft": int(elevation) if elevation else None,
            "has_scheduled_service": scheduled,
            "in_eu_ets_scope": in_eu,
            "source": "OURAIRPORTS",
            "source_updated_at": now,
        })
    
    log.info(f"  Upserting {len(records)} airport records...")
    n = upsert_batch(records)
    log.info(f"  OurAirports: {n} airports upserted")
    return n


def main():
    log.info("="*60)
    log.info("MERIDIAN — Global Transport Node Registry Ingestor")
    log.info("Sources: UN/LOCODE (UNECE) + NGA WPI + OurAirports")
    log.info("="*60)
    
    n1 = ingest_unlocode()
    n2 = ingest_nga_wpi()
    n3 = ingest_ourairports()
    
    # Final count from Supabase
    url = f"{SUPABASE_URL}/rest/v1/transport_nodes?select=node_type&limit=1"
    r = requests.get(url, headers={**HEADERS, "Prefer": "count=exact"}, timeout=10)
    total = r.headers.get('content-range','?/?').split('/')[-1]
    
    log.info("="*60)
    log.info(f"INGESTION COMPLETE — {total} total transport nodes in DB")
    log.info("="*60)

if __name__ == "__main__":
    main()

import os
#!/usr/bin/env python3
"""Apply migrations 011-014 to Supabase."""
import psycopg2

DB = os.getenv("DATABASE_URL")

MIGRATIONS = {
    "011_geofence_events": """
CREATE TABLE IF NOT EXISTS geofence_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vessel_mmsi VARCHAR(20) NOT NULL,
  vessel_name VARCHAR(200),
  geofence_id UUID REFERENCES geofences(id),
  port_unlocode VARCHAR(10),
  event_type VARCHAR(20) NOT NULL CHECK (event_type IN ('ENTRY','EXIT','DEVIATION')),
  lat NUMERIC(9,6) NOT NULL,
  lon NUMERIC(9,6) NOT NULL,
  sog NUMERIC(5,2),
  ais_timestamp TIMESTAMPTZ NOT NULL,
  detected_at TIMESTAMPTZ DEFAULT now(),
  source VARCHAR(50) DEFAULT 'AIS',
  confidence VARCHAR(20) DEFAULT 'HIGH'
);
CREATE INDEX IF NOT EXISTS idx_gfe_mmsi ON geofence_events(vessel_mmsi);
CREATE INDEX IF NOT EXISTS idx_gfe_port ON geofence_events(port_unlocode);
CREATE INDEX IF NOT EXISTS idx_gfe_type ON geofence_events(event_type);
""",
    "012_evidence_v2": """
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS sha256_hash VARCHAR(64);
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS parser_version VARCHAR(20);
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS confidence_level VARCHAR(20) DEFAULT 'HIGH';
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS data_type VARCHAR(50);
""",
    "013_evidence_proofs": """
CREATE TABLE IF NOT EXISTS evidence_proofs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_id UUID REFERENCES evidence(id) ON DELETE CASCADE,
  proof_type VARCHAR(50) NOT NULL,
  proof_value TEXT NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT now(),
  verifier VARCHAR(100) DEFAULT 'meridian_engine'
);
""",
    "014_route_calculations": """
CREATE TABLE IF NOT EXISTS route_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_unlocode VARCHAR(10) NOT NULL,
  destination_unlocode VARCHAR(10) NOT NULL,
  route_type VARCHAR(20) NOT NULL CHECK (route_type IN ('MARITIME','AVIATION','MULTIMODAL')),
  distance_nm NUMERIC(10,2),
  distance_km NUMERIC(10,2),
  duration_hours NUMERIC(8,2),
  geojson_route JSONB,
  waypoints JSONB,
  calculated_at TIMESTAMPTZ DEFAULT now(),
  source VARCHAR(50) DEFAULT 'searoute',
  confidence VARCHAR(20) DEFAULT 'HIGH'
);
CREATE INDEX IF NOT EXISTS idx_route_calc_pair ON route_calculations(origin_unlocode, destination_unlocode);
""",
}


def main():
    conn = psycopg2.connect(DB, connect_timeout=20)
    conn.autocommit = True
    cur = conn.cursor()

    for name, sql in MIGRATIONS.items():
        try:
            cur.execute(sql)
            print(f"  OK: {name}")
        except Exception as e:
            print(f"  ERR {name}: {e}")

    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
    tables = [r[0] for r in cur.fetchall()]
    print(f"\nTotal tables in DB: {len(tables)}")
    for t in tables:
        print(f"  {t}")

    cur.close()
    conn.close()


if __name__ == "__main__":
    main()


#!/usr/bin/env python3
"""
apply_migrations.py — Aplica todas as migrations SQL no banco Supabase real.
"""
import psycopg2, os, sys

DB = os.environ.get(
    "DATABASE_URL",
    "postgresql://postgres:WpGwXYcK2qtfa31H@db.nrvinsjtkmqkcqztkfam.supabase.co:5432/postgres"
)

MIGRATIONS = [
    "database/001_initial.sql",
    "database/002_sprint2_schema.sql",
    "database/003_ports_and_geofences.sql",
    "database/004_br_eu_ports_seed.sql",
    "database/005_satellite_architecture.sql",
    "database/006_green_corridors.sql",
    "database/007_pilot_seed.sql",
    "database/008_transport_nodes.sql",
]

def run():
    print(f"Connecting to: {DB[:60]}...")
    conn = psycopg2.connect(DB)
    conn.autocommit = False
    cur = conn.cursor()

    # Enable PostGIS if available
    try:
        cur.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
        conn.commit()
        print("PostGIS: enabled")
    except Exception as e:
        conn.rollback()
        print(f"PostGIS unavailable (ok): {e}")

    for path in MIGRATIONS:
        print(f"\n--- Applying {path} ---")
        try:
            with open(path, "r", encoding="utf-8") as f:
                sql = f.read()
            cur.execute(sql)
            conn.commit()
            print(f"    OK")
        except Exception as e:
            conn.rollback()
            print(f"    ERROR: {e}")

    # Summary
    cur.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name
    """)
    tables = [r[0] for r in cur.fetchall()]
    print(f"\n=== DONE — {len(tables)} tables in DB ===")
    for t in tables:
        print(f"  {t}")

    cur.close()
    conn.close()

if __name__ == "__main__":
    run()

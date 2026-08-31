import os
import psycopg2

def apply_migration():
    print("Applying Migration 017: Regulatory Geofences (PostGIS)...")
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    cur = conn.cursor()
    
    with open("database/017_regulatory_geofences.sql", "r") as f:
        sql = f.read()
        
    cur.execute(sql)
    conn.commit()
    conn.close()
    print("Migration 017 Applied successfully. Geofences are active.")

if __name__ == "__main__":
    apply_migration()


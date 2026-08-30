import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.geofence_engine import GeofenceEngine
import os

def run_test():
    engine = create_engine('postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres')
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    # Get ID for MSC ROTTERDAM (for testing)
    conn = psycopg2.connect('postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres')
    cur = conn.cursor()
    cur.execute("SELECT id FROM vessels WHERE imo_number = '9321483'")
    vid = str(cur.fetchone()[0])
    conn.close()

    print(f"Vessel MSC ROTTERDAM ID: {vid}")

    print("\n[1] PING OUTSIDE GEOFENCE (Coast of Portugal: 40.0, -10.0)")
    alerts1 = GeofenceEngine.process_ping(db, vid, 40.0, -10.0)
    print(f"Result: {alerts1}")

    print("\n[2] PING INSIDE ECA GEOFENCE (English Channel: 50.0, 0.0)")
    alerts2 = GeofenceEngine.process_ping(db, vid, 50.0, 0.0)
    print(f"Result: {alerts2}")
    
    print("\n[3] PING INSIDE HRA (Red Sea Piracy Zone: 14.0, 43.0)")
    alerts3 = GeofenceEngine.process_ping(db, vid, 14.0, 43.0)
    print(f"Result: {alerts3}")

if __name__ == "__main__":
    run_test()

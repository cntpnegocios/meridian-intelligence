import requests
import psycopg2
from datetime import datetime, timezone
import time
import math

def generate_route_pings(start_lat, start_lon, end_lat, end_lon, steps):
    pings = []
    for i in range(steps):
        fraction = i / float(steps - 1)
        lat = start_lat + (end_lat - start_lat) * fraction
        lon = start_lon + (end_lon - start_lon) * fraction
        pings.append({"lat": lat, "lon": lon})
    return pings

def run_satellite_feed():
    print("📡 Starting Spire/ExactEarth Satellite AIS Feed Simulator...")
    
    # 1. Get Vessel IDs from the Registry
    conn = psycopg2.connect("postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres")
    cur = conn.cursor()
    
    cur.execute("SELECT id, name FROM vessels WHERE imo_number IN ('9321483', '9944546')")
    vessels = cur.fetchall()
    conn.close()

    if not vessels:
        print("❌ No vessels found in registry. Aborting.")
        return

    # Emma Maersk going Santos -> Rotterdam
    # Laura Maersk going Rotterdam -> Santos
    
    route_up = generate_route_pings(-24.0, -46.0, 51.9, 4.0, 20)
    route_down = generate_route_pings(51.9, 4.0, -24.0, -46.0, 20)

    # API Endpoint
    api_url = "http://localhost:8000/api/v1/vessels/live/webhook"

    print("🛰️ Orbit established. Broadcasting AIS frames...")
    
    for step in range(20):
        for v in vessels:
            vid, name = v
            
            if name == "EMMA MAERSK":
                pos = route_up[step]
                sog = 25.5
                cog = 45.0
            else:
                pos = route_down[step]
                sog = 17.4
                cog = 225.0

            payload = {
                "vessel_id": str(vid),
                "mmsi": None,
                "observed_at": datetime.now(timezone.utc).isoformat(),
                "latitude": pos["lat"],
                "longitude": pos["lon"],
                "sog_knots": sog,
                "cog_degrees": cog
            }
            
            try:
                resp = requests.post(api_url, json=payload)
                if resp.status_code == 200:
                    print(f"✅ Ping OK: {name} at {pos['lat']:.4f}, {pos['lon']:.4f}")
                else:
                    print(f"❌ Ping FAILED: {resp.text}")
            except Exception as e:
                print(f"⚠️ Connection error (Is FastAPI running?): {e}")
        
        time.sleep(2) # 2 seconds between satellite sweeps

if __name__ == "__main__":
    run_satellite_feed()

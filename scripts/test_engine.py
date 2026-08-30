import httpx
import asyncio

async def test_engine():
    # We fetch Emma Maersk ID first (IMO 9321483)
    import psycopg2
    conn = psycopg2.connect("postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres")
    cur = conn.cursor()
    cur.execute("SELECT id FROM vessels WHERE imo_number = '9321483'")
    emma_id = cur.fetchone()[0]
    conn.close()

    print(f"Emma Maersk ID: {emma_id}")
    
    # Direct import and call function to simulate an internal API call without starting server
    from app.core.emissions_engine import EmissionsEngine
    from app.models.domain import Vessel

    conn = psycopg2.connect("postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres")
    cur = conn.cursor()
    # Mocking the sqlalchemy model using raw dict for fast test
    class MockVessel:
        pass
    
    v = MockVessel()
    v.imo_number = '9321483'
    v.name = 'EMMA MAERSK'
    v.design_speed_knots = 27.0
    v.service_speed_knots = 25.5
    v.engine_power_kw = 80080.0
    v.primary_fuel_type = 'VLSFO'

    print("--- SCENARIO 1: Full Speed (25.5 knots) ---")
    res1 = EmissionsEngine.calculate_voyage(v, 5400.0, 25.5)
    print(f"Time: {res1['time_days']} days")
    print(f"Power: {res1['power_required_kw']} kW")
    print(f"Fuel Consumed: {res1['fuel_consumed_tonnes']} tonnes")
    print(f"TTW CO2: {res1['ttw_co2_tonnes']} tonnes")
    print(f"Fuel Cost: ${res1['fuel_cost_usd']}")

    print("\n--- SCENARIO 2: Slow Steaming (18.0 knots) ---")
    res2 = EmissionsEngine.calculate_voyage(v, 5400.0, 18.0)
    print(f"Time: {res2['time_days']} days")
    print(f"Power: {res2['power_required_kw']} kW")
    print(f"Fuel Consumed: {res2['fuel_consumed_tonnes']} tonnes")
    print(f"TTW CO2: {res2['ttw_co2_tonnes']} tonnes")
    print(f"Fuel Cost: ${res2['fuel_cost_usd']}")

if __name__ == "__main__":
    import os
    os.chdir("services/api")
    import sys
    sys.path.append(os.getcwd())
    asyncio.run(test_engine())

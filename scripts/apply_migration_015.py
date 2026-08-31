import os
import psycopg2
from psycopg2.extras import execute_values
import uuid

DB_URL = os.getenv("DATABASE_URL")

def run_migration():
    print("Connecting to DB...")
    conn = psycopg2.connect(DB_URL)
    conn.autocommit = True
    cur = conn.cursor()

    # 1. Apply Migration 015
    with open("database/015_vessel_aircraft_registry.sql", "r", encoding="utf-8") as f:
        sql = f.read()
    print("Applying migration 015...")
    cur.execute(sql)
    print("Migration 015 applied successfully.")

    # 2. Seed Real Vessel Data (Zero Mocks)
    # We will use ON CONFLICT to update existing IMO numbers or insert new ones
    vessels = [
        # Emma Maersk (Container Ship - E-class)
        {
            "id": str(uuid.uuid4()), "imo_number": "9321483", "mmsi": "220417000", "name": "EMMA MAERSK", "flag": "DK", "vessel_type": "Container Ship",
            "build_year": 2006, "gross_tonnage": 170794, "dwt": 158200, "length_m": 397.71, "beam_m": 56.40, "max_draft_m": 16.02,
            "engine_type": "Wartsila-Sulzer 14RT-flex96C", "engine_power_kw": 80080, "primary_fuel_type": "VLSFO", 
            "service_speed_knots": 25.5, "design_speed_knots": 27.0, "eexi": 11.2, "cii_rating": "C"
        },
        # Vale Brasil (Bulk Carrier - Valemax)
        {
            "id": str(uuid.uuid4()), "imo_number": "9488918", "mmsi": "563345000", "name": "VALE BRASIL", "flag": "SG", "vessel_type": "Ore Carrier",
            "build_year": 2011, "gross_tonnage": 198980, "dwt": 402347, "length_m": 362.00, "beam_m": 65.00, "max_draft_m": 23.00,
            "engine_type": "MAN B&W 7S80ME-C8", "engine_power_kw": 29260, "primary_fuel_type": "VLSFO", 
            "service_speed_knots": 15.4, "design_speed_knots": 15.4, "eexi": 2.1, "cii_rating": "B"
        },
        # Laura Maersk (Pioneer Green Methanol Container Ship)
        {
            "id": str(uuid.uuid4()), "imo_number": "9944546", "mmsi": "219031444", "name": "LAURA MAERSK", "flag": "DK", "vessel_type": "Container Ship",
            "build_year": 2023, "gross_tonnage": 32000, "dwt": 32200, "length_m": 172.00, "beam_m": 32.20, "max_draft_m": 11.00,
            "engine_type": "MAN B&W 6G50ME-C9.6-LGIM", "engine_power_kw": 10320, "primary_fuel_type": "Methanol", 
            "service_speed_knots": 17.4, "design_speed_knots": 17.4, "eexi": 9.5, "cii_rating": "A"
        },
        # Symphony of the Seas (Passenger/Cruise)
        {
            "id": str(uuid.uuid4()), "imo_number": "9744001", "mmsi": "311000599", "name": "SYMPHONY OF THE SEAS", "flag": "BS", "vessel_type": "Passenger Ship",
            "build_year": 2018, "gross_tonnage": 228081, "dwt": 18095, "length_m": 361.011, "beam_m": 65.68, "max_draft_m": 9.32,
            "engine_type": "Wartsila 12V46F", "engine_power_kw": 96000, "primary_fuel_type": "MGO", 
            "service_speed_knots": 22.0, "design_speed_knots": 22.0, "eexi": 18.4, "cii_rating": "C"
        }
    ]

    print("Upserting exact real vessel profiles...")
    for v in vessels:
        query = """
        INSERT INTO vessels (
            id, imo_number, mmsi, name, flag, vessel_type, build_year, gross_tonnage, dwt, 
            length_m, beam_m, max_draft_m, engine_type, engine_power_kw, primary_fuel_type, 
            service_speed_knots, design_speed_knots, eexi, cii_rating
        ) VALUES (
            %(id)s, %(imo_number)s, %(mmsi)s, %(name)s, %(flag)s, %(vessel_type)s, %(build_year)s, %(gross_tonnage)s, %(dwt)s,
            %(length_m)s, %(beam_m)s, %(max_draft_m)s, %(engine_type)s, %(engine_power_kw)s, %(primary_fuel_type)s,
            %(service_speed_knots)s, %(design_speed_knots)s, %(eexi)s, %(cii_rating)s
        )
        ON CONFLICT (imo_number) DO UPDATE SET
            mmsi = EXCLUDED.mmsi,
            name = EXCLUDED.name,
            flag = EXCLUDED.flag,
            vessel_type = EXCLUDED.vessel_type,
            build_year = EXCLUDED.build_year,
            gross_tonnage = EXCLUDED.gross_tonnage,
            dwt = EXCLUDED.dwt,
            length_m = EXCLUDED.length_m,
            beam_m = EXCLUDED.beam_m,
            max_draft_m = EXCLUDED.max_draft_m,
            engine_type = EXCLUDED.engine_type,
            engine_power_kw = EXCLUDED.engine_power_kw,
            primary_fuel_type = EXCLUDED.primary_fuel_type,
            service_speed_knots = EXCLUDED.service_speed_knots,
            design_speed_knots = EXCLUDED.design_speed_knots,
            eexi = EXCLUDED.eexi,
            cii_rating = EXCLUDED.cii_rating;
        """
        cur.execute(query, v)
        print(f"Upserted: {v['name']} (IMO {v['imo_number']})")

    # 3. Seed Real Aircraft Data
    aircraft = [
        # Boeing 777-300ER (LATAM Brasil)
        {
            "id": str(uuid.uuid4()), "tail_number": "PT-MUA", "icao_type_code": "B77W", "manufacturer": "Boeing", "model": "777-300ER",
            "build_year": 2008, "mtow_kg": 351533, "max_range_nm": 7370, "cruise_speed_knots": 482, "fuel_capacity_liters": 181283, "engine_type": "GE90-115B", "engine_count": 2
        },
        # Airbus A350-900 (Air France)
        {
            "id": str(uuid.uuid4()), "tail_number": "F-HTYA", "icao_type_code": "A359", "manufacturer": "Airbus", "model": "A350-900",
            "build_year": 2019, "mtow_kg": 280000, "max_range_nm": 8100, "cruise_speed_knots": 488, "fuel_capacity_liters": 141000, "engine_type": "Trent XWB-84", "engine_count": 2
        },
        # Boeing 737 MAX 8 (GOL)
        {
            "id": str(uuid.uuid4()), "tail_number": "PR-XMA", "icao_type_code": "B38M", "manufacturer": "Boeing", "model": "737 MAX 8",
            "build_year": 2018, "mtow_kg": 82190, "max_range_nm": 3550, "cruise_speed_knots": 453, "fuel_capacity_liters": 25816, "engine_type": "CFM LEAP-1B", "engine_count": 2
        }
    ]

    print("Upserting exact real aircraft profiles...")
    for a in aircraft:
        query = """
        INSERT INTO aircraft (
            id, tail_number, icao_type_code, manufacturer, model, build_year, 
            mtow_kg, max_range_nm, cruise_speed_knots, fuel_capacity_liters, engine_type, engine_count
        ) VALUES (
            %(id)s, %(tail_number)s, %(icao_type_code)s, %(manufacturer)s, %(model)s, %(build_year)s,
            %(mtow_kg)s, %(max_range_nm)s, %(cruise_speed_knots)s, %(fuel_capacity_liters)s, %(engine_type)s, %(engine_count)s
        )
        ON CONFLICT (tail_number) DO UPDATE SET
            icao_type_code = EXCLUDED.icao_type_code,
            manufacturer = EXCLUDED.manufacturer,
            model = EXCLUDED.model,
            build_year = EXCLUDED.build_year,
            mtow_kg = EXCLUDED.mtow_kg,
            max_range_nm = EXCLUDED.max_range_nm,
            cruise_speed_knots = EXCLUDED.cruise_speed_knots,
            fuel_capacity_liters = EXCLUDED.fuel_capacity_liters,
            engine_type = EXCLUDED.engine_type,
            engine_count = EXCLUDED.engine_count;
        """
        cur.execute(query, a)
        print(f"Upserted: {a['tail_number']} ({a['model']})")

    conn.close()
    print("DONE. Phase 3 Technical Registry completed in DB.")

if __name__ == "__main__":
    run_migration()


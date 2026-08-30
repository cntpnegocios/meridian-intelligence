import asyncio
from app.core.emissions_engine import EmissionsEngine
from app.core.regulatory_engine import RegulatoryEngine, EvidenceVault
import psycopg2

def run_local_test():
    conn = psycopg2.connect("postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres")
    cur = conn.cursor()
    
    class MockVessel:
        pass
    
    # 1. EMMA MAERSK (Fossil)
    v1 = MockVessel()
    v1.imo_number = '9321483'
    v1.name = 'EMMA MAERSK'
    v1.design_speed_knots = 27.0
    v1.service_speed_knots = 25.5
    v1.engine_power_kw = 80080.0
    v1.primary_fuel_type = 'VLSFO'

    print("\n=======================================================")
    print("EMMA MAERSK (VLSFO) - Santos to Rotterdam (100% Scope)")
    print("=======================================================")
    em1 = EmissionsEngine.calculate_voyage(v1, 5400.0, 25.5)
    reg1 = RegulatoryEngine.calculate_compliance(em1, 100.0, 2026)
    ev1 = EvidenceVault.generate_proof({"imo": "9321483", "dist": 5400}, {"em": em1, "reg": reg1})
    
    print(f"- TTW CO2: {em1['ttw_co2_tonnes']} tonnes")
    print(f"- FuelEU Target: 91.16 gCO2/MJ | Actual: {reg1['fueleu_ghg_intensity']} gCO2/MJ")
    print(f"- FuelEU Compliant: {reg1['fueleu_compliant']}")
    print(f"- EU ETS Cost (2026): €{reg1['eu_ets_cost_eur']}")
    print(f"- FuelEU Penalty: €{reg1['fueleu_penalty_eur']}")
    print(f"- Total Regulatory Cost: €{reg1['total_regulatory_cost_eur']}")
    print(f"- Evidence Hash: {ev1['hash']}")

    # 2. LAURA MAERSK (Bio-Methanol)
    v2 = MockVessel()
    v2.imo_number = '9944546'
    v2.name = 'LAURA MAERSK'
    v2.design_speed_knots = 17.4
    v2.service_speed_knots = 17.4
    v2.engine_power_kw = 10320.0
    v2.primary_fuel_type = 'Bio-Methanol' # Let's assume they use 100% advanced biofuel

    print("\n=======================================================")
    print("LAURA MAERSK (Bio-Methanol) - Santos to Rotterdam (100% Scope)")
    print("=======================================================")
    em2 = EmissionsEngine.calculate_voyage(v2, 5400.0, 17.4)
    reg2 = RegulatoryEngine.calculate_compliance(em2, 100.0, 2026)
    ev2 = EvidenceVault.generate_proof({"imo": "9944546", "dist": 5400}, {"em": em2, "reg": reg2})

    print(f"- TTW CO2: {em2['ttw_co2_tonnes']} tonnes")
    print(f"- FuelEU Target: 91.16 gCO2/MJ | Actual: {reg2['fueleu_ghg_intensity']} gCO2/MJ")
    print(f"- FuelEU Compliant: {reg2['fueleu_compliant']}")
    print(f"- EU ETS Cost (2026): €{reg2['eu_ets_cost_eur']}")
    print(f"- FuelEU Penalty: €{reg2['fueleu_penalty_eur']}")
    print(f"- Total Regulatory Cost: €{reg2['total_regulatory_cost_eur']}")
    print(f"- Evidence Hash: {ev2['hash']}")

if __name__ == "__main__":
    import os, sys
    os.chdir("services/api")
    sys.path.append(os.getcwd())
    run_local_test()

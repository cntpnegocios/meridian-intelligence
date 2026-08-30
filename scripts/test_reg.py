import os
import sys

# Ensure services/api is in the Python path
sys.path.insert(0, os.path.join(os.getcwd(), "services", "api"))

from app.core.emissions_engine import EmissionsEngine
from app.core.regulatory_engine import RegulatoryEngine, EvidenceVault

class MockVessel:
    pass

def test():
    v1 = MockVessel()
    v1.imo_number = '9321483'
    v1.name = 'EMMA MAERSK'
    v1.design_speed_knots = 27.0
    v1.service_speed_knots = 25.5
    v1.engine_power_kw = 80080.0
    v1.primary_fuel_type = 'VLSFO'

    em1 = EmissionsEngine.calculate_voyage(v1, 5400.0, 25.5)
    reg1 = RegulatoryEngine.calculate_compliance(em1, 100.0, 2026)
    ev1 = EvidenceVault.generate_proof({'imo': '9321483', 'dist': 5400}, {'em': em1, 'reg': reg1})

    print("--- EMMA MAERSK (VLSFO) ---")
    print(f"TTW CO2: {em1['ttw_co2_tonnes']} t")
    print(f"FuelEU Compliant: {reg1['fueleu_compliant']} (Target 91.16 | Actual {reg1['fueleu_ghg_intensity']})")
    print(f"ETS Cost: EUR {reg1['eu_ets_cost_eur']}")
    print(f"FuelEU Penalty: EUR {reg1['fueleu_penalty_eur']}")
    print(f"Total Reg Cost: EUR {reg1['total_regulatory_cost_eur']}")
    print(f"Audit Hash: {ev1['hash']}")

    v2 = MockVessel()
    v2.imo_number = '9944546'
    v2.name = 'LAURA MAERSK'
    v2.design_speed_knots = 17.4
    v2.service_speed_knots = 17.4
    v2.engine_power_kw = 10320.0
    v2.primary_fuel_type = 'Bio-Methanol'

    em2 = EmissionsEngine.calculate_voyage(v2, 5400.0, 17.4)
    reg2 = RegulatoryEngine.calculate_compliance(em2, 100.0, 2026)

    print("\n--- LAURA MAERSK (Bio-Methanol) ---")
    print(f"TTW CO2: {em2['ttw_co2_tonnes']} t")
    print(f"FuelEU Compliant: {reg2['fueleu_compliant']} (Target 91.16 | Actual {reg2['fueleu_ghg_intensity']})")
    print(f"ETS Cost: EUR {reg2['eu_ets_cost_eur']}")
    print(f"FuelEU Penalty: EUR {reg2['fueleu_penalty_eur']}")
    print(f"Total Reg Cost: EUR {reg2['total_regulatory_cost_eur']}")

test()

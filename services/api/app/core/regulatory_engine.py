import hashlib
import json
from typing import Dict, Any
from datetime import datetime, timezone

# EU ETS Constants
EUA_PRICE_EUR = 75.0
ETS_PHASE_IN_FACTOR = {
    2024: 0.40,
    2025: 0.70,
    2026: 1.00
}

# FuelEU Maritime Constants (Well-to-Wake gCO2eq / MJ)
WTW_GHG_INTENSITY = {
    "VLSFO": 91.16,
    "HFO": 93.30,
    "MGO": 90.00,
    "LNG": 78.00,
    "Methanol": 95.00, # Fossil Methanol is highly emissive WTW
    "Bio-Methanol": 20.00
}

FUELEU_TARGET_2025_2029 = 91.16
FUELEU_PENALTY_RATE_EUR = 2400.0
VLSFO_LHV_MJ_KG = 41.0

class RegulatoryEngine:
    @staticmethod
    def calculate_compliance(emissions_data: Dict[str, Any], scope_percent: float = 100.0, year: int = 2026) -> Dict[str, Any]:
        fuel_type = emissions_data["fuel_type"]
        ttw_co2 = emissions_data["ttw_co2_tonnes"]
        energy_mj = emissions_data["energy_consumed_mj"]
        
        phase_in = ETS_PHASE_IN_FACTOR.get(year, 1.00)
        chargeable_co2 = ttw_co2 * (scope_percent / 100.0) * phase_in
        ets_cost_eur = chargeable_co2 * EUA_PRICE_EUR

        # Use 91.16 as default if fuel not found
        actual_ghg_intensity = WTW_GHG_INTENSITY.get(fuel_type, 91.16)
        
        intensity_deficit = actual_ghg_intensity - FUELEU_TARGET_2025_2029
        is_compliant = intensity_deficit <= 0
        
        in_scope_energy = energy_mj * (scope_percent / 100.0)
        
        if not is_compliant:
            vlsfo_eq_kg = (intensity_deficit * in_scope_energy) / (VLSFO_LHV_MJ_KG * 1000.0)
            fueleu_penalty_eur = (vlsfo_eq_kg / 1000.0) * FUELEU_PENALTY_RATE_EUR
        else:
            fueleu_penalty_eur = 0.0

        return {
            "eu_ets_cost_eur": round(ets_cost_eur, 2),
            "eu_ets_chargeable_co2": round(chargeable_co2, 2),
            "fueleu_ghg_intensity": round(actual_ghg_intensity, 2),
            "fueleu_compliant": is_compliant,
            "fueleu_penalty_eur": round(fueleu_penalty_eur, 2),
            "total_regulatory_cost_eur": round(ets_cost_eur + fueleu_penalty_eur, 2)
        }

class EvidenceVault:
    @staticmethod
    def generate_proof(inputs: Dict[str, Any], results: Dict[str, Any], engine_version: str = "1.0.0") -> Dict[str, Any]:
        payload = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "engine": "Meridian Regulatory/Emissions Core",
            "version": engine_version,
            "inputs": inputs,
            "results": results
        }
        payload_str = json.dumps(payload, sort_keys=True)
        sha256_hash = hashlib.sha256(payload_str.encode('utf-8')).hexdigest()
        
        return {
            "hash": sha256_hash,
            "timestamp": payload["timestamp"],
            "methodology": "Deterministic Engine (IMO/EU Rules)"
        }

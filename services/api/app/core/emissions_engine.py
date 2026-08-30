from typing import Dict, Any
from app.models.domain import Vessel

# Standard Lower Heating Values (LHV) in MJ/kg
LHV_MJ_KG = {
    "VLSFO": 41.0,
    "HFO": 40.2,
    "MGO": 42.7,
    "LNG": 48.0,
    "Methanol": 19.9, "Bio-Methanol": 19.9
}

# TTW (Tank-to-Wake) CO2 emission factors (t-CO2 / t-Fuel) - IMO Standards
TTW_CO2_FACTORS = {
    "VLSFO": 3.206,
    "HFO": 3.114,
    "MGO": 3.206,
    "LNG": 2.750,
    "Methanol": 1.375, "Bio-Methanol": 1.375
}

# Base Specific Fuel Oil Consumption (SFOC) at optimal load in g/kWh
# (These vary by engine, but we use standard baselines based on fuel type)
BASE_SFOC_G_KWH = {
    "VLSFO": 175.0,
    "HFO": 175.0,
    "MGO": 180.0,
    "LNG": 155.0,
    "Methanol": 360.0, "Bio-Methanol": 360.0 # Higher mass consumption due to lower LHV
}

# Estimated Global Average Fuel Prices (USD / tonne) - Dynamic in a real system
FUEL_PRICES_USD = {
    "VLSFO": 612.0,
    "HFO": 510.0,
    "MGO": 780.0,
    "LNG": 540.0,
    "Methanol": 820.0, "Bio-Methanol": 1200.0
}

class EmissionsEngine:
    @staticmethod
    def calculate_voyage(vessel: Vessel, distance_nm: float, target_speed_knots: float = None) -> Dict[str, Any]:
        """
        Deterministic physics-based calculation for voyage fuel, emissions, and cost.
        """
        if distance_nm <= 0:
            raise ValueError("Distance must be greater than 0")

        # 1. Determine speed and engine parameters
        speed = target_speed_knots if target_speed_knots else vessel.service_speed_knots
        if not speed or speed <= 0:
            speed = 14.0 # Fallback average speed
            
        design_speed = vessel.design_speed_knots if vessel.design_speed_knots else speed
        max_power = vessel.engine_power_kw if vessel.engine_power_kw else 10000.0
        fuel_type = vessel.primary_fuel_type if vessel.primary_fuel_type in LHV_MJ_KG else "VLSFO"

        # 2. Physics: Power required follows roughly the cube of the speed ratio
        # P_req = P_design * (V_actual / V_design)^3
        speed_ratio = speed / design_speed
        # Clamp ratio to avoid unrealistic exponential blowups if user inputs 50 knots
        speed_ratio = min(max(speed_ratio, 0.3), 1.2) 
        
        required_power_kw = max_power * (speed_ratio ** 3)
        
        # 3. Time calculation
        time_hours = distance_nm / speed
        time_days = time_hours / 24.0

        # 4. Fuel Consumption Calculation
        # Fuel (tonnes) = Power (kW) * SFOC (g/kWh) * Time (h) / 1,000,000
        sfoc = BASE_SFOC_G_KWH[fuel_type]
        fuel_consumed_tonnes = (required_power_kw * sfoc * time_hours) / 1_000_000.0

        # 5. Emissions (TTW - Tank-to-Wake CO2)
        ttw_co2_tonnes = fuel_consumed_tonnes * TTW_CO2_FACTORS[fuel_type]
        
        # 6. Voyage Economics (Fuel Cost)
        fuel_cost_usd = fuel_consumed_tonnes * FUEL_PRICES_USD[fuel_type]

        # 7. Energy Consumed (MJ) - Needed for FuelEU Maritime calculations later
        energy_mj = fuel_consumed_tonnes * 1000.0 * LHV_MJ_KG[fuel_type]

        return {
            "vessel_imo": vessel.imo_number,
            "vessel_name": vessel.name,
            "route_distance_nm": round(distance_nm, 1),
            "speed_knots": round(speed, 1),
            "time_hours": round(time_hours, 1),
            "time_days": round(time_days, 2),
            "engine_load_pct": round((required_power_kw / max_power) * 100, 1),
            "power_required_kw": round(required_power_kw, 1),
            "fuel_type": fuel_type,
            "fuel_consumed_tonnes": round(fuel_consumed_tonnes, 2),
            "energy_consumed_mj": round(energy_mj, 1),
            "ttw_co2_tonnes": round(ttw_co2_tonnes, 2),
            "fuel_cost_usd": round(fuel_cost_usd, 2)
        }

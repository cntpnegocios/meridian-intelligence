import sys
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID

# This appends the new models to the END of api_models.py
with open("services/api/app/schemas/api_models.py", "a") as f:
    f.write("\n\n")
    f.write("class VoyageSimulationRequest(BaseModel):\n")
    f.write("    vessel_id: UUID\n")
    f.write("    distance_nm: float\n")
    f.write("    target_speed_knots: Optional[float] = None\n\n")
    
    f.write("class VoyageSimulationResponse(BaseModel):\n")
    f.write("    vessel_imo: str\n")
    f.write("    vessel_name: str\n")
    f.write("    route_distance_nm: float\n")
    f.write("    speed_knots: float\n")
    f.write("    time_hours: float\n")
    f.write("    time_days: float\n")
    f.write("    engine_load_pct: float\n")
    f.write("    power_required_kw: float\n")
    f.write("    fuel_type: str\n")
    f.write("    fuel_consumed_tonnes: float\n")
    f.write("    energy_consumed_mj: float\n")
    f.write("    ttw_co2_tonnes: float\n")
    f.write("    fuel_cost_usd: float\n")

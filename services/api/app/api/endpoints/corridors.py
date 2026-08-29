from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import Column, String, Float, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from typing import List, Dict, Any
from pydantic import BaseModel
import uuid

from app.db.session import get_db, Base

router = APIRouter()

# SQLAlchemy Models
class GreenCorridor(Base):
    __tablename__ = "green_corridors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    status = Column(String, default="PLANNING")
    target_emissions_intensity = Column(Float)

class CalculationRun(Base):
    __tablename__ = "calculation_runs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    corridor_id = Column(UUID(as_uuid=True))
    scenario_name = Column(String, nullable=False)
    inputs = Column(JSON, nullable=False)
    result = Column(JSON, nullable=False)
    status = Column(String, default="CALCULATED")

# Pydantic Schemas
class GreenCorridorResponse(BaseModel):
    id: uuid.UUID
    name: str
    status: str
    target_emissions_intensity: float | None
    
    class Config:
        from_attributes = True

class CalculationRunRequest(BaseModel):
    corridor_id: uuid.UUID
    scenario_name: str
    distance_nm: float
    vessel_class: str
    fuel_type: str

@router.get("/", response_model=List[GreenCorridorResponse])
def list_corridors(db: Session = Depends(get_db)):
    """List all Green Corridors."""
    return db.query(GreenCorridor).all()

@router.post("/calculator")
def run_green_voyage_calculator(req: CalculationRunRequest, db: Session = Depends(get_db)):
    """
    PHASE 15: Green Voyage Calculator
    This is an adapter endpoint that would theoretically call PACE-X for MRV logic.
    Since PACE-X is external, we simulate a TransportIntelligenceProvider response.
    """
    # Simulated PACE-X Math (For Discovery/Twin modeling only)
    fuel_consumption = req.distance_nm * 0.15 # tons per nm
    emissions_factor = 3.114 if req.fuel_type.lower() == "hfo" else 2.75 # tons CO2 per ton fuel
    total_co2 = fuel_consumption * emissions_factor
    
    # Check if this meets the target intensity (placeholder logic)
    corridor = db.query(GreenCorridor).filter(GreenCorridor.id == req.corridor_id).first()
    intensity = total_co2 / req.distance_nm
    
    result_data = {
        "fuel_consumption_tons": fuel_consumption,
        "co2_emissions_tons": total_co2,
        "intensity_co2_per_nm": intensity,
        "pace_x_simulation": True,
        "data_status": "ESTIMATED"
    }
    
    run = CalculationRun(
        corridor_id=req.corridor_id,
        scenario_name=req.scenario_name,
        inputs=req.model_dump(mode='json'),
        result=result_data
    )
    db.add(run)
    db.commit()
    db.refresh(run)
    
    return run

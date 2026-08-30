from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import Vessel
from app.schemas.api_models import VoyageSimulationRequest, VoyageSimulationResponse
from app.core.emissions_engine import EmissionsEngine

router = APIRouter()

@router.post("/simulate", response_model=VoyageSimulationResponse)
def simulate_voyage(req: VoyageSimulationRequest, db: Session = Depends(get_db)):
    """
    Deterministic voyage physics simulator.
    Calculates exact fuel consumption, emissions, and cost based on the
    technical profile of the specific vessel in the database.
    """
    vessel = db.query(Vessel).filter(Vessel.id == req.vessel_id).first()
    if not vessel:
        raise HTTPException(status_code=404, detail="Vessel not found")

    try:
        # Run physics calculations
        result = EmissionsEngine.calculate_voyage(
            vessel=vessel,
            distance_nm=req.distance_nm,
            target_speed_knots=req.target_speed_knots
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import Vessel
from app.schemas.api_models import VoyageSimulationRequest, VoyageSimulationResponse
from app.core.emissions_engine import EmissionsEngine
from app.core.regulatory_engine import RegulatoryEngine, EvidenceVault

router = APIRouter()

@router.post("/simulate", response_model=VoyageSimulationResponse)
def simulate_voyage(req: VoyageSimulationRequest, db: Session = Depends(get_db)):
    """
    Deterministic voyage physics simulator.
    Calculates exact fuel consumption, emissions, and cost based on the
    technical profile of the specific vessel in the database.
    Now includes EU ETS, FuelEU Maritime, and cryptographic Evidence Vault tracking.
    """
    vessel = db.query(Vessel).filter(Vessel.id == req.vessel_id).first()
    if not vessel:
        raise HTTPException(status_code=404, detail="Vessel not found")

    try:
        # 1. Physics Engine
        emissions_result = EmissionsEngine.calculate_voyage(
            vessel=vessel,
            distance_nm=req.distance_nm,
            target_speed_knots=req.target_speed_knots
        )
        
        # 2. Regulatory Engine
        regulatory_result = RegulatoryEngine.calculate_compliance(
            emissions_data=emissions_result,
            scope_percent=req.regulatory_scope_percent,
            year=2026
        )
        
        # 3. Evidence Vault (Provenance hash)
        inputs = {
            "vessel_imo": vessel.imo_number,
            "distance_nm": req.distance_nm,
            "target_speed_knots": req.target_speed_knots,
            "scope_percent": req.regulatory_scope_percent
        }
        evidence_result = EvidenceVault.generate_proof(
            inputs=inputs,
            results={"emissions": emissions_result, "regulatory": regulatory_result}
        )
        
        # 4. Construct Final Response
        return {
            **emissions_result,
            "regulatory": regulatory_result,
            "evidence": evidence_result
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

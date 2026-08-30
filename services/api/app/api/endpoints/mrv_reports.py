from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.mrv_reporting_engine import MRVReportingEngine

router = APIRouter()

@router.post("/generate-annual-report")
def generate_mrv_report(vessel_id: str, year: int, db: Session = Depends(get_db)):
    """
    Generates the official EU MRV Annual Report for a vessel.
    Calculates accumulated distance, fuel, CO2, and Energy Efficiency (AER),
    and applies a SHA-256 integrity hash.
    """
    try:
        report = MRVReportingEngine.generate_annual_report(db, vessel_id, year)
        return {
            "status": "success",
            "mrv_data": report
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

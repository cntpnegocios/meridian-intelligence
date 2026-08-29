from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Any
from uuid import UUID
from pydantic import BaseModel

from app.db.session import get_db
from app.models.domain import Evidence
from app.adapters.copernicus_provider import CopernicusProvider

router = APIRouter()

class ValidationResponse(BaseModel):
    ais_latitude: float
    ais_longitude: float
    sar_detected: bool
    time_difference_minutes: int
    spatial_difference_meters: int
    position_confidence: float
    status: str
    sentinel_product_id: str

@router.get("/", response_model=List[Any])
def read_evidence(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    evidence = db.query(Evidence).offset(skip).limit(limit).all()
    return evidence

@router.get("/{evidence_id}")
def read_evidence_by_id(evidence_id: UUID, db: Session = Depends(get_db)):
    evidence = db.query(Evidence).filter(Evidence.id == evidence_id).first()
    if not evidence:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return evidence

@router.post("/validate-position", response_model=ValidationResponse)
async def validate_ais_position_with_sar(
    latitude: float, 
    longitude: float, 
    timestamp_utc: str
):
    """
    Validates a given AIS position against Sentinel-1 SAR imagery.
    This fulfills the Meridian Intelligence "AIS Position Validation" capability.
    """
    # Initialize provider
    copernicus = CopernicusProvider()
    
    # In production, parse the string to datetime
    # timestamp = datetime.fromisoformat(timestamp_utc)
    
    # Query for SAR match
    match = await copernicus.find_nearest_sar_detection(latitude, longitude, None)
    
    if not match:
        raise HTTPException(status_code=404, detail="No SAR imagery available for this temporal/spatial window.")
        
    return ValidationResponse(
        ais_latitude=latitude,
        ais_longitude=longitude,
        sar_detected=True,
        time_difference_minutes=match["time_difference_minutes"],
        spatial_difference_meters=match["spatial_difference_meters"],
        position_confidence=match["confidence_score"],
        status=match["status"],
        sentinel_product_id=match["sentinel_product_id"]
    )

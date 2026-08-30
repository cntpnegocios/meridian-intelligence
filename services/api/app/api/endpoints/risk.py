from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.risk_engine import RiskEngine
from typing import Dict, Any

router = APIRouter()

@router.post("/evaluate-route")
def evaluate_voyage_risk(route_geojson: Dict[str, Any], db: Session = Depends(get_db)):
    """
    Evaluates a proposed route (GeoJSON LineString) against live Risk Zones 
    (Extreme Weather, Piracy, War Zones).
    """
    # Ensure it's a geometry object
    geom = route_geojson
    if geom.get("type") == "Feature" and "geometry" in geom:
        geom = geom["geometry"]
        
    risk_report = RiskEngine.evaluate_route(db, geom)
    
    return {
        "status": "success",
        "risk_report": risk_report
    }

from datetime import datetime, timezone
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db
from app.schemas.api_models import AISObservationBase
from app.models.domain import AISObservation, Vessel

router = APIRouter()

@router.post("/webhook")
def receive_ais_ping(ping: AISObservationBase, db: Session = Depends(get_db)):
    """
    Webhook to receive live satellite pings (e.g. from Spire/MarineTraffic).
    Stores the ping in the evidence-grade ais_observations table.
    """
    # Verify vessel exists
    vessel = db.query(Vessel).filter(Vessel.id == ping.vessel_id).first()
    if not vessel:
        raise HTTPException(status_code=404, detail="Vessel not found in registry")

    obs = AISObservation(**ping.model_dump())
    db.add(obs)
    db.commit()
    db.refresh(obs)
    return {"status": "success", "recorded_id": obs.id}


@router.get("/live")
def get_live_vessels(db: Session = Depends(get_db)):
    """
    Returns the latest known position for all active vessels directly from PostGIS.
    """
    query = text("""
        SELECT DISTINCT ON (v.id) 
            v.id, v.imo_number, v.name, v.flag, v.vessel_type,
            a.latitude, a.longitude, a.sog_knots, a.cog_degrees, a.observed_at
        FROM vessels v
        INNER JOIN ais_observations a ON v.id = a.vessel_id
        ORDER BY v.id, a.observed_at DESC
    """)
    
    result = db.execute(query)
    vessels = []
    for row in result:
        vessels.append({
            "vessel_id": str(row[0]),
            "imo": row[1],
            "name": row[2],
            "type": row[4],
            "lat": float(row[5]),
            "lon": float(row[6]),
            "sog": float(row[7]) if row[7] else 0.0,
            "cog": float(row[8]) if row[8] else 0.0,
            "timestamp_utc": row[9].isoformat()
        })

    return {
        "data_quality": "LIVE",
        "count": len(vessels),
        "vessels": vessels,
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/geojson")
def get_vessels_geojson(db: Session = Depends(get_db)):
    """Return vessel positions as GeoJSON FeatureCollection for deck.gl."""
    live_data = get_live_vessels(db)
    features = []
    
    for v in live_data["vessels"]:
        features.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [v["lon"], v["lat"]]},
            "properties": v,
        })
        
    return {
        "type": "FeatureCollection",
        "features": features,
        "data_quality": "LIVE",
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }

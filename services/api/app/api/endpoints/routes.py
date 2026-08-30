"""Routes endpoint — Phase 2: Real maritime + aviation route calculations."""
import json
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from app.db.session import get_db
from app.core.route_engine import calculate_maritime_route, calculate_aviation_route

router = APIRouter()


class RouteRequest(BaseModel):
    origin_lon: float
    origin_lat: float
    dest_lon: float
    dest_lat: float
    route_type: str = "MARITIME"  # MARITIME or AVIATION
    origin_code: str = ""
    dest_code: str = ""
    speed_knots: float = 14.0   # maritime avg container ship
    speed_kmh: float = 900.0    # aviation avg commercial jet


@router.post("/calculate")
def calculate_route(req: RouteRequest, db: Session = Depends(get_db)):
    """Calculate real maritime or aviation route."""
    if req.route_type not in ("MARITIME", "AVIATION"):
        raise HTTPException(status_code=400, detail="route_type must be MARITIME or AVIATION")

    try:
        if req.route_type == "MARITIME":
            result = calculate_maritime_route(
                req.origin_lon, req.origin_lat,
                req.dest_lon, req.dest_lat,
                req.origin_code, req.dest_code,
                req.speed_knots,
            )
        else:
            result = calculate_aviation_route(
                req.origin_lon, req.origin_lat,
                req.dest_lon, req.dest_lat,
                req.origin_code, req.dest_code,
                req.speed_kmh,
            )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Route calculation failed: {exc}") from exc

    # Cache result in DB (best-effort, don't fail if cache insert fails)
    try:
        db.execute(
            text("""
                INSERT INTO route_calculations
                (origin_unlocode, destination_unlocode, route_type, distance_nm, distance_km,
                 duration_hours, geojson_route, waypoints, source, confidence)
                VALUES
                (:org, :dst, :rt, :dnm, :dkm, :dh, :gj::jsonb, :wp::jsonb, :src, :conf)
            """),
            {
                "org": result.origin, "dst": result.destination, "rt": result.route_type,
                "dnm": result.distance_nm, "dkm": result.distance_km, "dh": result.duration_hours,
                "gj": json.dumps(result.geojson), "wp": json.dumps(result.waypoints),
                "src": result.source, "conf": result.confidence,
            },
        )
        db.commit()
    except Exception:
        db.rollback()

    return {
        "route_type": result.route_type,
        "origin": result.origin,
        "destination": result.destination,
        "distance_nm": result.distance_nm,
        "distance_km": result.distance_km,
        "duration_hours": result.duration_hours,
        "geojson": result.geojson,
        "waypoints": result.waypoints,
        "source": result.source,
        "confidence": result.confidence,
    }


@router.get("/cached")
def get_cached_route(
    origin: str, destination: str,
    route_type: str = "MARITIME",
    db: Session = Depends(get_db),
):
    """Return the last cached route for an origin-destination pair."""
    row = db.execute(
        text("""
            SELECT id, origin_unlocode, destination_unlocode, route_type,
                   distance_nm, distance_km, duration_hours,
                   geojson_route, waypoints, source, confidence, calculated_at
            FROM route_calculations
            WHERE origin_unlocode = :org
              AND destination_unlocode = :dst
              AND route_type = :rt
            ORDER BY calculated_at DESC
            LIMIT 1
        """),
        {"org": origin, "dst": destination, "rt": route_type},
    ).fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="No cached route found for this pair")

    return dict(row._mapping)

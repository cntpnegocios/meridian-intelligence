"""
Meridian Intelligence — Transport Nodes API Endpoint
Serves real transport_nodes data from the database as GeoJSON.
No mocks. Real data only.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Optional, List
from app.db.session import get_db

router = APIRouter(prefix="/nodes", tags=["transport-nodes"])


@router.get("")
async def list_nodes(
    db: Session = Depends(get_db),
    node_type: Optional[str] = Query(None, description="Comma-separated: PORT,AIRPORT,MULTIMODAL,INLAND"),
    country_iso: Optional[str] = Query(None, description="ISO 2-letter country code e.g. BR"),
    bbox: Optional[str] = Query(None, description="min_lon,min_lat,max_lon,max_lat"),
    in_eu_ets: Optional[bool] = Query(None),
    limit: int = Query(2000, le=10000),
):
    """
    Return transport nodes as GeoJSON FeatureCollection.
    Optimized for MapLibre / deck.gl rendering.
    """
    conditions = ["1=1"]
    params: dict = {"limit": limit}

    if node_type:
        types = [t.strip().upper() for t in node_type.split(",")]
        conditions.append("node_type = ANY(:types)")
        params["types"] = types

    if country_iso:
        conditions.append("country_iso = :country_iso")
        params["country_iso"] = country_iso.upper()

    if bbox:
        try:
            min_lon, min_lat, max_lon, max_lat = [float(x) for x in bbox.split(",")]
            conditions.append(
                "ST_Within(geom, ST_MakeEnvelope(:min_lon, :min_lat, :max_lon, :max_lat, 4326))"
            )
            params.update(min_lon=min_lon, min_lat=min_lat, max_lon=max_lon, max_lat=max_lat)
        except ValueError:
            raise HTTPException(status_code=400, detail="bbox must be: min_lon,min_lat,max_lon,max_lat")

    if in_eu_ets is not None:
        conditions.append("in_eu_ets_scope = :in_eu_ets")
        params["in_eu_ets"] = in_eu_ets

    where = " AND ".join(conditions)

    sql = text(f"""
        SELECT
            id, node_type, name, country, country_iso,
            unlocode, iata, icao, wpi_id,
            latitude, longitude,
            harbour_type, harbour_size, max_draft_m, channel_depth_m,
            has_containers, has_lng, has_rail, has_drydock, has_bunker,
            airport_type, elevation_ft, runway_count, has_scheduled_service,
            in_eu_ets_scope, in_fueleu_scope, in_eca_seca,
            geofence_radius_m, source, source_updated_at
        FROM transport_nodes
        WHERE {where}
        ORDER BY
            CASE node_type WHEN 'PORT' THEN 1 WHEN 'AIRPORT' THEN 2 ELSE 3 END,
            name
        LIMIT :limit
    """)

    rows = db.execute(sql, params).mappings().all()

    features = []
    for r in rows:
        props = dict(r)
        lat = props.pop("latitude")
        lon = props.pop("longitude")
        # Convert non-serializable types
        if props.get("source_updated_at"):
            props["source_updated_at"] = str(props["source_updated_at"])

        features.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": props,
        })

    return {
        "type": "FeatureCollection",
        "features": features,
        "meta": {
            "total": len(features),
            "source": "Meridian Transport Node Registry (UN/LOCODE + NGA WPI + OurAirports)"
        }
    }


@router.get("/search")
async def search_nodes(
    db: Session = Depends(get_db),
    q: str = Query(..., min_length=2, description="Search term: port/airport name, LOCODE, IATA, ICAO"),
    limit: int = Query(10, le=50),
):
    """
    Full-text search for ports and airports.
    Used by the Route Planner origin/destination selector.
    """
    sql = text("""
        SELECT
            id, node_type, name, country, country_iso,
            unlocode, iata, icao, latitude, longitude,
            in_eu_ets_scope, source,
            ts_rank(to_tsvector('english', name), plainto_tsquery('english', :q)) AS rank
        FROM transport_nodes
        WHERE
            to_tsvector('english', name) @@ plainto_tsquery('english', :q)
            OR unlocode ILIKE :q_like
            OR iata ILIKE :q_like
            OR icao ILIKE :q_like
        ORDER BY rank DESC, name
        LIMIT :limit
    """)

    rows = db.execute(sql, {"q": q, "q_like": f"%{q}%", "limit": limit}).mappings().all()

    return {
        "results": [dict(r) for r in rows],
        "query": q,
        "count": len(rows)
    }


@router.get("/{node_id}")
async def get_node_detail(node_id: str, db: Session = Depends(get_db)):
    """
    Full detail for a single transport node.
    Used by the MapCockpit popup panel.
    """
    sql = text("""
        SELECT * FROM transport_nodes WHERE id = :node_id
    """)
    row = db.execute(sql, {"node_id": node_id}).mappings().first()
    if not row:
        raise HTTPException(status_code=404, detail=f"Node {node_id} not found")

    data = dict(row)
    if data.get("source_updated_at"):
        data["source_updated_at"] = str(data["source_updated_at"])
    if data.get("created_at"):
        data["created_at"] = str(data["created_at"])
    if data.get("updated_at"):
        data["updated_at"] = str(data["updated_at"])
    return data

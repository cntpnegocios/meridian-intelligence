"""
Route Intelligence Engine — Phase 2
Maritime: searoute library (real sea route avoiding land)
Aviation: pyproj great circle (WGS84 geodesic)
"""
from dataclasses import dataclass, field
from typing import List


@dataclass
class RouteResult:
    route_type: str
    origin: str
    destination: str
    distance_nm: float
    distance_km: float
    duration_hours: float
    geojson: dict
    waypoints: List[list]
    source: str
    confidence: str = "HIGH"


def calculate_maritime_route(
    origin_lon: float, origin_lat: float,
    dest_lon: float, dest_lat: float,
    origin_code: str = "", dest_code: str = "",
    speed_knots: float = 14.0,
) -> RouteResult:
    """Calculate real sea route using searoute (avoids land masses)."""
    import searoute as sr

    origin = [origin_lon, origin_lat]
    destination = [dest_lon, dest_lat]

    try:
        route = sr.searoute(origin, destination, units="naut")
        distance_nm = float(route["properties"]["length"])
        coords = list(route["geometry"]["coordinates"])
        source = "searoute"
        confidence = "HIGH"
    except Exception:
        # Fallback: straight line with DEGRADED confidence
        coords = [[origin_lon, origin_lat], [dest_lon, dest_lat]]
        from pyproj import Geod
        geod = Geod(ellps="WGS84")
        _, _, dist_m = geod.inv(origin_lon, origin_lat, dest_lon, dest_lat)
        distance_nm = dist_m / 1852.0
        source = "straight_line_fallback"
        confidence = "DEGRADED"

    distance_km = distance_nm * 1.852
    duration_hours = distance_nm / speed_knots
    step = max(1, len(coords) // 20)
    waypoints = coords[::step]

    geojson = {
        "type": "Feature",
        "geometry": {"type": "LineString", "coordinates": coords},
        "properties": {
            "route_type": "MARITIME",
            "distance_nm": round(distance_nm, 2),
            "source": source,
            "confidence": confidence,
        },
    }

    return RouteResult(
        route_type="MARITIME",
        origin=origin_code,
        destination=dest_code,
        distance_nm=round(distance_nm, 2),
        distance_km=round(distance_km, 2),
        duration_hours=round(duration_hours, 2),
        geojson=geojson,
        waypoints=waypoints,
        source=source,
        confidence=confidence,
    )


def calculate_aviation_route(
    origin_lon: float, origin_lat: float,
    dest_lon: float, dest_lat: float,
    origin_code: str = "", dest_code: str = "",
    speed_kmh: float = 900.0,
) -> RouteResult:
    """Calculate great circle aviation route (WGS84 geodesic via pyproj)."""
    from pyproj import Geod

    geod = Geod(ellps="WGS84")

    # Great circle with 50 intermediate points
    r = geod.inv_intermediate(
        origin_lon, origin_lat, dest_lon, dest_lat,
        npts=50, initial_idx=0, terminus_idx=0,
    )
    lons, lats = list(r.lons), list(r.lats)

    _, _, distance_m = geod.inv(origin_lon, origin_lat, dest_lon, dest_lat)
    distance_km = distance_m / 1000.0
    distance_nm = distance_km / 1.852
    duration_hours = distance_km / speed_kmh

    coords = [[lon, lat] for lon, lat in zip(lons, lats)]
    geojson = {
        "type": "Feature",
        "geometry": {"type": "LineString", "coordinates": coords},
        "properties": {
            "route_type": "AVIATION",
            "distance_nm": round(distance_nm, 2),
            "source": "pyproj_great_circle",
            "confidence": "HIGH",
        },
    }

    return RouteResult(
        route_type="AVIATION",
        origin=origin_code,
        destination=dest_code,
        distance_nm=round(distance_nm, 2),
        distance_km=round(distance_km, 2),
        duration_hours=round(duration_hours, 2),
        geojson=geojson,
        waypoints=coords[::5],
        source="pyproj_great_circle",
        confidence="HIGH",
    )

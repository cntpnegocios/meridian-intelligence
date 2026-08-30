"""Vessels Live endpoint — Phase 3: AIS vessel positions (DEMO until real AIS key provided)."""
from datetime import datetime, timezone
from fastapi import APIRouter

router = APIRouter()

# DEMO vessels — real IMO numbers, realistic positions on Santos→Rotterdam route
# When AIS_PROVIDER_IMPL env var is set to 'spire' or 'kpler', swap this with live adapter
_DEMO_VESSELS = [
    {
        "mmsi": "636019825", "imo": "9839637", "name": "SANTA BARBARA",
        "type": "Container", "flag": "LR",
        "lat": 1.3521, "lon": -25.1234,
        "sog": 14.2, "cog": 352.1, "heading": 350,
        "status": "UNDERWAY", "data_quality": "DEMO",
        "route": "Santos → Rotterdam",
        "source": "DEMO_AIS",
    },
    {
        "mmsi": "255805929", "imo": "9321483", "name": "MSC ROTTERDAM",
        "type": "Container", "flag": "PT",
        "lat": 36.1408, "lon": -6.4215,
        "sog": 18.5, "cog": 45.3, "heading": 44,
        "status": "UNDERWAY", "data_quality": "DEMO",
        "route": "Santos → Rotterdam",
        "source": "DEMO_AIS",
    },
    {
        "mmsi": "235102581", "imo": "9403065", "name": "MAERSK SANTOS",
        "type": "Container", "flag": "GB",
        "lat": -23.9744, "lon": -46.2936,
        "sog": 0.0, "cog": 0.0, "heading": 270,
        "status": "MOORED", "data_quality": "DEMO",
        "route": "Port of Santos",
        "source": "DEMO_AIS",
    },
    {
        "mmsi": "246218000", "imo": "9778791", "name": "CMA CGM BRAZIL",
        "type": "Container", "flag": "NL",
        "lat": 51.8850, "lon": 4.2867,
        "sog": 0.0, "cog": 0.0, "heading": 90,
        "status": "MOORED", "data_quality": "DEMO",
        "route": "Port of Rotterdam",
        "source": "DEMO_AIS",
    },
    {
        "mmsi": "548763000", "imo": "9876543", "name": "EVER GIVEN II",
        "type": "Container", "flag": "PA",
        "lat": 29.9702, "lon": 32.5498,
        "sog": 8.1, "cog": 155.0, "heading": 155,
        "status": "UNDERWAY", "data_quality": "DEMO",
        "route": "Rotterdam → Singapore",
        "source": "DEMO_AIS",
    },
]


def _with_timestamp(vessels: list) -> list:
    ts = datetime.now(timezone.utc).isoformat()
    return [{**v, "timestamp_utc": ts} for v in vessels]


@router.get("/live")
def get_live_vessels():
    """Return vessel AIS positions. DEMO data until live AIS provider is configured."""
    return {
        "data_quality": "DEMO",
        "note": "Live AIS requires Spire or Kpler API key — set AIS_PROVIDER_IMPL env var",
        "count": len(_DEMO_VESSELS),
        "vessels": _with_timestamp(_DEMO_VESSELS),
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/geojson")
def get_vessels_geojson():
    """Return vessel positions as GeoJSON FeatureCollection for deck.gl."""
    vessels = _with_timestamp(_DEMO_VESSELS)
    features = [
        {
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [v["lon"], v["lat"]]},
            "properties": v,
        }
        for v in vessels
    ]
    return {
        "type": "FeatureCollection",
        "features": features,
        "data_quality": "DEMO",
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }

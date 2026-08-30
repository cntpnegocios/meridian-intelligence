"""Source Registry endpoint — Phase 9: Data source catalog and health monitor."""
from datetime import datetime, timezone
from fastapi import APIRouter

router = APIRouter()

SOURCES = [
    {
        "id": "unlocode", "name": "UN/LOCODE", "provider": "UNECE",
        "type": "OPEN_DATA", "status": "LIVE",
        "last_updated": "2024-12-01", "records": 13965,
        "url": "https://unece.org/trade/cefact/unlocode-code-list-by-country-and-territory",
        "description": "United Nations Code for Trade and Transport Locations — ports, airports, terminals worldwide",
    },
    {
        "id": "ourairports", "name": "OurAirports", "provider": "OurAirports.com",
        "type": "OPEN_DATA", "status": "LIVE",
        "last_updated": "2024-12-01", "records": 5281,
        "url": "https://davidmegginson.github.io/ourairports-data/airports.csv",
        "description": "Comprehensive global airport database — large and medium airports with IATA/ICAO codes",
    },
    {
        "id": "nga_wpi", "name": "NGA World Port Index", "provider": "US Government NGA",
        "type": "OPEN_DATA", "status": "LIVE",
        "last_updated": "2024-01-01", "records": 3700,
        "url": "https://msi.nga.mil/Publications/WPI",
        "description": "Official port data from US National Geospatial-Intelligence Agency — depth, facilities, restrictions",
    },
    {
        "id": "searoute", "name": "SeaRoute Engine", "provider": "searoute-py",
        "type": "COMPUTATION", "status": "LIVE",
        "last_updated": "2024-01-01", "records": None,
        "url": "https://github.com/genthalili/searoute-py",
        "description": "Maritime route calculation engine — avoids land masses, calculates realistic sea distances",
    },
    {
        "id": "spire_ais", "name": "Spire AIS", "provider": "Spire Global",
        "type": "LICENSED", "status": "UNAVAILABLE",
        "note": "Requires API key — set AIS_PROVIDER_IMPL=spire",
        "url": "https://spire.com/maritime/",
        "description": "Real-time S-AIS vessel tracking — global coverage via satellite constellation",
    },
    {
        "id": "adsb_exchange", "name": "ADS-B Exchange", "provider": "ADS-B Exchange",
        "type": "OPEN_DATA", "status": "UNAVAILABLE",
        "note": "Requires API key for live feed",
        "url": "https://www.adsbexchange.com/data/",
        "description": "Unfiltered ADS-B aircraft tracking data — real-time aviation positions",
    },
    {
        "id": "eu_ets_mrv", "name": "EU MRV / ETS Registry", "provider": "EMSA / European Commission",
        "type": "REGULATORY", "status": "LIVE",
        "url": "https://mrv.emsa.europa.eu",
        "description": "EU Monitoring, Reporting and Verification — official emission reports and ETS compliance",
    },
    {
        "id": "fueleu", "name": "FuelEU Maritime Regulation", "provider": "EMSA / EC",
        "type": "REGULATORY", "status": "LIVE",
        "url": "https://maritime.ec.europa.eu/transport-themes/clean-shipping/fueleu-maritime_en",
        "description": "FuelEU Maritime — GHG intensity targets and compliance framework from 2025",
    },
    {
        "id": "copernicus", "name": "Copernicus Marine Service", "provider": "ECMWF / EU",
        "type": "OPEN_DATA", "status": "LIVE",
        "url": "https://marine.copernicus.eu",
        "description": "Satellite ocean observations — currents, SST, sea ice for route optimization",
    },
]


@router.get("/")
def list_sources():
    """List all registered data sources with their status."""
    return {
        "sources": SOURCES,
        "total": len(SOURCES),
        "live": len([s for s in SOURCES if s["status"] == "LIVE"]),
        "unavailable": len([s for s in SOURCES if s["status"] == "UNAVAILABLE"]),
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/health")
def health_check():
    """Health check for all data sources."""
    live = [s for s in SOURCES if s["status"] == "LIVE"]
    unavailable = [s for s in SOURCES if s["status"] == "UNAVAILABLE"]
    overall = "DEGRADED" if unavailable else "OK"
    return {
        "status": overall,
        "live_count": len(live),
        "unavailable_count": len(unavailable),
        "live_sources": [s["id"] for s in live],
        "unavailable_sources": [s["id"] for s in unavailable],
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/{source_id}")
def get_source(source_id: str):
    """Get details for a specific source."""
    src = next((s for s in SOURCES if s["id"] == source_id), None)
    if not src:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail=f"Source '{source_id}' not found")
    return src

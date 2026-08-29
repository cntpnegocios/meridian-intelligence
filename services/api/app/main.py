from fastapi import FastAPI
from datetime import datetime, timezone

app = FastAPI(title="Meridian Intelligence API", version="0.1.0")

@app.get("/health")
def health():
    return {
        "service": "meridian-intelligence-api",
        "status": "ok",
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "live_data": False,
    }

@app.get("/v1/capabilities")
def capabilities():
    return {
        "voyage_intelligence": "scaffolded",
        "maritime_intelligence": "scaffolded",
        "regulatory_radar": "scaffolded",
        "eu_ets": "scaffolded",
        "fueleu": "scaffolded",
        "green_corridors": "scaffolded",
        "evidence_vault": "scaffolded",
    }

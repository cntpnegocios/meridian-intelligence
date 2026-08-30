from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from app.core.config import settings
from app.api.endpoints import vessels, voyages, evidence, ports, corridors, ai_intelligence, nodes

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(vessels.router, prefix=f"{settings.API_V1_STR}/vessels", tags=["vessels"])
app.include_router(voyages.router, prefix=f"{settings.API_V1_STR}/voyages", tags=["voyages"])
app.include_router(evidence.router, prefix=f"{settings.API_V1_STR}/evidence", tags=["evidence"])
app.include_router(ports.router, prefix=f"{settings.API_V1_STR}/ports", tags=["ports"])
app.include_router(corridors.router, prefix=f"{settings.API_V1_STR}/corridors", tags=["corridors"])
app.include_router(ai_intelligence.router, prefix=f"{settings.API_V1_STR}/ai", tags=["ai"])
app.include_router(nodes.router, prefix=f"{settings.API_V1_STR}", tags=["nodes"])

@app.get("/api/health")
def health():
    return {
        "service": settings.PROJECT_NAME,
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

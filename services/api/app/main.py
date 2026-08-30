from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from app.core.config import settings
from app.api.endpoints import (
    vessels, voyages, evidence, ports, corridors,
    ai_intelligence, nodes, routes, vessels_live, source_registry,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Meridian Intelligence — Maritime & Aviation Transport Monitoring Platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Phase 1: Transport Nodes ─────────────────────────────────
app.include_router(nodes.router,           prefix=f"{settings.API_V1_STR}",               tags=["nodes"])

# ── Phase 2: Route Intelligence ──────────────────────────────
app.include_router(routes.router,          prefix=f"{settings.API_V1_STR}/routes",         tags=["routes"])

# ── Phase 3: AIS Vessel Tracking ────────────────────────────
app.include_router(vessels_live.router,    prefix=f"{settings.API_V1_STR}/vessels",        tags=["vessels-live"])
app.include_router(vessels.router,         prefix=f"{settings.API_V1_STR}/vessels",        tags=["vessels"])

# ── Core Domain ──────────────────────────────────────────────
app.include_router(voyages.router,         prefix=f"{settings.API_V1_STR}/voyages",        tags=["voyages"])
app.include_router(evidence.router,        prefix=f"{settings.API_V1_STR}/evidence",       tags=["evidence"])
app.include_router(ports.router,           prefix=f"{settings.API_V1_STR}/ports",          tags=["ports"])
app.include_router(corridors.router,       prefix=f"{settings.API_V1_STR}/corridors",      tags=["corridors"])
app.include_router(ai_intelligence.router, prefix=f"{settings.API_V1_STR}/ai",             tags=["ai"])

# ── Phase 9: Source Registry ─────────────────────────────────
app.include_router(source_registry.router, prefix=f"{settings.API_V1_STR}/source-registry", tags=["source-registry"])


@app.get("/api/health")
def health():
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "ok",
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "live_data": False,
        "phases_active": ["phase1_nodes", "phase2_routes", "phase3_ais_demo", "phase9_source_registry"],
    }


@app.get(f"{settings.API_V1_STR}/capabilities")
def capabilities():
    return {
        "transport_node_registry": "LIVE — 19334 real nodes (UN/LOCODE + OurAirports)",
        "route_intelligence": "LIVE — searoute (maritime) + great circle (aviation)",
        "ais_tracking": "DEMO — real AIS requires Spire/Kpler API key",
        "voyage_intelligence": "scaffolded",
        "maritime_intelligence": "scaffolded",
        "regulatory_radar": "scaffolded",
        "eu_ets": "scaffolded",
        "fueleu": "scaffolded",
        "green_corridors": "scaffolded",
        "evidence_vault": "scaffolded",
        "source_registry": "LIVE",
    }

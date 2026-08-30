from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from app.core.config import settings
from app.api.endpoints import (
    vessels, voyages, evidence, ports, corridors,
    ai_intelligence, nodes, routes, vessels_live, source_registry, engines, risk, mrv_reports, admin, documents, finops
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Meridian Intelligence - Maritime & Aviation Transport Monitoring Platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Admin & Settings 
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin Settings"])

#  Phase 1: Transport Nodes 
app.include_router(nodes.router, prefix="/api/v1/nodes", tags=["Nodes"])

#  Phase 2: Route Intelligence 
app.include_router(routes.router, prefix="/api/v1/routes", tags=["Routes"])

#  Phase 3: AIS Vessel Tracking 
app.include_router(vessels_live.router, prefix="/api/v1/vessels", tags=["Live Vessels"])
app.include_router(vessels.router, prefix="/api/v1/assets/vessels", tags=["Assets"])
app.include_router(engines.router, prefix="/api/v1/engines", tags=["Engines"])
app.include_router(risk.router, prefix="/api/v1/risk", tags=["Risk Intelligence"])

#  Core Domain 
app.include_router(voyages.router,         prefix=f"{settings.API_V1_STR}/voyages",        tags=["voyages"])
app.include_router(evidence.router,        prefix=f"{settings.API_V1_STR}/evidence",       tags=["evidence"])
app.include_router(ports.router,           prefix=f"{settings.API_V1_STR}/ports",          tags=["ports"])
app.include_router(corridors.router,       prefix=f"{settings.API_V1_STR}/corridors",      tags=["corridors"])
app.include_router(ai_intelligence.router, prefix=f"{settings.API_V1_STR}/ai",             tags=["ai"])

# ── Phase 14 & 15: MRV Reporting & AI Documents ──────────────────────────────
app.include_router(mrv_reports.router, prefix="/api/v1/mrv", tags=["EU MRV Reporting"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["AI Document Intelligence"])

# ── Phase 16: FinOps (Financial Operations) ──────────────────────────────
app.include_router(finops.router, prefix="/api/v1/finops", tags=["Financial Operations"])

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

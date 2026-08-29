# PHASE 2 — EXISTING CAPABILITY INVENTORY

| CAPABILITY | LOCATION | FRONTEND | BACKEND | DATABASE | API | PROVIDER | STATUS | QUALITY | TESTS | RECOMMENDATION |
|---|---|---|---|---|---|---|---|---|---|---|
| **Maritime Intelligence** | `apps/web/src/pages/MaritimeIntelligence.tsx` | UI Shell | Scaffolded | N/A | N/A | N/A | PARTIAL | Mock | None | Extend existing foundation |
| **Green Corridors** | N/A | N/A | N/A | N/A | N/A | N/A | NOT IMPLEMENTED | N/A | N/A | Build inside Maritime Intelligence |
| **Routes / Voyages** | `services/api/app/api/endpoints/voyages.py` | `VoyageIntelligence.tsx` | FastAPI | `voyages`, `voyage_legs` | `/voyages` | Spire Adapter (Skeleton) | IMPLEMENTED | Skeleton | None | Extend with routing engine / PACE-X |
| **Maps / GIS** | `components/ui/MapCockpit.tsx` | Deck.gl / MapLibre | `geofence_engine.py` | `geofences` | N/A | N/A | IMPLEMENTED | Good | None | Add Cesium for 3D Earth toggle |
| **Satellite (SAR)** | `services/api/app/adapters/copernicus_provider.py` | `EvidenceVault.tsx` | FastAPI | `evidence.observation_type` | `/evidence/validate-position` | Copernicus | IMPLEMENTED | Skeleton | None | Wire into Evidence Vault |
| **Port Information** | `database/004_br_eu_ports_seed.sql` | N/A | N/A | `ports` | N/A | UN/LOCODE | DATABASE ONLY | Seed Data | None | Expose via API `/ports` |
| **Vessel Info** | `services/api/app/api/endpoints/vessels.py` | N/A | FastAPI | `vessels` | `/vessels` | N/A | DATABASE ONLY | Basic | None | Extend with IMO integration |
| **AIS** | `services/api/app/adapters/spire_ais_provider.py` | `MapCockpit.tsx` | FastAPI | `ais_observations` | `/voyages/latest-position` | Spire / Demo | IMPLEMENTED | Base | None | Inject live Spire API Key |
| **Weather / Ocean** | N/A | N/A | N/A | N/A | N/A | N/A | NOT IMPLEMENTED | N/A | N/A | Implement Copernicus Marine |
| **Risk / Regulation** | `apps/web/src/pages/RegulatoryRadar.tsx` | UI Shell | Scaffolded | N/A | N/A | N/A | PARTIAL | Mock | None | Build Regulatory Agent logic |
| **Emissions / Economics** | N/A | N/A | N/A | N/A | N/A | N/A | NOT IMPLEMENTED | N/A | N/A | Delegate to PACE-X where possible |
| **Evidence / Hashing** | `services/api/app/api/endpoints/evidence.py` | `EvidenceVault.tsx` | FastAPI | `evidence` (sha256) | `/evidence` | N/A | PARTIAL | Architecture | None | Build Promotion Workflow |

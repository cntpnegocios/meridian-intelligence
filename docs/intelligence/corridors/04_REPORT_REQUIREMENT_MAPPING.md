# PHASE 4 — SOURCE REPORT ALIGNMENT

| REPORT REQUIREMENT | CURRENT IMPLEMENTATION | MERIDIAN INTELLIGENCE ROLE | MERIDIAN CORE ROLE | PACE-X ROLE | EXTERNAL PARTNER ROLE | GAP |
|---|---|---|---|---|---|---|
| Vessel Tracking (Origin to Destination) | `voyages` / `ais_observations` | Visualise voyage and trigger geofence events. | Accept verified voyage logic as evidence. | N/A | Provide AIS data (Spire/Kpler). | Live AIS Key missing |
| Green Corridor Route Definition | `ports` / `geofences` | Define and model the corridor scenarios. | N/A | N/A | N/A | Needs `corridors` domain model |
| Emissions Calculation (TtW, WtW) | NOT IMPLEMENTED | Trigger calculation and present What-If scenarios. | Store the final verified MRV emission record. | Provide actual calculation engine/API. | Provide fuel factors. | Integration with PACE-X API |
| Regulatory Exposure (EU ETS / FuelEU) | NOT IMPLEMENTED | Model cost exposure based on routes crossing EEZs. | N/A | Calculate exact allowance obligations. | N/A | Need EEZ Geofences & PACE-X rules |
| Environmental Asset / Insetting | NOT IMPLEMENTED | Analyze residual emissions and search eligible assets. | Hold authoritative registries of issued/retired units. | N/A | Registry / Verification. | Integration with Core Assets |
| Evidence Promotion & Traceability | `evidence` table | Bundle scenario inputs/outputs into a hashed candidate. | Accept candidate, execute validation, store immutable hash. | N/A | External auditors review evidence. | Promotion Workflow UI |

# PHASE 6 — CORRIDOR DATA MODEL PROPOSAL

| Model Name | Classification | Description |
|---|---|---|
| `GreenCorridor` | NEW | The core digital twin holding the overarching corridor rules and geography. |
| `CorridorEndpoint` | NEW | Relates a `GreenCorridor` to a specific `Port`. (e.g. Origin, Destination, Hub). |
| `Port` | REUSE | The existing UN/LOCODE table (`ports`). |
| `Vessel` | REUSE | Existing table for tracking assigned ships. |
| `Voyage` | EXTEND | The physical execution of the corridor. |
| `RouteScenario` | NEW | What-if scenarios (e.g. comparing minimum distance vs minimum regulatory cost). |
| `CalculationRun` | NEW | Immutable record of an emissions/cost calculation before it becomes Evidence. |
| `AISObservation` | REUSE | Existing table containing SATELLITE/TERRESTRIAL observations. |
| `EvidenceCandidate` | NEW | The bridge between Intelligence logic and the authoritative Evidence Vault. |

# PHASE 9 — ROUTE INTELLIGENCE (OPEN SOURCE ROUTING REVIEW)

## Assessment of SeaRouting / Searoute
To model Green Corridors, we need polyline graphs of maritime routes avoiding landmasses.

### Python Candidate: `searoute` (PyPI)
- **Status:** Available open-source package.
- **Capabilities:** Calculates shortest maritime route between two coordinates using a pre-calculated graph.
- **Role in Meridian:** Provide baseline distance for 'What-If' scenarios (e.g. ideal distance vs actual AIS distance).
- **Recommendation:** Integrate `searoute` into `GeofenceEngine` or a dedicated `RouteEngine` to produce `[lon, lat]` path arrays for Deck.gl's `PathLayer` rendering.

### Integration Plan
1. Corridors are defined by Origin and Destination UN/LOCODEs.
2. The UI queries the backend for the Corridor geometry.
3. Backend uses `searoute` to generate the shortest maritime path.
4. UI renders the path on `MapCockpit`.

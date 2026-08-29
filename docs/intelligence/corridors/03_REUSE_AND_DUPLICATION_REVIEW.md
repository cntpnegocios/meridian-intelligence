# PHASE 3 — PREVENT DUPLICATION

## Duplication Review per Proposed Capability

### 1. Satellite & Geospatial Services
- **Does it exist?** YES.
- **Location:** `MapCockpit.tsx` (Deck.gl/MapLibre) and `copernicus_provider.py`.
- **Decision:** **EXTEND IT**. Do not build a second map or a separate Sentinel integration for Green Corridors. Green Corridors will mount the existing `MapCockpit` and pass green corridor arcs/polygons as layers.

### 2. AIS & Vessel Data
- **Does it exist?** YES.
- **Location:** `ais_observations` table and `SpireAISProvider`.
- **Decision:** **REUSE IT**. Corridors will query the exact same AIS provider interface.

### 3. Ports Database
- **Does it exist?** YES.
- **Location:** `ports` table (UN/LOCODEs seeded for BR and EU).
- **Decision:** **REUSE IT**. The Corridor endpoints will reference these existing ports.

### 4. Emissions & Transport Analytics
- **Does it exist?** PACE-X (Core Ecosystem).
- **Decision:** **EXTERNAL ADAPTER**. Do not duplicate PACE-X's complex transport emission models inside Meridian Intelligence. We will build a `TransportIntelligenceProvider` adapter that queries PACE-X (or falls back to an estimation logic tagged as `ESTIMATED`).

### 5. Evidence Engine
- **Does it exist?** YES.
- **Location:** `evidence` table and `/evidence` API.
- **Decision:** **REUSE IT**. All analytical outputs from the Green Corridor module (scenarios, calculations) will be promoted to candidates using this existing vault.

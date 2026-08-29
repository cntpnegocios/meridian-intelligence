# PHASE 5 — TARGET ARCHITECTURE

## Target Analytical Subsystem
```text
MERIDIAN INTELLIGENCE
│
├── MARITIME INTELLIGENCE
│
│   ├── GREEN CORRIDORS (NEW - Built inside Maritime)
│   │   ├── Corridor Digital Twin (Scenarios)
│   │   ├── Corridor Control Tower (Map Cockpit + Layers)
│   │   ├── Emissions Intelligence (via PACE-X adapter)
│   │   ├── Economics Intelligence (Market/Carbon Prices)
│   │   ├── Regulatory Exposure (ETS/FuelEU boundary alerts)
│   │   ├── Insetting Analysis (Residual mapping)
│   │   └── Evidence Candidate Promotion
│
└── SHARED INTELLIGENCE SERVICES (EXISTING)
    ├── Geospatial (MapLibre/Deck.gl)
    ├── Satellite (Copernicus SAR Validation)
    ├── AIS Intelligence (Spire API)
    ├── Port Intelligence (UN/LOCODE DB)
    └── Data Provenance (Evidence Vault)
```

## System Boundary Enforcement
1. The **Green Corridors** capability will NOT be a separate OS. It will be routed under `/maritime/corridors` in the existing Vite application.
2. It will consume the existing `SpireAISProvider`, `geofence_engine`, and `EvidenceVault`.
3. It will abstract emissions math via a `TransportIntelligenceProvider` communicating with PACE-X.
4. It will never mint authoritative carbon credits (MeridianMRV Core does this).

*STOPPING HERE FOR APPROVAL (GATE 4/5).*

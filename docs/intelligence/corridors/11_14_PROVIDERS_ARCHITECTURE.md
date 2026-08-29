# PHASE 11 & 14 — METOCEAN AND TRANSPORT EMISSIONS PROVIDERS

## Transport Emissions Intelligence (PACE-X)
The emissions math required for Green Corridors is explicitly decoupled from Meridian Intelligence. 
- **Adapter Strategy:** A `TransportIntelligenceProvider` will be created to interface with PACE-X.
- **Data Status Tag:** Outputs will be strictly tagged as `ESTIMATED` (when using theoretical ship design data) or `COMPUTED_UNVERIFIED` (when using raw AIS), preventing contamination of MRV registries.

## Metocean Intelligence (Copernicus Marine)
- **Role:** Provide context for voyage performance (Wind, Waves, Currents) which impact Fuel Consumption.
- **Adapter Strategy:** A `CopernicusMarineProvider` will simulate fetching metocean datasets.
- **Use Case in Corridors:** Comparing standard fuel consumption vs weather-adjusted consumption to understand if a corridor's bad performance was due to operations or weather.

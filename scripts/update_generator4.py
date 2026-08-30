import json
import os
import re

path = 'scripts/generate_ui.py'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

func_code = '''
def generate_evidence_vault() -> str:
    return call_blink(f\"\"\"
{DESIGN_TOKENS}
Generate a complete TypeScript React page: EvidenceVault (export function EvidenceVault)
It is the Evidence Vault for maritime emissions. 
Include a PageHeader (title="Evidence Vault", subtitle="Imutable SHA-256 Records & Audit Trail").
1. Top KPI Row: 3 MetricCards (Total Records, Verified Hashes, Pending Audit).
2. A beautiful, dark-mode table of evidence records. Columns: ID, Voyage, Vessel, Route, Capture Date, Status (Verified/Pending/Rejected), SHA-256 Hash (truncate to 10 chars with ...).
3. Right sidebar or expandable section showing "Audit Detail" for one selected record: showing the full SHA-256 hash, parser version (meridian-parser-v2.1.0), AI confidence (e.g. 98%), AIS fixes count, SAR validation count.
Use dummy data for 4 records. Use Lucide icons (Shield, Hash, CheckCircle, Clock).
\"\"\")

def generate_public_voyage() -> str:
    return call_blink(f\"\"\"
{DESIGN_TOKENS}
Generate a complete TypeScript React page: PublicVoyagePage (export function PublicVoyagePage)
This is a B2C public page for transparency. No sidebar, just a clean centered layout.
Include a PageHeader (title="Public Voyage Record", subtitle="Anti-greenwashing Transparency Page").
1. A large "VERIFIED" badge at the top.
2. Vessel details: MV MERIDIAN PIONEER, Santos → Rotterdam.
3. Emissions: 2,523 tCO2. Methodology: ISO 14083:2023.
4. Cryptographic Proof: Show the SHA-256 hash prominently.
5. A section explaining that this data was collected via Satellite AIS and Copernicus SAR, and verified independently.
Use beautiful borders, glow effects (Tailwind shadows), and Lucide icons.
\"\"\")

def generate_shipper_portal() -> str:
    return call_blink(f\"\"\"
{DESIGN_TOKENS}
Generate a complete TypeScript React page: ShipperPortal (export function ShipperPortal)
This is for Cargo Owners (Embarcadores) to track Scope 3 emissions per shipment.
Include a PageHeader (title="Cargo Intelligence", subtitle="SHIPPER PORTAL - SCOPE 3").
1. Top KPI Row: Total Shipments, Total Cargo (tons), Scope 3 CO2 (tons), Avg Intensity (gCO2/ton).
2. A list of active bookings/shipments. Columns: Booking Ref, Vessel, Route, Cargo (tons), CO2 Allocation, Status (In Transit / Delivered), Certificate (Button to download PDF).
3. A "Decarbonization Impact" panel showing how using Green Corridors reduced their Scope 3 by X%.
\"\"\")

def generate_port_dashboard() -> str:
    return call_blink(f\"\"\"
{DESIGN_TOKENS}
Generate a complete TypeScript React page: PortDashboard (export function PortDashboard)
This is for Port Authorities to monitor inbound/outbound vessel emissions.
Include a PageHeader (title="Port Intelligence", subtitle="PORT OF SANTOS (BRSSZ)").
1. Top KPI Row: Vessels in Port, Inbound (24h), Outbound (24h), Geofence Emissions (tCO2).
2. A "Vessel Traffic Emissions" table. Columns: MMSI/Name, Type, ETA/Status, Fuel Type, EEOI Rating (A-E), Port CO2 Risk (Low/Med/High).
3. Use strict dark mode. Highlight High Risk vessels in amber/red.
\"\"\")
'''

c = c.replace('def generate_overview() -> str:', func_code + '\ndef generate_overview() -> str:')

comp_entries = '''    "EvidenceVault": { "path": "apps/web/src/pages/EvidenceVault.tsx", "fn": generate_evidence_vault },
    "PublicVoyagePage": { "path": "apps/web/src/pages/PublicVoyagePage.tsx", "fn": generate_public_voyage },
    "ShipperPortal": { "path": "apps/web/src/pages/ShipperPortal.tsx", "fn": generate_shipper_portal },
    "PortDashboard": { "path": "apps/web/src/pages/PortDashboard.tsx", "fn": generate_port_dashboard },'''

c = c.replace('COMPONENTS = {\n', 'COMPONENTS = {\n' + comp_entries + '\n')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

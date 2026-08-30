import json
import os
import re

path = 'scripts/generate_ui.py'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Fix the COMPONENTS dictionary
c = c.replace('''    "EuEtsCalculator": {
        "file": "apps/web/src/pages/EuEtsCalculator.tsx",
        "prompt": \"\"\"
You are building the "EU ETS Calculator" page (export function EuEtsCalculator).
It is a financial and operational calculator for EU ETS exposure. 
Include a PageHeader (title="EU ETS Calculator", subtitle="Financial exposure & compliance estimation").
Include a complex form on the left for Voyage input:
- Distance (NM)
- Cargo (tons)
- Fuel Consumption (tons)
- Fuel Type dropdown (HFO, VLSFO, LNG, METHANOL)
- EU Scope percentage (0-100)
On the right side, show real-time calculated EU ETS financial exposure in Euros (€), based on EUA price of €65/tCO2, factoring in the Phase-in schedule (2024: 40%, 2025: 70%, 2026: 100%).
Use a very dark, premium, terminal-like aesthetic. Use Lucide-react icons (AlertTriangle, TrendingUp, Info), big numbers for financial impact, and clear warnings for non-compliance.
Make it look like a high-end Bloomberg terminal for maritime emissions. 
Create dummy state in the component to make the form inputs work and recalculate the results dynamically (useState).
\"\"\"
    },
''', '')

func_code = '''
def generate_eu_ets() -> str:
    return call_blink(f\"\"\"
{DESIGN_TOKENS}

Generate a complete TypeScript React page: EuEtsCalculator (export function EuEtsCalculator)

It is a financial and operational calculator for EU ETS exposure. 
Include a PageHeader (title="EU ETS Calculator", subtitle="Financial exposure & compliance estimation").
Include a complex form on the left for Voyage input:
- Distance (NM)
- Cargo (tons)
- Fuel Consumption (tons)
- Fuel Type dropdown (HFO, VLSFO, LNG, METHANOL)
- EU Scope percentage (0-100)

On the right side, show real-time calculated EU ETS financial exposure in Euros (€), based on EUA price of €65/tCO2, factoring in the Phase-in schedule (2024: 40%, 2025: 70%, 2026: 100%).

Rules:
- Calculate CO2 based on Fuel Type (HFO: 3.114, VLSFO: 3.151, LNG: 2.750, METHANOL: 1.375)
- Formula: Fuel Consumption * Fuel Factor * (EU Scope / 100) * Phase In * €65
- Use a very dark, premium, terminal-like aesthetic (bg-bg-base and bg-bg-panel). 
- Use Lucide-react icons (AlertTriangle, TrendingUp, Info).
- Big numbers for financial impact, and clear warnings for non-compliance.
- Make it look like a high-end Bloomberg terminal for maritime emissions. 
- Create dummy state in the component to make the form inputs work and recalculate the results dynamically using React.useState.
- Do NOT use recharts or any external graphing library. Just standard HTML/Tailwind.
\"\"\")
'''

c = c.replace('def generate_overview() -> str:', func_code + '\ndef generate_overview() -> str:')

comp_entry = '''    "EuEtsCalculator": {
        "path": "apps/web/src/pages/EuEtsCalculator.tsx",
        "fn": generate_eu_ets
    },'''

c = c.replace('COMPONENTS = {\n', 'COMPONENTS = {\n' + comp_entry + '\n')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

import json
import os

path = 'scripts/generate_ui.py'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Add EuEtsCalculator to the dictionary
component_code = '''    "EuEtsCalculator": {
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
'''

# Find where to insert it in COMPONENTS
insert_index = c.find('COMPONENTS = {') + len('COMPONENTS = {\n')
c = c[:insert_index] + component_code + c[insert_index:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

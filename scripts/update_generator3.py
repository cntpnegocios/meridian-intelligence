import json
import os
import re

path = 'scripts/generate_ui.py'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

func_code = '''
def generate_fueleu_score() -> str:
    return call_blink(f\"\"\"
{DESIGN_TOKENS}

Generate a complete TypeScript React page: FuelEuScore (export function FuelEuScore)

It is a financial and operational calculator for FuelEU Maritime compliance. 
Include a PageHeader (title="FuelEU Compliance Score", subtitle="GHG Intensity & Penalty Calculator").
The page must have:
1. Top row with 3 KPIs: Target GHG Intensity (89.3 gCO2eq/MJ), Actual Intensity (92.1 gCO2eq/MJ), Compliance Deficit (2.8 gCO2eq/MJ).
2. A large visual Gauge or Progress Bar (using HTML/Tailwind) showing the current intensity vs the target. It should be colored amber or red to indicate a deficit.
3. A panel calculating the penalty: Penalty is based on €2,400 per tonne of VLSFO equivalent deficit. Show a dummy penalty of €145,200.
4. A panel showing alternative fuels impact: "If you blend 15% Bio-Methanol, your score improves to 88.5 gCO2eq/MJ (Compliant, 0 Penalty)."
5. Use a very dark, premium, terminal-like aesthetic (bg-bg-base and bg-bg-panel).
6. Use Lucide-react icons (Zap, AlertCircle, CheckCircle).
7. Make it look like a high-end Bloomberg terminal for maritime emissions.
\"\"\")
'''

c = c.replace('def generate_overview() -> str:', func_code + '\ndef generate_overview() -> str:')

comp_entry = '''    "FuelEuScore": {
        "path": "apps/web/src/pages/FuelEuScore.tsx",
        "fn": generate_fueleu_score
    },'''

c = c.replace('COMPONENTS = {\n', 'COMPONENTS = {\n' + comp_entry + '\n')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

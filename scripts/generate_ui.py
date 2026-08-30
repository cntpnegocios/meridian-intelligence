"""
Blink AI Layout Generator
==========================
Uses Blink AI Gateway (claude-sonnet-4.5) to generate production-quality
React + Tailwind UI components for Meridian Intelligence.

The generated code is written directly to the project — Blink is used
as an AI engine, NOT as a hosting platform.

Usage:
  python scripts/generate_ui.py [component]
"""

import httpx
import sys
import re
import os
from pathlib import Path

BLINK_KEY = "blnk_ak_j5fb8NA6wMCOyB24p1eWOLfQ56lcudoRo2hCeSY8I0S2zImU"
BASE_URL = "https://core.blink.new/api/v1"
MODEL = "anthropic/claude-sonnet-4.5"  # Best quality for layout generation

DESIGN_TOKENS = """
Design System (Tailwind v4 CSS tokens — already defined in styles.css):
  bg-bg-base:      #07131f  (main background)
  bg-bg-panel:     #091923  (card / panel)
  bg-bg-sidebar:   #08111a  (sidebar)
  border-border-subtle:  #1b2b39
  border-border-default: #1d3341
  text-text-base:  #eaf1f6
  text-text-muted: #8da2b1
  text-brand-primary: #59bdb8  (cyan)
  accent-demo:     #d7b76c  (amber — demo data badge)

Components available (import from relative path):
  ../components/ui/MetricCard  — props: title, value, subtitle, status, icon, trend
  ../components/ui/Badge       — variants: live, demo, stale, error, unavailable
  ../components/ui/PageHeader  — props: title, subtitle, status

Icons: lucide-react (use named imports)
Router: react-router-dom Link
Charts: use pure CSS/SVG (NO recharts, NO d3 — keep zero deps)

Rules:
  - TypeScript, no 'any'
  - No unused imports
  - Named exports: export function ComponentName()
  - No default exports on page components
  - Status badges: always mark demo data as status="demo"
  - No emojis in enterprise UI
  - No placeholder text like "Coming soon" or dashes "—"
  - Every table has real demo data (min 3 rows)
  - Every metric has a value, not empty
"""


def call_blink(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {BLINK_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an expert React + TypeScript + Tailwind UI engineer. "
                    "You produce production-quality, institutional, enterprise-grade interfaces. "
                    "No placeholder content. No generic templates. "
                    "Output ONLY the complete TypeScript file content — no markdown, no explanation, no backticks. "
                    "Start directly with the import statements."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 4096,
        "temperature": 0.2,
    }
    r = httpx.post(f"{BASE_URL}/ai/chat/completions", json=payload, headers=headers, timeout=60)
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]


def extract_tsx(raw: str) -> str:
    """Remove any accidental markdown fences or language labels if model adds them."""
    raw = re.sub(r"```tsx?\n?", "", raw)
    raw = re.sub(r"```\n?", "", raw)
    # Remove bare language identifiers that claude sometimes adds as first line
    lines = raw.strip().splitlines()
    if lines and lines[0].strip().lower() in ("typescript", "tsx", "jsx", "javascript"):
        lines = lines[1:]
    return "\n".join(lines).strip()


def generate_regulatory_radar() -> str:
    return call_blink(f"""
{DESIGN_TOKENS}

Generate a complete TypeScript React page: RegulatoryRadar

This is the Regulatory Radar page for Meridian Intelligence — a maritime decarbonization platform.
It monitors the regulatory landscape for EU maritime shipping.

The page must show:

1. PAGE HEADER
   - Title: "Regulatory Radar"
   - Subtitle: "MARITIME REGULATORY INTELLIGENCE"
   - status="demo"

2. ACTIVE REGULATIONS TABLE (6 rows)
   Columns: Regulation | Scope | Applies From | Phase-in 2026 | Status | Impact
   Data:
   - EU MRV — Reg. (EU) 2015/757 | Ships >5000 GT EU voyages | 2015 | 100% | ACTIVE | HIGH
   - EU ETS Maritime — Reg. (EU) 2023/957 | Ships >5000 GT | Jan 2024 | 70% (2025), 100% (2026) | ACTIVE | CRITICAL
   - FuelEU Maritime — Reg. (EU) 2023/1805 | Ships >5000 GT EU ports | Jan 2025 | -2% GHG vs baseline | ACTIVE | HIGH
   - IMO CII Rating — MARPOL Annex VI | All ships >5000 GT | Jan 2023 | Annual rating A-E | ACTIVE | HIGH
   - Carbon Border Adjustment | Freight indirect exposure | 2026 | Monitoring phase | MONITORING | MEDIUM
   - IMO GHG Strategy 2050 | Global fleet | 2023-2050 | Net-zero by 2050 pathway | ACTIVE | STRATEGIC

3. UPCOMING DEADLINES section (card grid, 4 cards)
   - EU ETS 100% phase-in: Jan 1 2026 — 0 days (TODAY) — CRITICAL
   - FuelEU Annual Report: Mar 31 2027 — 214 days — HIGH
   - CII Rating Submission: Jan 31 2027 — 155 days — HIGH
   - IMO Stocktake Review: Sep 2028 — 759 days — MEDIUM

4. KEY METRICS ROW (4 MetricCards)
   - Regulations Monitored: 6 (status live)
   - Critical Deadlines: 2 (status error)
   - Pending Compliance: FuelEU 2025 (status stale)
   - Next Review: 155 days (status demo)

5. SMALL INFO BANNER at bottom
   "Regulatory data sourced from EUR-Lex, IMO MEPC and European Maritime Safety Agency (EMSA). 
    This page does not constitute legal advice."

Use the design tokens above. Dark theme. Institutional quality.
Deadline cards should have colored left border by severity.
Table rows with CRITICAL status get a subtle red left accent.
""")



def generate_eu_ets() -> str:
    return call_blink(f"""
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
""")


def generate_fueleu_score() -> str:
    return call_blink(f"""
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
""")

def generate_overview() -> str:
    return call_blink(f"""
{DESIGN_TOKENS}

Generate a complete TypeScript React page: Overview

This is the main dashboard for a maritime intelligence platform (Meridian Intelligence).
It shows the fleet performance overview for an operator persona.

The page must contain:

1. PAGE HEADER — title "Fleet Intelligence", subtitle "OPERATOR CONTROL TOWER", status="demo"

2. TOP KPI ROW (4 MetricCards in a grid):
   - Fleet Emissions YTD: 9,175 tCO2e | status=demo | trend: -12% vs last year, direction=down | icon: Leaf
   - EU ETS Exposure: €149,580 | status=demo | trend: +8% fuel cost, direction=up | icon: Scale  
   - FuelEU Score: 62/100 | status=demo | subtitle: "2025 target: 89.3 gCO2eq/MJ" | icon: Zap
   - Active Voyages: 3 | status=demo | subtitle: "2 inbound EU, 1 outbound"

3. FLEET TABLE (3 vessels)
   Columns: Vessel | IMO | Route | Flag | Type | Status | EEOI | Fuel | CO2 (voyage) | ETS Cost | Actions
   Data:
   - MV MERIDIAN PIONEER | 9876543 | Santos → Rotterdam | 🇧🇷 Brazil | Bulk Carrier | IN TRANSIT | 8.5 gCO2/t·nm | HFO | 2,523 tCO2 | €41,130 | [View]
   - MSC AURORA | 9234567 | Hamburg → Antwerp | 🇵🇦 Panama | Container | IN PORT | 12.1 gCO2/t·nm | VLSFO | 4,120 tCO2 | €67,160 | [View]
   - CORREDORA DO SUL | 9345678 | Paranaguá → Rotterdam | 🇧🇷 Brazil | Tanker | DEPARTING | 7.2 gCO2/t·nm | LNG | 1,890 tCO2 | €30,820 | [View]

   Status dots: IN TRANSIT = cyan pulse, IN PORT = emerald, DEPARTING = amber

4. MONTHLY EMISSIONS CHART (pure CSS/SVG bar chart — no recharts)
   Label it "Monthly CO₂ Emissions — 2026 YTD"
   6 bars: Mar 2,100 | Apr 3,200 | May 2,800 | Jun 4,100 | Jul 3,400 | Aug 2,523
   Show the bars as percentage-height divs within a flex container
   Show the numbers above each bar
   Brand color bars (bg-brand-primary / #59bdb8) with hover opacity effect

5. EU ETS EXPOSURE WIDGET (right column, next to chart)
   - Title: "EU ETS — 2026 Exposure"
   - Big number: €149,580 total
   - Progress bar: 70% of estimated annual budget (amber/red)
   - Breakdown: 3 vessels listed with their individual ETS cost
   - Current EUA price: €65/tCO2
   - Small note: "Phase-in: 100% (2026) · EU+non-EU voyages: 50% scope"

6. DECARBONIZATION GAP (full-width row at bottom)
   Show the gap between current fleet intensity vs IMO 2030 target
   Current EEOI average: 9.3 gCO2/t·nm
   2030 target: -40% vs 2008 baseline (est. 6.1 gCO2/t·nm)
   Gap: -3.2 gCO2/t·nm (-34%)
   Show as a horizontal progress bar with current vs target markers

Use semantic HTML. No placeholder content. Data must look real and authoritative.
Link each vessel [View] to /voyage-intelligence using react-router-dom Link.
""")


COMPONENTS = {
    "FuelEuScore": {
        "path": "apps/web/src/pages/FuelEuScore.tsx",
        "fn": generate_fueleu_score
    },
    "EuEtsCalculator": {
        "path": "apps/web/src/pages/EuEtsCalculator.tsx",
        "fn": generate_eu_ets
    },
    "regulatory-radar": {
        "fn": generate_regulatory_radar,
        "path": "apps/web/src/pages/RegulatoryRadar.tsx",
        "export": "RegulatoryRadar",
    },
    "overview": {
        "fn": generate_overview,
        "path": "apps/web/src/pages/Overview.tsx",
        "export": "Overview",
    },
}


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "all"
    root = Path(__file__).parent.parent

    items = COMPONENTS.items() if target == "all" else [(target, COMPONENTS[target])]

    for name, cfg in items:
        print(f"\n[Blink AI] Generating {name} via {MODEL}...")
        try:
            raw = cfg["fn"]()
            code = extract_tsx(raw)
            out = root / cfg["path"]
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(code, encoding="utf-8")
            print(f"[OK] Written: {out}")
        except Exception as e:
            print(f"[ERROR] {name}: {e}")


if __name__ == "__main__":
    main()

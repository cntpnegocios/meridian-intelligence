import re

def fix_ets():
    path = 'apps/web/src/pages/EuEtsCalculator.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Fix unused imports
    c = c.replace("import { Link } from 'react-router-dom';", "")
    c = c.replace("import { AlertTriangle, TrendingUp, Info, Ship, Fuel, DollarSign, Calendar, Calculator, Anchor } from 'lucide-react';", 
                  "import { AlertTriangle, Info, Ship, Fuel, DollarSign, Calendar, Calculator, Anchor } from 'lucide-react';")

    # Fix icon props (MetricCard expects ReactNode, so we need <Icon size={16} /> instead of Icon)
    # The error lines were:
    # 260: icon: Ship,
    # 267: icon: Fuel,
    # 274: icon: Anchor,
    # 283: icon: Calculator,
    
    c = re.sub(r"icon:\s*Ship,", "icon: <Ship size={16} />,", c)
    c = re.sub(r"icon:\s*Fuel,", "icon: <Fuel size={16} />,", c)
    c = re.sub(r"icon:\s*Anchor,", "icon: <Anchor size={16} />,", c)
    c = re.sub(r"icon:\s*Calculator,", "icon: <Calculator size={16} />,", c)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

def fix_fuel():
    path = 'apps/web/src/pages/FuelEuScore.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Fix unused imports
    c = c.replace("import { Link } from 'react-router-dom';", "")
    c = c.replace("import { AlertTriangle, Zap, Info, Ship, Fuel, DollarSign, ShieldAlert, Target } from 'lucide-react';", 
                  "import { Zap, Info, Ship, DollarSign, Target } from 'lucide-react';")

    c = c.replace("const deficit = actualIntensity - targetIntensity;", "")
    c = c.replace("const penaltyAmount = 145200;", "")

    # Fix Type 'number' is not assignable to type 'string' (probably a value prop in MetricCard)
    # The error is at line 40: value={actualIntensity} -> should be value={String(actualIntensity)} or similar, but MetricCard accepts string | number usually.
    # Wait, MetricCard expects value: string | number. If it's string, we can wrap it. Let's cast to string.
    c = c.replace("value={targetIntensity}", "value={targetIntensity.toString()}")
    c = c.replace("value={actualIntensity}", "value={actualIntensity.toString()}")
    c = c.replace("value={2.8}", "value='2.8'")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

fix_ets()
fix_fuel()

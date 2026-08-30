import re

def fix():
    path = 'apps/web/src/pages/EuEtsCalculator.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    c = c.replace('icon={Fuel}', 'icon={<Fuel size={16} />}')
    c = c.replace('icon={Ship}', 'icon={<Ship size={16} />}')
    c = c.replace('icon={Calculator}', 'icon={<Calculator size={16} />}')
    c = c.replace('icon={Anchor}', 'icon={<Anchor size={16} />}')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

def fix_fuel():
    path = 'apps/web/src/pages/FuelEuScore.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    c = c.replace("import { Zap, Info, Ship, Fuel, DollarSign, Target } from 'lucide-react';", "import { Zap, Info, Ship, DollarSign, Target } from 'lucide-react';")
    c = c.replace("const deficit = actualIntensity - targetIntensity;", "")
    c = c.replace("value={actualIntensity}", "value={String(actualIntensity)}")
    c = c.replace("value={targetIntensity}", "value={String(targetIntensity)}")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

fix()
fix_fuel()

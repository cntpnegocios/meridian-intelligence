import re

def fix_main():
    path = 'apps/web/src/main.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    c = re.sub(r'element=\{<EuEts />\}', 'element={<EuEtsCalculator />}', c)
    c = re.sub(r'element=\{<FuelEuPage />\}', 'element={<FuelEuScore />}', c)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

def fix_ets():
    path = 'apps/web/src/pages/EuEtsCalculator.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # The error lines were:
    # 260,24: Type 'ForwardRefExoticComponent...' is not assignable to type 'ReactNode'
    # icon: Ship
    c = re.sub(r'icon:\s*Ship(,|)$', 'icon: <Ship size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Fuel(,|)$', 'icon: <Fuel size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Anchor(,|)$', 'icon: <Anchor size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Calculator(,|)$', 'icon: <Calculator size={16} />\\1', c, flags=re.MULTILINE)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

def fix_fuel():
    path = 'apps/web/src/pages/FuelEuScore.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    c = c.replace("const deficit = actualIntensity - targetIntensity;", "")
    
    # 40: Type 'number' is not assignable to type 'string'.
    c = re.sub(r'value=\{actualIntensity\}', 'value={String(actualIntensity)}', c)
    c = re.sub(r'value=\{targetIntensity\}', 'value={String(targetIntensity)}', c)
    
    # Remove unused Fuel import
    c = c.replace("import { Zap, Info, Ship, Fuel, DollarSign, Target } from 'lucide-react';", "import { Zap, Info, Ship, DollarSign, Target } from 'lucide-react';")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

fix_main()
fix_ets()
fix_fuel()

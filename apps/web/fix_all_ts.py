import os
import re

files_to_fix = [
    'EvidenceVault.tsx',
    'PublicVoyagePage.tsx',
    'ShipperPortal.tsx',
    'PortDashboard.tsx'
]

for file in files_to_fix:
    path = f'apps/web/src/pages/{file}'
    if not os.path.exists(path):
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Remove unused Link
    c = c.replace("import { Link } from 'react-router-dom';", "")
    
    # Check for icon={...} in MetricCard
    c = re.sub(r'icon:\s*Shield(,|)$', 'icon: <Shield size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Hash(,|)$', 'icon: <Hash size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*CheckCircle(,|)$', 'icon: <CheckCircle size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Clock(,|)$', 'icon: <Clock size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Anchor(,|)$', 'icon: <Anchor size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Ship(,|)$', 'icon: <Ship size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*AlertTriangle(,|)$', 'icon: <AlertTriangle size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Wind(,|)$', 'icon: <Wind size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*TrendingDown(,|)$', 'icon: <TrendingDown size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Activity(,|)$', 'icon: <Activity size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Package(,|)$', 'icon: <Package size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*Globe(,|)$', 'icon: <Globe size={16} />\\1', c, flags=re.MULTILINE)
    c = re.sub(r'icon:\s*TrendingUp(,|)$', 'icon: <TrendingUp size={16} />\\1', c, flags=re.MULTILINE)

    # Some Blink generations put <Icon> in the icon prop, e.g. icon={<Shield />} which is good.
    # We only replaced when it was icon: Shield, inside an object array.

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)


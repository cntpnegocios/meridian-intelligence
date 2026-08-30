import re

def fix_evidence():
    path = 'apps/web/src/pages/EvidenceVault.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('trend={{ value: 12.5, direction: ''up'' }}', 'trend={{ value: \"12.5\", direction: \"up\" }}')
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def fix_port():
    path = 'apps/web/src/pages/PortDashboard.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = re.sub(r'value={(\d+)}', r'value=\"\g<1>\"', c)
    c = c.replace('(vessel, index) => (', 'vessel => (')
    c = c.replace('<Link ', '<a ')
    c = c.replace('</Link>', '</a>')
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def fix_public():
    path = 'apps/web/src/pages/PublicVoyagePage.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('status=\"demo\"', 'variant=\"demo\"')
    c = c.replace('status=\"verified\"', 'variant=\"live\"')
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def fix_shipper():
    path = 'apps/web/src/pages/ShipperPortal.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('icon: JSX.Element;', 'icon: React.ReactNode;')
    c = c.replace('icon={Package}', 'icon={<Package size={16}/>}')
    c = c.replace('icon={Ship}', 'icon={<Ship size={16}/>}')
    c = c.replace('icon={Globe}', 'icon={<Globe size={16}/>}')
    c = c.replace('icon={TrendingDown}', 'icon={<TrendingDown size={16}/>}')
    c = re.sub(r'value={([0-9.]+)}', r'value=\"\g<1>\"', c)
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

fix_evidence()
fix_port()
fix_public()
fix_shipper()

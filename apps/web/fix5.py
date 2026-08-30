import re

def f_port():
    path = 'apps/web/src/pages/PortDashboard.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = re.sub(r'trend={{ value: (-?\d+(?:\.\d+)?), direction:', r'trend={{ value: \"\1\", direction:', c)
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def f_pub():
    path = 'apps/web/src/pages/PublicVoyagePage.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('<Badge variant=\"live\" />', '<Badge variant=\"live\">VERIFIED</Badge>')
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def f_ship():
    path = 'apps/web/src/pages/ShipperPortal.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = re.sub(r'trend={{ value: (-?\d+(?:\.\d+)?), direction:', r'trend={{ value: \"\1\", direction:', c)
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

f_port()
f_pub()
f_ship()

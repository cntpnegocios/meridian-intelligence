import re

def f_port():
    path = 'apps/web/src/pages/PortDashboard.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('\\"', "'")
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def f_ship():
    path = 'apps/web/src/pages/ShipperPortal.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('\\"', "'")
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

f_port()
f_ship()

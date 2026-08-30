import re

def f_port():
    path = 'apps/web/src/pages/PortDashboard.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('value={3}', 'value=\"3\"')
    c = c.replace('value={12}', 'value=\"12\"')
    c = c.replace('value={4}', 'value=\"4\"')
    c = c.replace('value={14500}', 'value=\"14500\"')
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def f_pub():
    path = 'apps/web/src/pages/PublicVoyagePage.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('status=\"demo\"', 'variant=\"demo\"')
    c = c.replace('status=\"verified\"', 'variant=\"live\"')
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

def f_ship():
    path = 'apps/web/src/pages/ShipperPortal.tsx'
    with open(path, 'r', encoding='utf-8') as f: c = f.read()
    c = c.replace('icon: JSX.Element;', 'icon: React.ReactNode;')
    c = c.replace('icon={Activity}', 'icon={<Activity size={16}/>}')
    c = c.replace('value={12}', 'value=\"12\"')
    c = c.replace('value={450000}', 'value=\"450000\"')
    c = c.replace('value={18500}', 'value=\"18500\"')
    c = c.replace('value={41.1}', 'value=\"41.1\"')
    with open(path, 'w', encoding='utf-8') as f: f.write(c)

f_port()
f_pub()
f_ship()

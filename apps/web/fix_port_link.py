import re
path = 'apps/web/src/pages/PortDashboard.tsx'
with open(path, 'r', encoding='utf-8') as f: c = f.read()
c = c.replace('<Link', '<a')
c = c.replace('to=', 'href=')
with open(path, 'w', encoding='utf-8') as f: f.write(c)

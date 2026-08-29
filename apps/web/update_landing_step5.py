import re

def fix():
    path = 'apps/web/src/pages/LandingPage.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    start = c.find('const PORTALS = [')
    end = c.find('];', start) + 2
    
    if start != -1 and end != -1:
        new_portals = '''const getPortals = (t: any) => [
  {
    icon: <Ship size={20} />,
    role: t('portals.p1_role'),
    title: t('portals.p1_title'),
    desc: t('portals.p1_desc'),
    accent: '#59bdb8',
    path: '/?role=OPERATOR',
  },
  {
    icon: <Building2 size={20} />,
    role: t('portals.p2_role'),
    title: t('portals.p2_title'),
    desc: t('portals.p2_desc'),
    accent: '#34d399',
    path: '/?role=SHIPPER',
  },
  {
    icon: <Anchor size={20} />,
    role: t('portals.p3_role'),
    title: t('portals.p3_title'),
    desc: t('portals.p3_desc'),
    accent: '#60a5fa',
    path: '/?role=PORT',
  },
  {
    icon: <Radar size={20} />,
    role: t('portals.p4_role'),
    title: t('portals.p4_title'),
    desc: t('portals.p4_desc'),
    accent: '#a78bfa',
    path: '/?role=REGULATOR',
  },
  {
    icon: <Eye size={20} />,
    role: t('portals.p5_role'),
    title: t('portals.p5_title'),
    desc: t('portals.p5_desc'),
    accent: '#fbbf24',
    path: '/public/voyage/demo-001',
  },
];'''
        c = c[:start] + new_portals + c[end:]

    c = c.replace('PORTALS.map', 'getPortals(t).map')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

fix()

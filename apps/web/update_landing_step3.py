def replace_all2():
    path = 'apps/web/src/pages/LandingPage.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Portals
    portals_list = '''const PORTALS = [
  {
    icon: <Ship size={20} />,
    role: 'Operador / Armador',
    title: 'Control Tower',
    desc: 'Frota, emissões EU ETS, FuelEU compliance, Green Corridors e Evidence Vault em uma interface unificada.',
    accent: '#59bdb8',
    path: '/?role=OPERATOR',
  },
  {
    icon: <Building2 size={20} />,
    role: 'Embarcador / Shipper',
    title: 'Cargo Intelligence',
    desc: 'CO₂ por carregamento, atribuição Scope 3 Cat. 4, Certificado Verde ISO 14083 e rastreabilidade de booking.',
    accent: '#34d399',
    path: '/?role=SHIPPER',
  },
  {
    icon: <Anchor size={20} />,
    role: 'Porto / Autoridade',
    title: 'Port Intelligence',
    desc: 'Monitor de tráfego em tempo real, geofence ativo, ranking de navios por EEOI e emissões declaradas.',
    accent: '#60a5fa',
    path: '/?role=PORT',
  },
  {
    icon: <Radar size={20} />,
    role: 'Regulador / EMSA',
    title: 'Audit Trail',
    desc: 'Evidence Vault somente-leitura com registros SHA-256, trilha de auditoria e exportação EU MRV.',
    accent: '#a78bfa',
    path: '/?role=REGULATOR',
  },
  {
    icon: <Eye size={20} />,
    role: 'Público / Auditores ESG',
    title: 'Transparency Portal',
    desc: 'Página de viagem verificada, pública, sem login. Anti-greenwashing. QR code para supply chains.',
    accent: '#fbbf24',
    path: '/public/voyage/demo-001',
  },
];'''

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

    c = c.replace(portals_list, new_portals)
    c = c.replace('PORTALS.map', 'getPortals(t).map')

    c = c.replace('SectionLabel text="5 Portais Dedicados" />', 'SectionLabel text={t("portals.label")} />')
    c = c.replace('Um sistema, cinco perspectivas de negócio', '{t("portals.title")}')
    c = c.replace('Cada stakeholder vê exatamente o que precisa.\n          A mesma evidência rastreável, apresentada no contexto correto.', '{t("portals.lead")}')
    c = c.replace('Acessar <ArrowRight size={11} />', "{t('portals.access')} <ArrowRight size={11} />")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

replace_all2()

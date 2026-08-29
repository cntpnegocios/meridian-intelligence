def replace_all3():
    path = 'apps/web/src/pages/LandingPage.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Sources
    sources_list = '''const SOURCES = [
  { name: 'Spire Maritime', type: 'Satellite AIS', desc: 'Posição, velocidade, identidade — cobertura global', color: T.brand },
  { name: 'Copernicus Sentinel-1', type: 'SAR Radar', desc: 'Validação independente de posição via radar orbital', color: '#60a5fa' },
  { name: 'Copernicus Marine', type: 'Oceanografia', desc: 'Correntes, ondas, temperatura — contexto de performance', color: '#34d399' },
  { name: 'IMO DCS / EU MRV', type: 'Declarações Oficiais', desc: 'Consumo de combustível reportado — base regulatória', color: '#a78bfa' },
  { name: 'Blink AI Gateway', type: 'IA — 200+ Modelos', desc: 'Interpretação, sumarização e análise — server-side only', color: T.demo },
];'''
    new_sources = '''const getSources = (t: any) => [
  { name: 'Spire Maritime', type: t('data.s1_type'), desc: t('data.s1_desc'), color: T.brand },
  { name: 'Copernicus Sentinel-1', type: t('data.s2_type'), desc: t('data.s2_desc'), color: '#60a5fa' },
  { name: 'Copernicus Marine', type: t('data.s3_type'), desc: t('data.s3_desc'), color: '#34d399' },
  { name: 'IMO DCS / EU MRV', type: t('data.s4_type'), desc: t('data.s4_desc'), color: '#a78bfa' },
  { name: 'Blink AI Gateway', type: t('data.s5_type'), desc: t('data.s5_desc'), color: T.demo },
];'''

    c = c.replace(sources_list, new_sources)
    c = c.replace('SOURCES.map', 'getSources(t).map')

    c = c.replace('SectionLabel text="Fontes de Dados" />', 'SectionLabel text={t("data.label")} />')
    c = c.replace('Hierarquia de evidência, não inferência', '{t("data.title")}')
    c = c.replace('API oficial primeiro. Dados observados antes de declarados.\n              Modelo de IA como intérprete, nunca como fonte.', '{t("data.lead")}')
    c = c.replace('A arquitetura distingue explicitamente: LIVE · DEMO · STALE · UNAVAILABLE.\n              Nenhuma inferência de LLM substitui dado verificado.', '{t("data.disclaimer")}')

    # AI
    c = c.replace('BLINK AI GATEWAY · 200+ MODELOS', "{t('ai.badge')}")
    c = c.replace('IA que interpreta evidência. ', "{t('ai.title1')}")
    c = c.replace('Nunca inventa.', "{t('ai.titleHighlight')}")
    c = c.replace('O Blink AI Gateway conecta o backend a mais de 200 modelos de linguagem.\n                Todas as chamadas são server-side. A chave de API nunca chega ao navegador.\n                Outputs são sempre marcados como', "{t('ai.lead')}")

    ai_features = '''[
                { label: 'Interpretação Regulatória', desc: 'EU MRV / FuelEU / EU ETS em linguagem operacional' },
                { label: 'Análise de Anomalia AIS', desc: 'Explicação de desvio de posição ou emissão' },
                { label: 'Resumo de Corredor Verde', desc: 'Performance de rota Santos → Rotterdam' },
                { label: 'Classificação de Evidência', desc: 'FATO · INFERÊNCIA · CÁLCULO · ESTIMATIVA' },
              ]'''
    new_ai = '''[
                { label: t('ai.f1_title'), desc: t('ai.f1_desc') },
                { label: t('ai.f2_title'), desc: t('ai.f2_desc') },
                { label: t('ai.f3_title'), desc: t('ai.f3_desc') },
                { label: t('ai.f4_title'), desc: t('ai.f4_desc') },
              ]'''
    c = c.replace(ai_features, new_ai)

    # Evidence
    c = c.replace('SectionLabel text="Evidence Vault" />', 'SectionLabel text={t("evidence.label")} />')
    c = c.replace('Cada declaração tem uma prova.', '{t("evidence.title")}')
    c = c.replace('SHA-256 imutável. Parser version registrado. AIS observations contadas.\n            SAR validations documentadas. Nenhum campo em branco.', '{t("evidence.lead")}')

    # Compliance
    c = c.replace('SectionLabel text="Conformidade" />', 'SectionLabel text={t("compliance.label")} />')
    c = c.replace('Construído sobre frameworks regulatórios reais', '{t("compliance.title")}')
    c = c.replace('Nenhuma referência regulatória inventada. Todas as normas são rastreáveis\n              ao texto oficial publicado pela Comissão Europeia, IMO e ISO.', '{t("compliance.lead")}')
    c = c.replace('O Meridian Intelligence é isolado do MeridianMRV Core. Dados são promovidos\n                via fluxo de revisão humana. O sistema nunca grava diretamente no core.', '{t("compliance.disclaimer")}')

    # CTA
    c = c.replace('DEMO DISPONÍVEL — SANTOS → ROTTERDAM', "{t('cta.badge')}")
    c = c.replace('Prove o que você declara.', '{t("cta.title")}')
    c = c.replace('Acesse os cinco portais, explore o Evidence Vault e veja a cadeia completa de inteligência marítima funcionando.', '{t("cta.lead")}')
    c = c.replace('Entrar na Plataforma <ArrowRight size={16} />', "{t('cta.btnAccess')} <ArrowRight size={16} />")
    c = c.replace('Ver Evidência Pública', "{t('cta.btnVerify')}")

    # Footer
    c = c.replace('Green Corridor Intelligence Programme', '{t("footer.sub")}')
    c = c.replace('Powered by Spire S-AIS · Copernicus · Blink AI Gateway', '{t("footer.power")}')
    c = c.replace('Isolado do MeridianMRV Core', '{t("footer.isolated")}')
    c = c.replace('Dados DEMO — não autoridade regulatória', '{t("footer.demo")}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

replace_all3()

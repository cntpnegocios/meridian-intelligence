import re

def replace_all():
    path = 'apps/web/src/pages/LandingPage.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Hero
    c = c.replace('GREEN CORRIDOR INTELLIGENCE · SANTOS → ROTTERDAM', "{t('hero.badge')}")
    c = c.replace('Inteligência marítima que', "{t('hero.title1')}")
    c = c.replace('prova', "{t('hero.titleProve')}")
    c = c.replace(', não apenas', "{t('hero.title2')}")
    c = c.replace('declara', "{t('hero.titleDeclare')}")
    c = c.replace('>.<', ">{t('hero.title3')}<")
    c = c.replace('Plataforma de MRV marítimo com rastreamento AIS satélite, validação SAR independente,\n            cálculo EU ETS/FuelEU e cadeia de custódia imutável por SHA-256.', "{t('hero.subtitle')}")
    c = c.replace('Acessar Plataforma <ArrowRight size={16} />', "{t('hero.btnAccess')} <ArrowRight size={16} />")
    c = c.replace('Ver Viagem Verificada <Eye size={14} />', "{t('hero.btnVerify')} <Eye size={14} />")

    # Stats
    c = c.replace(
        "const STATS = [\n  { value: 5400, suffix: ' NM', label: 'Santos → Rotterdam', sub: 'Corredor piloto monitorado' },\n  { value: 200, suffix: '+', label: 'Modelos de IA', sub: 'via Blink AI Gateway' },\n  { value: 98, suffix: '%', label: 'Confiança SHA-256', sub: 'Evidence registrada e verificada' },\n  { value: 5, suffix: '', label: 'Portais dedicados', sub: 'Por stakeholder maritimo' },\n];",
        """const getStats = (t: any) => [
  { value: 5400, suffix: ' NM', label: t('stats.route'), sub: t('stats.routeSub') },
  { value: 200, suffix: '+', label: t('stats.models'), sub: t('stats.modelsSub') },
  { value: 98, suffix: '%', label: t('stats.trust'), sub: t('stats.trustSub') },
  { value: 5, suffix: '', label: t('stats.portals'), sub: t('stats.portalsSub') },
];"""
    )
    c = c.replace('STATS.map', 'getStats(t).map')

    # Problem
    c = c.replace('SectionLabel text="O Problema" />', 'SectionLabel text={t("problem.label")} />')
    c = c.replace('Declaração de emissões sem', '{t("problem.title1")}')
    c = c.replace('evidência verificável', '{t("problem.titleHighlight")}')
    c = c.replace('é greenwashing.', '{t("problem.title2")}')
    c = c.replace('Reguladores europeus exigem MRV auditável. Embarcadores exigem Scope 3 rastreável.\n              Portos precisam de dados para acesso a corredores verdes. O mercado não aceita mais PDF.', '{t("problem.lead")}')
    
    # Problem items
    prob_list = """[
              { issue: 'Dados AIS manipulados ou perdidos', impact: 'Posição não verificável', severity: 'ALTO' },
              { issue: 'Cálculo EU ETS manual e auditado', impact: '€65/tCO₂ · exposição crescente', severity: 'ALTO' },
              { issue: 'FuelEU — penalidade €2.400/t', impact: 'Risco regulatório 2025+', severity: 'CRÍTICO' },
              { issue: 'Certificado verde sem hash', impact: 'Invalida cadeia ESG', severity: 'MÉDIO' },
            ]"""
    new_prob = """[
              { issue: t('problem.p1_title'), impact: t('problem.p1_sub'), severity: t('problem.high') },
              { issue: t('problem.p2_title'), impact: t('problem.p2_sub'), severity: t('problem.high') },
              { issue: t('problem.p3_title'), impact: t('problem.p3_sub'), severity: t('problem.critical') },
              { issue: t('problem.p4_title'), impact: t('problem.p4_sub'), severity: t('problem.medium') },
            ]"""
    c = c.replace(prob_list, new_prob)
    c = c.replace("r.severity === 'CRÍTICO'", "r.severity === t('problem.critical')")
    c = c.replace("r.severity === 'ALTO'", "r.severity === t('problem.high')")

    # Value Cycle
    c = c.replace('SectionLabel text="Como Funciona" />', 'SectionLabel text={t("cycle.label")} />')
    c = c.replace('O ciclo completo de inteligência marítima', '{t("cycle.title")}')
    
    cycle_list = """const CYCLE = [
  { n: '01', label: 'MEDIR', sub: 'AIS + SAR + DCS', color: T.brand },
  { n: '02', label: 'CALCULAR', sub: 'ISO 14083 · IMO', color: '#60a5fa' },
  { n: '03', label: 'COMPENSAR', sub: 'EU ETS · FuelEU', color: '#fbbf24' },
  { n: '04', label: 'PROVAR', sub: 'SHA-256 Evidence', color: '#34d399' },
  { n: '05', label: 'PUBLICAR', sub: 'URL Pública · QR', color: '#a78bfa' },
];"""
    new_cycle = """const getCycle = (t: any) => [
  { n: '01', label: t('cycle.c1'), sub: 'AIS + SAR + DCS', color: T.brand },
  { n: '02', label: t('cycle.c2'), sub: 'ISO 14083 · IMO', color: '#60a5fa' },
  { n: '03', label: t('cycle.c3'), sub: 'EU ETS · FuelEU', color: '#fbbf24' },
  { n: '04', label: t('cycle.c4'), sub: 'SHA-256 Evidence', color: '#34d399' },
  { n: '05', label: t('cycle.c5'), sub: 'URL Pública · QR', color: '#a78bfa' },
];"""
    c = c.replace(cycle_list, new_cycle)
    c = c.replace('CYCLE.map', 'getCycle(t).map')
    c = c.replace('i < CYCLE.length - 1', 'i < getCycle(t).length - 1')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

replace_all()

/**
 * Meridian Intelligence — Institutional Landing Page
 *
 * Design Philosophy (Designer Apple):
 * - CLAREZA > DECORAÇÃO
 * - HIERARQUIA > VOLUME
 * - CONTEÚDO > CONTAINER
 * - REMOÇÃO > ADIÇÃO
 * - QUALIDADE INSTITUCIONAL
 *
 * Structure:
 * HERO → PROBLEM → VALUE CYCLE → PORTALS → CAPABILITIES → EVIDENCE →
 * DATA SOURCES → COMPLIANCE → BLINK AI → CTA
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Anchor, ArrowRight, Shield, Satellite,
  CheckCircle, Lock, Eye, Building2, Ship, Radar, Zap,
  ChevronRight, FileText, Hash
} from 'lucide-react';

// ── Tokens ───────────────────────────────────────────────────
const T = {
  bg:       '#07131f',
  panel:    '#091923',
  sidebar:  '#08111a',
  border:   '#1b2b39',
  subtle:   '#132030',
  brand:    '#59bdb8',
  brandDim: '#3d8a87',
  muted:    '#8da2b1',
  base:     '#c8d8e4',
  demo:     '#d7b76c',
};

// ── Animated counter ─────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = to / 40;
      const t = setInterval(() => {
        start = Math.min(start + step, to);
        setValue(Math.round(start));
        if (start >= to) clearInterval(t);
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

// ── Section wrapper ───────────────────────────────────────────
function Section({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-6 lg:px-12 py-20 lg:py-28 ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: T.brand }}>
      {text}
    </p>
  );
}

function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-6 ${className}`} style={{ color: T.base }}>
      {children}
    </h2>
  );
}

function Lead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-lg leading-relaxed max-w-2xl ${className}`} style={{ color: T.muted }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t w-full my-0" style={{ borderColor: T.border }} />;
}

// ── Portals ───────────────────────────────────────────────────
const PORTALS = [
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
];

// ── Data Sources ──────────────────────────────────────────────
const SOURCES = [
  { name: 'Spire Maritime', type: 'Satellite AIS', desc: 'Posição, velocidade, identidade — cobertura global', color: T.brand },
  { name: 'Copernicus Sentinel-1', type: 'SAR Radar', desc: 'Validação independente de posição via radar orbital', color: '#60a5fa' },
  { name: 'Copernicus Marine', type: 'Oceanografia', desc: 'Correntes, ondas, temperatura — contexto de performance', color: '#34d399' },
  { name: 'IMO DCS / EU MRV', type: 'Declarações Oficiais', desc: 'Consumo de combustível reportado — base regulatória', color: '#a78bfa' },
  { name: 'Blink AI Gateway', type: 'IA — 200+ Modelos', desc: 'Interpretação, sumarização e análise — server-side only', color: T.demo },
];

// ── Value Cycle ───────────────────────────────────────────────
const CYCLE = [
  { n: '01', label: 'MEDIR', sub: 'AIS + SAR + DCS', color: T.brand },
  { n: '02', label: 'CALCULAR', sub: 'ISO 14083 · IMO', color: '#60a5fa' },
  { n: '03', label: 'COMPENSAR', sub: 'EU ETS · FuelEU', color: '#fbbf24' },
  { n: '04', label: 'PROVAR', sub: 'SHA-256 Evidence', color: '#34d399' },
  { n: '05', label: 'PUBLICAR', sub: 'URL Pública · QR', color: '#a78bfa' },
];

// ── Stats ─────────────────────────────────────────────────────
const STATS = [
  { value: 5400, suffix: ' NM', label: 'Santos → Rotterdam', sub: 'Corredor piloto monitorado' },
  { value: 200, suffix: '+', label: 'Modelos de IA', sub: 'via Blink AI Gateway' },
  { value: 98, suffix: '%', label: 'Confiança SHA-256', sub: 'Evidence registrada e verificada' },
  { value: 5, suffix: '', label: 'Portais dedicados', sub: 'Por stakeholder maritimo' },
];

// ── Compliance Badges ─────────────────────────────────────────
const COMPLIANCE = [
  'EU MRV — Reg. (EU) 2015/757',
  'EU ETS — Reg. (EU) 2023/957',
  'FuelEU Maritime — Reg. (EU) 2023/1805',
  'ISO 14083:2023 — Scope 3 Emissions',
  'IMO DCS — MARPOL Annex VI',
  'Copernicus Open Access Policy',
];

// ── NavBar ────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(7,19,31,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${T.border}` : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Anchor size={18} style={{ color: T.brand }} />
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold tracking-widest" style={{ color: T.base }}>MERIDIAN</span>
            <span className="text-xs tracking-widest font-semibold" style={{ color: T.brand }}>INTELLIGENCE</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#portais" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>Portais</a>
          <a href="#dados" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>Dados</a>
          <a href="#evidencia" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>Evidências</a>
          <Link
            to="/"
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              background: T.brand,
              color: T.bg,
            }}
          >
            Acessar Plataforma
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ── Main Landing ──────────────────────────────────────────────
export function LandingPage() {
  return (
    <div className="min-h-screen font-sans" style={{ background: T.bg, color: T.base }}>
      <NavBar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: T.bg }}>
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            opacity: 0.35,
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(89,189,184,0.08) 0%, transparent 70%)`,
          }}
        />

        <Section className="relative pt-36 pb-24 text-center">
          {/* Label */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-8 border"
            style={{ borderColor: `${T.brand}40`, background: `${T.brand}10`, color: T.brand }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.brand }} />
            GREEN CORRIDOR INTELLIGENCE · SANTOS → ROTTERDAM
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
            Inteligência marítima que{' '}
            <span style={{ color: T.brand }}>prova</span>,{' '}
            não apenas{' '}
            <span className="italic font-light" style={{ color: T.muted }}>declara</span>.
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: T.muted }}>
            Plataforma de MRV marítimo com rastreamento AIS satélite, validação SAR independente,
            cálculo EU ETS/FuelEU e cadeia de custódia imutável por SHA-256.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: T.brand, color: T.bg }}
            >
              Acessar Plataforma <ArrowRight size={16} />
            </Link>
            <Link
              to="/public/voyage/demo-001"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm border transition-colors hover:border-brand-primary/60"
              style={{ borderColor: T.border, color: T.muted }}
            >
              Ver Viagem Verificada <Eye size={14} />
            </Link>
          </div>

          {/* Compliance strip */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {['EU MRV', 'EU ETS 2026', 'FuelEU Maritime', 'ISO 14083', 'IMO DCS'].map(tag => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-widest px-3 py-1 rounded border"
                style={{ borderColor: T.subtle, color: T.muted, background: T.panel }}
              >
                {tag}
              </span>
            ))}
          </div>
        </Section>
      </div>

      <Divider />

      {/* ── STATS ─────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="text-4xl font-semibold" style={{ color: T.brand }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="text-sm font-medium" style={{ color: T.base }}>{s.label}</p>
              <p className="text-xs" style={{ color: T.muted }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── PROBLEM ───────────────────────────────────────── */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel text="O Problema" />
            <H2>
              Declaração de emissões sem{' '}
              <span style={{ color: T.muted }}>evidência verificável</span>{' '}
              é greenwashing.
            </H2>
            <Lead>
              Reguladores europeus exigem MRV auditável. Embarcadores exigem Scope 3 rastreável.
              Portos precisam de dados para acesso a corredores verdes. O mercado não aceita mais PDF.
            </Lead>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { issue: 'Dados AIS manipulados ou perdidos', impact: 'Posição não verificável', severity: 'ALTO' },
              { issue: 'Cálculo EU ETS manual e auditado', impact: '€65/tCO₂ · exposição crescente', severity: 'ALTO' },
              { issue: 'FuelEU — penalidade €2.400/t', impact: 'Risco regulatório 2025+', severity: 'CRÍTICO' },
              { issue: 'Certificado verde sem hash', impact: 'Invalida cadeia ESG', severity: 'MÉDIO' },
            ].map(r => (
              <div
                key={r.issue}
                className="flex items-start gap-4 p-4 rounded-xl border"
                style={{ borderColor: T.subtle, background: T.panel }}
              >
                <span
                  className="text-[9px] font-bold px-2 py-1 rounded shrink-0 mt-0.5"
                  style={{
                    background: r.severity === 'CRÍTICO' ? '#7f1d1d' : r.severity === 'ALTO' ? '#431407' : '#1c1917',
                    color: r.severity === 'CRÍTICO' ? '#fca5a5' : r.severity === 'ALTO' ? '#fb923c' : T.muted,
                  }}
                >
                  {r.severity}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: T.base }}>{r.issue}</p>
                  <p className="text-xs mt-0.5" style={{ color: T.muted }}>{r.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── VALUE CYCLE ───────────────────────────────────── */}
      <Section>
        <div className="text-center mb-16">
          <SectionLabel text="Como Funciona" />
          <H2 className="mx-auto">O ciclo completo de inteligência marítima</H2>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0">
          {CYCLE.map((step, i) => (
            <div key={step.n} className="flex lg:flex-col items-center gap-4 lg:gap-0 flex-1">
              <div className="flex lg:flex-col items-center gap-3 lg:gap-4 flex-1">
                {/* Node */}
                <div
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ borderColor: step.color, color: step.color, background: `${step.color}15` }}
                >
                  {step.n}
                </div>
                {/* Connector */}
                {i < CYCLE.length - 1 && (
                  <>
                    <div className="flex-1 lg:hidden h-px w-8 mx-2" style={{ background: T.border }} />
                    <ChevronRight size={14} className="hidden lg:block -mx-2 shrink-0" style={{ color: T.border }} />
                  </>
                )}
              </div>
              <div className="lg:text-center lg:mt-4">
                <p className="text-sm font-bold" style={{ color: step.color }}>{step.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: T.muted }}>{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── PORTALS ───────────────────────────────────────── */}
      <Section id="portais">
        <SectionLabel text="5 Portais Dedicados" />
        <H2>Um sistema, cinco perspectivas de negócio</H2>
        <Lead>
          Cada stakeholder vê exatamente o que precisa.
          A mesma evidência rastreável, apresentada no contexto correto.
        </Lead>

        <div className="mt-12 grid lg:grid-cols-5 gap-4">
          {PORTALS.map(p => (
            <Link
              key={p.role}
              to={p.path}
              className="group flex flex-col gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02]"
              style={{
                borderColor: T.subtle,
                background: T.panel,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${p.accent}20`, color: p.accent }}
              >
                {p.icon}
              </div>
              <div>
                <p className="text-[9px] font-semibold tracking-wider uppercase mb-1" style={{ color: p.accent }}>
                  {p.role}
                </p>
                <p className="text-sm font-semibold" style={{ color: T.base }}>{p.title}</p>
              </div>
              <p className="text-xs leading-relaxed flex-1" style={{ color: T.muted }}>{p.desc}</p>
              <div className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: p.accent }}>
                Acessar <ArrowRight size={11} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── DATA SOURCES ──────────────────────────────────── */}
      <Section id="dados">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel text="Fontes de Dados" />
            <H2>Hierarquia de evidência, não inferência</H2>
            <Lead>
              API oficial primeiro. Dados observados antes de declarados.
              Modelo de IA como intérprete, nunca como fonte.
            </Lead>
            <p className="text-xs mt-6 leading-relaxed" style={{ color: T.muted }}>
              A arquitetura distingue explicitamente: LIVE · DEMO · STALE · UNAVAILABLE.
              Nenhuma inferência de LLM substitui dado verificado.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {SOURCES.map(s => (
              <div
                key={s.name}
                className="flex items-start gap-4 p-4 rounded-xl border"
                style={{ borderColor: T.subtle, background: T.panel }}
              >
                <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: s.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold" style={{ color: T.base }}>{s.name}</p>
                    <span className="text-[9px] px-2 py-0.5 rounded font-semibold" style={{ background: `${s.color}20`, color: s.color }}>
                      {s.type}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: T.muted }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── BLINK AI ──────────────────────────────────────── */}
      <Section>
        <div
          className="rounded-3xl p-10 lg:p-14 border relative overflow-hidden"
          style={{ borderColor: `${T.demo}30`, background: `${T.panel}` }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 60% at 100% 0%, rgba(215,183,108,0.06) 0%, transparent 70%)`,
            }}
          />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider mb-6 border"
                style={{ borderColor: `${T.demo}40`, background: `${T.demo}10`, color: T.demo }}
              >
                <Zap size={10} /> BLINK AI GATEWAY · 200+ MODELOS
              </div>
              <h3 className="text-2xl lg:text-3xl font-semibold leading-tight mb-4" style={{ color: T.base }}>
                IA que interpreta evidência.{' '}
                <span style={{ color: T.demo }}>Nunca inventa.</span>
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: T.muted }}>
                O Blink AI Gateway conecta o backend a mais de 200 modelos de linguagem.
                Todas as chamadas são server-side. A chave de API nunca chega ao navegador.
                Outputs são sempre marcados como <code style={{ color: T.demo }}>MODEL_OPINION</code>.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Interpretação Regulatória', desc: 'EU MRV / FuelEU / EU ETS em linguagem operacional' },
                { label: 'Análise de Anomalia AIS', desc: 'Explicação de desvio de posição ou emissão' },
                { label: 'Resumo de Corredor Verde', desc: 'Performance de rota Santos → Rotterdam' },
                { label: 'Classificação de Evidência', desc: 'FATO · INFERÊNCIA · CÁLCULO · ESTIMATIVA' },
              ].map(f => (
                <div
                  key={f.label}
                  className="flex items-start gap-3 p-4 rounded-xl border"
                  style={{ borderColor: `${T.demo}25`, background: `${T.demo}08` }}
                >
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: T.demo }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: T.base }}>{f.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: T.muted }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── EVIDENCE VAULT ────────────────────────────────── */}
      <Section id="evidencia">
        <div className="text-center mb-16">
          <SectionLabel text="Evidence Vault" />
          <H2>Cada declaração tem uma prova.</H2>
          <Lead className="mx-auto">
            SHA-256 imutável. Parser version registrado. AIS observations contadas.
            SAR validations documentadas. Nenhum campo em branco.
          </Lead>
        </div>

        {/* Evidence record mockup */}
        <div
          className="rounded-2xl border p-8 font-mono text-sm"
          style={{ borderColor: T.border, background: T.panel }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Hash size={16} style={{ color: T.brand }} />
              <span className="font-semibold tracking-wider text-xs" style={{ color: T.base }}>EVD-2026-0234-001</span>
              <span
                className="text-[9px] px-2 py-0.5 rounded font-bold"
                style={{ background: `${T.brand}20`, color: T.brand }}
              >
                VERIFIED
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 text-xs">
            {[
              ['voyage_id', 'VOY-2026-0234'],
              ['vessel', 'MV MERIDIAN PIONEER'],
              ['route', 'Santos → Rotterdam'],
              ['co2_tons', '2,523.3 tCO2e'],
              ['ais_observations', '47 fixes'],
              ['sar_validations', '3 Sentinel-1'],
              ['parser_version', 'meridian-parser-v2.1.0'],
              ['confidence', '98%'],
            ].map(([k, v]) => (
              <div key={k}>
                <p style={{ color: T.muted }}>{k}</p>
                <p className="font-semibold mt-0.5" style={{ color: T.brand }}>{v}</p>
              </div>
            ))}
            <div className="col-span-2 lg:col-span-4 pt-2 border-t" style={{ borderColor: T.subtle }}>
              <p style={{ color: T.muted }}>sha256</p>
              <p className="mt-0.5 break-all text-[10px]" style={{ color: T.brand }}>
                a3f82bc9d1e4f67a2b8c3d5e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── COMPLIANCE ────────────────────────────────────── */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-3">
            {COMPLIANCE.map(c => (
              <div
                key={c}
                className="flex items-center gap-3 p-3.5 rounded-xl border"
                style={{ borderColor: T.subtle, background: T.panel }}
              >
                <Shield size={14} className="shrink-0" style={{ color: T.brand }} />
                <span className="text-sm" style={{ color: T.base }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <SectionLabel text="Conformidade" />
            <H2>Construído sobre frameworks regulatórios reais</H2>
            <Lead>
              Nenhuma referência regulatória inventada. Todas as normas são rastreáveis
              ao texto oficial publicado pela Comissão Europeia, IMO e ISO.
            </Lead>
            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: `${T.brand}30`, background: `${T.brand}08` }}>
              <Lock size={14} className="shrink-0 mt-0.5" style={{ color: T.brand }} />
              <p className="text-xs leading-relaxed" style={{ color: T.muted }}>
                O Meridian Intelligence é isolado do MeridianMRV Core. Dados são promovidos
                via fluxo de revisão humana. O sistema nunca grava diretamente no core.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── CTA ───────────────────────────────────────────── */}
      <Section className="text-center">
        <div
          className="rounded-3xl px-8 py-16 border relative overflow-hidden"
          style={{ borderColor: `${T.brand}25`, background: T.panel }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 80% at 50% 100%, rgba(89,189,184,0.07) 0%, transparent 70%)`,
            }}
          />
          <div className="relative">
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider"
              style={{ borderColor: `${T.brand}40`, color: T.brand, background: `${T.brand}10` }}
            >
              <Satellite size={12} /> DEMO DISPONÍVEL — SANTOS → ROTTERDAM
            </div>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6" style={{ color: T.base }}>
              Prove o que você declara.
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: T.muted }}>
              Acesse os cinco portais, explore o Evidence Vault e veja a cadeia completa de inteligência marítima funcionando.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: T.brand, color: T.bg }}
              >
                Entrar na Plataforma <ArrowRight size={16} />
              </Link>
              <Link
                to="/public/voyage/demo-001"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm border transition-colors"
                style={{ borderColor: T.border, color: T.muted }}
              >
                <FileText size={14} /> Ver Evidência Pública
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t" style={{ borderColor: T.border }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Anchor size={16} style={{ color: T.brand }} />
              <div>
                <p className="text-xs font-bold tracking-widest" style={{ color: T.base }}>MERIDIAN INTELLIGENCE</p>
                <p className="text-[10px] mt-0.5" style={{ color: T.muted }}>Green Corridor Intelligence Programme</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-xs" style={{ color: T.muted }}>
              <span>Powered by Spire S-AIS · Copernicus · Blink AI Gateway</span>
              <span style={{ color: T.subtle }}>·</span>
              <span>Isolado do MeridianMRV Core</span>
              <span style={{ color: T.subtle }}>·</span>
              <span>Dados DEMO — não autoridade regulatória</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

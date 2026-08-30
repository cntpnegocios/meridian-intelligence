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
import { useTranslation } from 'react-i18next';
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
const getPortals = (t: any) => [
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
];

// ── Data Sources ──────────────────────────────────────────────
const getSources = (t: any) => [
  { name: 'Spire Maritime', type: t('data.s1_type'), desc: t('data.s1_desc'), color: T.brand },
  { name: 'Copernicus Sentinel-1', type: t('data.s2_type'), desc: t('data.s2_desc'), color: '#60a5fa' },
  { name: 'Copernicus Marine', type: t('data.s3_type'), desc: t('data.s3_desc'), color: '#34d399' },
  { name: 'IMO DCS / EU MRV', type: t('data.s4_type'), desc: t('data.s4_desc'), color: '#a78bfa' },
  { name: 'Blink AI Gateway', type: t('data.s5_type'), desc: t('data.s5_desc'), color: T.demo },
];

// ── Value Cycle ───────────────────────────────────────────────
const getCycle = (t: any) => [
  { n: '01', label: t('cycle.c1'), sub: 'AIS + SAR + DCS', color: T.brand },
  { n: '02', label: t('cycle.c2'), sub: 'ISO 14083 · IMO', color: '#60a5fa' },
  { n: '03', label: t('cycle.c3'), sub: 'EU ETS · FuelEU', color: '#fbbf24' },
  { n: '04', label: t('cycle.c4'), sub: 'SHA-256 Evidence', color: '#34d399' },
  { n: '05', label: t('cycle.c5'), sub: 'URL Pública · QR', color: '#a78bfa' },
];

// ── Stats ─────────────────────────────────────────────────────
const getStats = (t: any) => [
  { value: 5400, suffix: ' NM', label: t('stats.route'), sub: t('stats.routeSub') },
  { value: 200, suffix: '+', label: t('stats.models'), sub: t('stats.modelsSub') },
  { value: 98, suffix: '%', label: t('stats.trust'), sub: t('stats.trustSub') },
  { value: 5, suffix: '', label: t('stats.portals'), sub: t('stats.portalsSub') },
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
  const { t, i18n } = useTranslation();
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
          <select 
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              document.documentElement.dir = e.target.value === 'ar' ? 'rtl' : 'ltr';
            }}
            value={i18n.language}
            className="text-xs bg-transparent outline-none cursor-pointer"
            style={{ color: T.muted }}
          >
            <option value="en" className="bg-bg-panel">EN</option>
            <option value="pt" className="bg-bg-panel">PT</option>
            <option value="zh" className="bg-bg-panel">ZH</option>
            <option value="ar" className="bg-bg-panel">AR</option>
          </select>
          <a href="#portais" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>{t('nav.portals')}</a>
          <a href="#dados" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>{t('nav.data')}</a>
          <a href="#evidencia" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>{t('nav.evidence')}</a>
          <Link
            to="/app/"
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              background: T.brand,
              color: T.bg,
            }}
          >
            {t('nav.access')}
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ── Main Landing ──────────────────────────────────────────────
export function LandingPage() {
  const { t } = useTranslation();
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
            {t('hero.badge')}
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
            {t('hero.title1')}{' '}
            <span style={{ color: T.brand }}>{t('hero.titleProve')}</span>,{' '}
            não apenas{' '}
            <span className="italic font-light" style={{ color: T.muted }}>{t('hero.titleDeclare')}</span>.
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: T.muted }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/app/"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: T.brand, color: T.bg }}
            >
              {t('hero.btnAccess')} <ArrowRight size={16} />
            </Link>
            <Link
              to="/public/voyage/demo-001"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm border transition-colors hover:border-brand-primary/60"
              style={{ borderColor: T.border, color: T.muted }}
            >
              {t('hero.btnVerify')} <Eye size={14} />
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
          {getStats(t).map(s => (
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
            <SectionLabel text={t("problem.label")} />
            <H2>
              {t("problem.title1")}{' '}
              <span style={{ color: T.muted }}>{t("problem.titleHighlight")}</span>{' '}
              {t("problem.title2")}
            </H2>
            <Lead>
              {t("problem.lead")}
            </Lead>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { issue: t('problem.p1_title'), impact: t('problem.p1_sub'), severity: t('problem.high') },
              { issue: t('problem.p2_title'), impact: t('problem.p2_sub'), severity: t('problem.high') },
              { issue: t('problem.p3_title'), impact: t('problem.p3_sub'), severity: t('problem.critical') },
              { issue: t('problem.p4_title'), impact: t('problem.p4_sub'), severity: t('problem.medium') },
            ].map(r => (
              <div
                key={r.issue}
                className="flex items-start gap-4 p-4 rounded-xl border"
                style={{ borderColor: T.subtle, background: T.panel }}
              >
                <span
                  className="text-[9px] font-bold px-2 py-1 rounded shrink-0 mt-0.5"
                  style={{
                    background: r.severity === t('problem.critical') ? '#7f1d1d' : r.severity === t('problem.high') ? '#431407' : '#1c1917',
                    color: r.severity === t('problem.critical') ? '#fca5a5' : r.severity === t('problem.high') ? '#fb923c' : T.muted,
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
          <SectionLabel text={t("cycle.label")} />
          <H2 className="mx-auto">{t("cycle.title")}</H2>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0">
          {getCycle(t).map((step, i) => (
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
                {i < getCycle(t).length - 1 && (
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
        <SectionLabel text={t("portals.label")} />
        <H2>{t("portals.title")}</H2>
        <Lead>
          {t("portals.lead")}
        </Lead>

        <div className="mt-12 grid lg:grid-cols-5 gap-4">
          {getPortals(t).map(p => (
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
                {t('portals.access')} <ArrowRight size={11} />
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
            <SectionLabel text={t("data.label")} />
            <H2>{t("data.title")}</H2>
            <Lead>
              API oficial primeiro. Dados observados antes de {t('hero.titleDeclare')}dos.
              Modelo de IA como intérprete, nunca como fonte.
            </Lead>
            <p className="text-xs mt-6 leading-relaxed" style={{ color: T.muted }}>
              {t("data.disclaimer")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {getSources(t).map(s => (
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
                <Zap size={10} /> {t('ai.badge')}
              </div>
              <h3 className="text-2xl lg:text-3xl font-semibold leading-tight mb-4" style={{ color: T.base }}>
                IA que interpreta evidência.{' '}
                <span style={{ color: T.demo }}>{t('ai.titleHighlight')}</span>
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: T.muted }}>
                {t('ai.lead')} <code style={{ color: T.demo }}>MODEL_OPINION</code>.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: t('ai.f1_title'), desc: t('ai.f1_desc') },
                { label: t('ai.f2_title'), desc: t('ai.f2_desc') },
                { label: t('ai.f3_title'), desc: t('ai.f3_desc') },
                { label: t('ai.f4_title'), desc: t('ai.f4_desc') },
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
          <SectionLabel text={t("evidence.label")} />
          <H2>Cada {t('hero.titleDeclare')}ção tem uma {t('hero.titleProve')}.</H2>
          <Lead className="mx-auto">
            {t("evidence.lead")}
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
            <SectionLabel text={t("compliance.label")} />
            <H2>{t("compliance.title")}</H2>
            <Lead>
              {t("compliance.lead")}
            </Lead>
            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: `${T.brand}30`, background: `${T.brand}08` }}>
              <Lock size={14} className="shrink-0 mt-0.5" style={{ color: T.brand }} />
              <p className="text-xs leading-relaxed" style={{ color: T.muted }}>
                {t("compliance.disclaimer")}
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
              <Satellite size={12} /> {t('cta.badge')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6" style={{ color: T.base }}>
              Prove o que você {t('hero.titleDeclare')}.
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: T.muted }}>
              {t("cta.lead")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app/"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: T.brand, color: T.bg }}
              >
                {t('cta.btnAccess')} <ArrowRight size={16} />
              </Link>
              <Link
                to="/public/voyage/demo-001"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm border transition-colors"
                style={{ borderColor: T.border, color: T.muted }}
              >
                <FileText size={14} /> {t('cta.btnVerify')}
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
                <p className="text-[10px] mt-0.5" style={{ color: T.muted }}>{t("footer.sub")}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-xs" style={{ color: T.muted }}>
              <span>{t("footer.power")}</span>
              <span style={{ color: T.subtle }}>·</span>
              <span>{t("footer.isolated")}</span>
              <span style={{ color: T.subtle }}>·</span>
              <span>{t("footer.demo")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

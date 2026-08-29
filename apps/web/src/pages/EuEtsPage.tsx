import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { AlertTriangle, TrendingUp, Info } from 'lucide-react';

// ── ETS Constants ─────────────────────────────────────────────
const EUA_PRICE = 65; // €/tCO2
const PHASE_IN: Record<string, number> = { '2024': 0.40, '2025': 0.70, '2026': 1.00 };
const CURRENT_YEAR = '2026';

interface VoyageInput {
  distance_nm: number;
  cargo_tons: number;
  fuel_consumption_tons: number;
  fuel_type: 'HFO' | 'VLSFO' | 'LNG' | 'METHANOL';
  eu_scope_pct: number; // 0–100
}

const FUEL_FACTORS: Record<string, number> = {
  HFO: 3.114,
  VLSFO: 3.151,
  LNG: 2.750,
  METHANOL: 1.375,
};

function calcETS(input: VoyageInput) {
  const co2 = input.fuel_consumption_tons * FUEL_FACTORS[input.fuel_type];
  const eu_scope = input.eu_scope_pct / 100;
  const phase_in = PHASE_IN[CURRENT_YEAR];
  const reportable = co2 * eu_scope * phase_in;
  const cost = reportable * EUA_PRICE;
  const eeoi = co2 / (input.cargo_tons * input.distance_nm) * 1_000_000; // gCO2/t·nm
  return { co2, reportable, cost, eeoi, phase_in };
}

const FUEL_OPTIONS = ['HFO', 'VLSFO', 'LNG', 'METHANOL'] as const;

const ROUTE_PRESETS = [
  { label: 'Santos → Rotterdam (Container)', distance_nm: 5400, cargo_tons: 42000, fuel_consumption_tons: 810, fuel_type: 'HFO', eu_scope_pct: 50 },
  { label: 'Paranaguá → Antwerp (Bulk)', distance_nm: 5700, cargo_tons: 78000, fuel_consumption_tons: 1140, fuel_type: 'VLSFO', eu_scope_pct: 50 },
  { label: 'Rotterdam → Hamburg (Intra-EU)', distance_nm: 310, cargo_tons: 15000, fuel_consumption_tons: 62, fuel_type: 'VLSFO', eu_scope_pct: 100 },
  { label: 'Green Corridor — Santos → Rotterdam (Methanol)', distance_nm: 5400, cargo_tons: 42000, fuel_consumption_tons: 950, fuel_type: 'METHANOL', eu_scope_pct: 50 },
];

export function EuEts() {
  const [form, setForm] = useState<VoyageInput>({
    distance_nm: 5400,
    cargo_tons: 42000,
    fuel_consumption_tons: 810,
    fuel_type: 'HFO',
    eu_scope_pct: 50,
  });

  const result = calcETS(form);

  function applyPreset(idx: number) {
    const p = ROUTE_PRESETS[idx];
    setForm({ ...p, fuel_type: p.fuel_type as VoyageInput['fuel_type'] });
  }

  const field = (label: string, key: keyof VoyageInput, unit: string, type: 'number' | 'select' = 'number') => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-wider text-text-muted font-medium">{label}</label>
      {type === 'select' ? (
        <select
          value={form[key] as string}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="bg-bg-base border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-base focus:outline-none focus:border-brand-primary"
        >
          {FUEL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <div className="relative">
          <input
            type="number"
            value={form[key] as number}
            onChange={e => setForm(f => ({ ...f, [key]: parseFloat(e.target.value) || 0 }))}
            className="w-full bg-bg-base border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-base focus:outline-none focus:border-brand-primary pr-16"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">{unit}</span>
        </div>
      )}
    </div>
  );

  const riskLevel = result.cost > 100_000 ? 'error' : result.cost > 30_000 ? 'stale' : 'live';
  const riskLabel = result.cost > 100_000 ? 'HIGH EXPOSURE' : result.cost > 30_000 ? 'MEDIUM EXPOSURE' : 'LOW EXPOSURE';

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader title="EU ETS Calculator" subtitle="MARITIME & REGULATORY INTELLIGENCE" status="demo" />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">

        {/* Info banner */}
        <div className="flex items-start gap-3 border border-blue-500/20 bg-blue-500/5 rounded-lg px-4 py-3 text-xs text-blue-300">
          <Info size={14} className="shrink-0 mt-0.5" />
          <span>
            EU ETS applies to <strong>50% of emissions</strong> on voyages between EU and non-EU ports, and <strong>100%</strong> on intra-EU routes. Phase-in: 40% (2024) → 70% (2025) → 100% (2026). Current year: <strong>100%</strong> phase-in.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 border border-border-default rounded-xl p-6 bg-bg-panel flex flex-col gap-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider">Voyage Parameters</h3>
            </div>

            {/* Presets */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-text-muted font-medium">Quick Presets</label>
              <div className="flex flex-col gap-1">
                {ROUTE_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => applyPreset(i)}
                    className="text-left text-xs px-3 py-2 rounded-lg bg-bg-base border border-border-subtle hover:border-brand-primary/50 hover:text-brand-primary transition-colors text-text-muted"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border-subtle pt-4 flex flex-col gap-4">
              {field('Distance', 'distance_nm', 'NM')}
              {field('Cargo Weight', 'cargo_tons', 'tons')}
              {field('Fuel Consumed', 'fuel_consumption_tons', 'tons')}
              {field('Fuel Type', 'fuel_type', '', 'select')}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-text-muted font-medium flex justify-between">
                  EU Scope <span className="text-brand-primary font-semibold">{form.eu_scope_pct}%</span>
                </label>
                <input type="range" min={0} max={100} step={10} value={form.eu_scope_pct}
                  onChange={e => setForm(f => ({ ...f, eu_scope_pct: parseInt(e.target.value) }))}
                  className="accent-cyan-500" />
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>0% (non-EU)</span><span>50% (EU↔non-EU)</span><span>100% (intra-EU)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Main exposure card */}
            <div className="border border-border-default rounded-xl p-6 bg-bg-panel">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-text-muted mb-1">Estimated EU ETS Cost</p>
                  <p className="text-5xl font-bold text-amber-400">€{result.cost.toLocaleString('en-EU', { maximumFractionDigits: 0 })}</p>
                  <p className="text-xs text-text-muted mt-2">
                    {result.reportable.toFixed(1)} tCO2 reportable × €{EUA_PRICE}/EUA · Phase-in: {(result.phase_in * 100).toFixed(0)}%
                  </p>
                </div>
                <Badge variant={riskLevel} className="px-3 py-1.5 text-xs shrink-0">
                  <AlertTriangle size={11} className="mr-1 inline" />{riskLabel}
                </Badge>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Total CO2 Emitted</p>
                  <p className="text-xl font-semibold text-text-base">{result.co2.toFixed(1)} <span className="text-sm font-normal text-text-muted">tCO2e</span></p>
                  <p className="text-xs text-text-muted mt-1">Factor: {FUEL_FACTORS[form.fuel_type]} tCO2/t fuel</p>
                </div>
                <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">EEOI</p>
                  <p className="text-xl font-semibold text-text-base">{result.eeoi.toFixed(2)} <span className="text-sm font-normal text-text-muted">gCO2/t·nm</span></p>
                  <p className="text-xs text-text-muted mt-1">Energy Efficiency Operational Indicator</p>
                </div>
                <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Reportable Scope</p>
                  <p className="text-xl font-semibold text-text-base">{result.reportable.toFixed(1)} <span className="text-sm font-normal text-text-muted">tCO2</span></p>
                  <p className="text-xs text-text-muted mt-1">{form.eu_scope_pct}% EU scope × {(result.phase_in * 100).toFixed(0)}% phase-in</p>
                </div>
                <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Cost per NM</p>
                  <p className="text-xl font-semibold text-amber-400">€{(result.cost / form.distance_nm).toFixed(2)}</p>
                  <p className="text-xs text-text-muted mt-1">ETS cost per nautical mile</p>
                </div>
              </div>
            </div>

            {/* Fuel comparison */}
            <div className="border border-border-default rounded-xl p-6 bg-bg-panel">
              <h4 className="text-sm font-semibold text-text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-400" /> Fuel Alternative Comparison
              </h4>
              <div className="flex flex-col gap-2">
                {FUEL_OPTIONS.map(fuel => {
                  const co2 = form.fuel_consumption_tons * FUEL_FACTORS[fuel];
                  const cost = co2 * (form.eu_scope_pct / 100) * result.phase_in * EUA_PRICE;
                  const pct = Math.round((cost / Math.max(...FUEL_OPTIONS.map(f => form.fuel_consumption_tons * FUEL_FACTORS[f] * (form.eu_scope_pct / 100) * result.phase_in * EUA_PRICE))) * 100);
                  const isSelected = fuel === form.fuel_type;
                  return (
                    <div key={fuel} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isSelected ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-border-subtle'}`}>
                      <span className="w-20 text-xs font-mono text-text-muted font-medium">{fuel}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full">
                        <div
                          className={`h-1.5 rounded-full transition-all ${fuel === 'METHANOL' ? 'bg-emerald-500' : fuel === 'LNG' ? 'bg-blue-500' : fuel === 'VLSFO' ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold w-28 text-right text-text-base">€{cost.toLocaleString('en', { maximumFractionDigits: 0 })}</span>
                      {isSelected && <Badge variant="demo" className="text-[9px]">SELECTED</Badge>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-text-muted border border-border-subtle rounded-lg p-3 bg-bg-panel">
              <strong className="text-amber-400">⚠ ESTIMATED DATA</strong> — Results based on IMO emission factors and EU ETS Regulation (EU) 2015/757. This tool does not replace official MRV reporting. To promote calculations as authoritative evidence, use the Evidence Vault.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

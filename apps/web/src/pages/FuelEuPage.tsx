import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { TrendingDown, CheckCircle, XCircle, Info, Fuel } from 'lucide-react';

// ── FuelEU Maritime Targets ───────────────────────────────────
// GHG intensity targets (gCO2eq/MJ) — reference is 91.16 gCO2eq/MJ (baseline 2020)
const BASELINE_GHG = 91.16;
const TARGETS: Record<number, number> = {
  2025: -2,   // -2%
  2030: -6,
  2035: -14.5,
  2040: -31,
  2045: -62,
  2050: -80,
};

// Fuel GHG intensity (gCO2eq/MJ) — Well-to-Wake
const FUEL_GHG: Record<string, number> = {
  'HFO': 91.16,
  'VLSFO': 90.4,
  'LNG': 78.2,
  'Bio-LNG': 28.0,
  'Green Methanol': 6.8,
  'Green Ammonia': 0.0,
  'Blue Hydrogen': 14.0,
};

function calcFuelEU(fuelType: string, windAssist: number, eeoi: number) {
  const actual = (FUEL_GHG[fuelType] || 91.16) * (1 - windAssist / 100);
  const target2025 = BASELINE_GHG * (1 + TARGETS[2025] / 100);
  const target2030 = BASELINE_GHG * (1 + TARGETS[2030] / 100);
  const target2050 = BASELINE_GHG * (1 + TARGETS[2050] / 100);

  const compliant2025 = actual <= target2025;
  const compliant2030 = actual <= target2030;

  // FuelEU penalty: €2,400 per tonne of VLSFO-equivalent non-compliance
  const gap2025 = Math.max(0, actual - target2025);
  const penalty_per_MJ = gap2025 / 1000;
  const energy_MJ_per_voyage = eeoi * 42_000 * 5400 / 1000;
  const annual_penalty = penalty_per_MJ * energy_MJ_per_voyage * 2400;

  return { actual, target2025, target2030, target2050, compliant2025, compliant2030, gap2025, annual_penalty };
}

export function FuelEuPage() {
  const [fuelType, setFuelType] = useState('HFO');
  const [windAssist, setWindAssist] = useState(0);
  const [eeoi, setEeoi] = useState(8.5);

  const r = calcFuelEU(fuelType, windAssist, eeoi);

  const scoreRaw = Math.max(0, Math.min(100, 100 - ((r.actual - r.target2050) / (BASELINE_GHG - r.target2050)) * 100));
  const score = Math.round(scoreRaw);
  const scoreColor = score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader title="FuelEU Maritime" subtitle="MARITIME & REGULATORY INTELLIGENCE" status="demo" />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">

        <div className="flex items-start gap-3 border border-blue-500/20 bg-blue-500/5 rounded-lg px-4 py-3 text-xs text-blue-300">
          <Info size={14} className="shrink-0 mt-0.5" />
          <span>
            FuelEU Maritime (Reg. 2023/1805) sets maximum GHG intensity thresholds (Well-to-Wake). Ships failing targets pay a penalty of <strong>€2,400/tonne VLSFO-eq surplus energy</strong>. Applies to all ships &gt;5,000 GT on EU voyages from 1 Jan 2025.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="border border-border-default rounded-xl p-6 bg-bg-panel flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider flex items-center gap-2">
              <Fuel size={14} className="text-cyan-400" /> Vessel Parameters
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-text-muted font-medium">Main Fuel Type</label>
              <select value={fuelType} onChange={e => setFuelType(e.target.value)}
                className="bg-bg-base border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-base focus:outline-none focus:border-brand-primary">
                {Object.keys(FUEL_GHG).map(f => <option key={f}>{f}</option>)}
              </select>
              <p className="text-[10px] text-text-muted">WtW intensity: <span className="text-cyan-300">{FUEL_GHG[fuelType]} gCO2eq/MJ</span></p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-text-muted font-medium flex justify-between">
                Wind-Assist Reduction <span className="text-cyan-300">{windAssist}%</span>
              </label>
              <input type="range" min={0} max={40} step={5} value={windAssist}
                onChange={e => setWindAssist(parseInt(e.target.value))} className="accent-cyan-500" />
              <div className="flex justify-between text-[10px] text-text-muted"><span>None</span><span>Rotor Sail / Kite</span></div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-text-muted font-medium flex justify-between">
                EEOI <span className="text-cyan-300">{eeoi} gCO2/t·nm</span>
              </label>
              <input type="range" min={4} max={20} step={0.5} value={eeoi}
                onChange={e => setEeoi(parseFloat(e.target.value))} className="accent-cyan-500" />
            </div>

            {/* Pathway to 2050 */}
            <div className="border-t border-border-subtle pt-4">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3 font-medium">Pathway to 2050</p>
              <div className="flex flex-col gap-2">
                {Object.entries(TARGETS).map(([yr, pct]) => {
                  const target = BASELINE_GHG * (1 + pct / 100);
                  const ok = r.actual <= target;
                  return (
                    <div key={yr} className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">{yr}</span>
                      <span className="font-mono text-text-muted">{target.toFixed(1)} gCO2eq/MJ</span>
                      {ok
                        ? <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={11} />PASS</span>
                        : <span className="text-red-400 flex items-center gap-1"><XCircle size={11} />FAIL</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Score + Results */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Score gauge */}
            <div className="border border-border-default rounded-xl p-6 bg-bg-panel">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-text-muted mb-2">FuelEU Compliance Score</p>
                  <div className={`text-6xl font-bold ${scoreColor}`}>{score}<span className="text-2xl text-text-muted">/100</span></div>
                  <p className="text-xs text-text-muted mt-2">
                    Actual GHG intensity: <span className="text-cyan-300 font-semibold">{r.actual.toFixed(1)} gCO2eq/MJ</span>
                  </p>
                </div>
                <Badge variant={r.compliant2025 ? 'live' : 'error'} className="px-3 py-1.5 text-xs">
                  {r.compliant2025 ? '✓ COMPLIANT 2025' : '✗ NON-COMPLIANT 2025'}
                </Badge>
              </div>

              {/* Visual gauge bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>Non-compliant</span><span>Baseline (HFO)</span><span>Compliant 2050</span>
                </div>
                <div className="h-3 w-full bg-gradient-to-r from-red-900 via-amber-900 to-emerald-900 rounded-full relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg bg-white transition-all"
                    style={{ left: `${Math.max(0, Math.min(98, scoreRaw))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-red-400">0</span>
                  <span className="text-amber-400">50</span>
                  <span className="text-emerald-400">100</span>
                </div>
              </div>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="GHG Intensity (Actual)"
                value={`${r.actual.toFixed(1)}`}
                subtitle="gCO2eq/MJ — Well-to-Wake"
                status="demo"
                trend={{ value: `${((r.actual / BASELINE_GHG - 1) * 100).toFixed(1)}% vs baseline`, direction: r.actual < BASELINE_GHG ? 'down' : 'up' }}
              />
              <MetricCard
                title="2025 Target"
                value={`${r.target2025.toFixed(1)}`}
                subtitle="gCO2eq/MJ — Required"
                status={r.compliant2025 ? 'live' : 'error'}
              />
              <MetricCard
                title="Gap to 2025 Target"
                value={r.gap2025 > 0 ? `+${r.gap2025.toFixed(1)}` : '✓ Achieved'}
                subtitle="gCO2eq/MJ surplus"
                status={r.compliant2025 ? 'live' : 'stale'}
                trend={r.gap2025 > 0 ? { value: 'Improvement needed', direction: 'up' } : { value: 'Target met', direction: 'down' }}
              />
              <MetricCard
                title="Est. Annual Penalty"
                value={r.annual_penalty > 0 ? `€${(r.annual_penalty / 1000).toFixed(0)}K` : '€0'}
                subtitle={r.annual_penalty > 0 ? 'Non-compliance penalty' : 'No penalty'}
                status={r.annual_penalty > 0 ? 'error' : 'live'}
                icon={<TrendingDown size={14} className="text-red-400" />}
              />
            </div>

            {/* Recommendation */}
            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-5">
              <p className="text-xs text-emerald-300 uppercase tracking-wider font-semibold mb-2">Decarbonization Recommendation</p>
              {r.compliant2025
                ? <p className="text-sm text-text-base">✓ This fuel is compliant with the 2025 FuelEU target. Consider switching to <strong>Green Methanol</strong> or <strong>Bio-LNG</strong> to build a 2030–2035 buffer and reduce ETS exposure simultaneously.</p>
                : <p className="text-sm text-text-base">⚠ This fuel does not meet the 2025 FuelEU target. Recommend switching to <strong className="text-emerald-300">LNG, Bio-LNG or Green Methanol</strong> to avoid the €2,400/t penalty. Wind-assist sails can reduce intensity by up to 15–20%.</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

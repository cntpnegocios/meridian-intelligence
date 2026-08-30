import { useState, useMemo } from 'react';
import { Zap, AlertCircle, CheckCircle, TrendingDown, DollarSign, Leaf } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';

// FuelEU 2025 constants
const FUELEU_2025_TARGET = 91.16;
const PENALTY_RATE_PER_TONNE = 2400;
const VLSFO_ENERGY_CONTENT_MJ_PER_KG = 41.0;

interface FuelDef {
  label: string;
  co2Factor: number;
}

const FUEL_DEFS: Record<string, FuelDef> = {
  VLSFO:       { label: 'VLSFO (100%)',             co2Factor: 91.16 },
  HFO:         { label: 'HFO',                       co2Factor: 93.30 },
  LNG:         { label: 'LNG',                       co2Factor: 78.00 },
  METHANOL:    { label: 'Methanol',                  co2Factor: 55.00 },
  BIOMETHANOL: { label: 'Bio-Methanol (B15 blend)',  co2Factor: 83.50 },
};

export function FuelEuScore() {
  const [fuelTypeKey, setFuelTypeKey] = useState<string>('HFO');
  const [fuelConsumptionT, setFuelConsumptionT] = useState<string>('500');
  const [energyConsumedMJ, setEnergyConsumedMJ] = useState<string>('24500');

  const calc = useMemo(() => {
    const fuel = FUEL_DEFS[fuelTypeKey] ?? FUEL_DEFS['VLSFO'];
    const energy = parseFloat(energyConsumedMJ) || 0;
    const ghgIntensity = fuel.co2Factor;
    const compliancePct = ((FUELEU_2025_TARGET - ghgIntensity) / FUELEU_2025_TARGET) * 100;
    const isCompliant = ghgIntensity <= FUELEU_2025_TARGET;
    const deficit = Math.max(0, ghgIntensity - FUELEU_2025_TARGET);
    const vlsfoEquivKg = (deficit * energy) / (VLSFO_ENERGY_CONTENT_MJ_PER_KG * 1000);
    const penalty = (vlsfoEquivKg / 1000) * PENALTY_RATE_PER_TONNE;
    const gaugeWidth = Math.min((ghgIntensity / 110) * 100, 100);
    return { ghgIntensity, compliancePct, isCompliant, deficit, vlsfoEquivKg, penalty, gaugeWidth };
  }, [fuelTypeKey, energyConsumedMJ]);

  const blendScenario = useMemo(() => {
    const blended = FUEL_DEFS['BIOMETHANOL'];
    return {
      intensity: blended.co2Factor,
      isCompliant: blended.co2Factor <= FUELEU_2025_TARGET,
      reduction: calc.ghgIntensity - blended.co2Factor,
    };
  }, [calc.ghgIntensity]);

  return (
    <div className="min-h-screen bg-bg-base p-6 space-y-6">
      <PageHeader
        title="FuelEU Compliance Score"
        subtitle="GHG Intensity & Penalty Calculator"
        status="live"
      />

      <div className="bg-bg-panel border border-border-default rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-base font-semibold text-text-base">Vessel Parameters</h2>
          <Badge variant="live">Formula-Driven</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Fuel Type</label>
            <select
              value={fuelTypeKey}
              onChange={e => setFuelTypeKey(e.target.value)}
              className="w-full rounded-lg border border-border-default bg-bg-base px-3 py-2 text-sm text-text-base focus:border-brand-primary focus:outline-none"
            >
              {Object.entries(FUEL_DEFS).map(([k, f]) => (
                <option key={k} value={k}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Fuel Consumption (MT)</label>
            <input
              type="number"
              value={fuelConsumptionT}
              onChange={e => setFuelConsumptionT(e.target.value)}
              className="w-full rounded-lg border border-border-default bg-bg-base px-3 py-2 text-sm text-text-base focus:border-brand-primary focus:outline-none"
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Energy Consumed (MJ)</label>
            <input
              type="number"
              value={energyConsumedMJ}
              onChange={e => setEnergyConsumedMJ(e.target.value)}
              className="w-full rounded-lg border border-border-default bg-bg-base px-3 py-2 text-sm text-text-base focus:border-brand-primary focus:outline-none"
              placeholder="24500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="FuelEU 2025 Target"
          value={`${FUELEU_2025_TARGET}`}
          subtitle="gCO2eq/MJ (2025 Limit)"
          status="live"
          icon={<CheckCircle className="w-5 h-5 text-brand-primary" />}
        />
        <MetricCard
          title="Actual GHG Intensity"
          value={`${calc.ghgIntensity.toFixed(1)}`}
          subtitle="gCO2eq/MJ (selected fuel)"
          status={calc.isCompliant ? 'live' : 'demo'}
          icon={<AlertCircle className={`w-5 h-5 ${calc.isCompliant ? 'text-emerald-400' : 'text-red-400'}`} />}
          trend={
            calc.isCompliant
              ? { value: `${Math.abs(calc.compliancePct).toFixed(1)}%`, direction: 'down' }
              : { value: `${Math.abs(calc.compliancePct).toFixed(1)}%`, direction: 'up' }
          }
        />
        <MetricCard
          title="Compliance Deficit"
          value={calc.isCompliant ? '0.00' : calc.deficit.toFixed(2)}
          subtitle={calc.isCompliant ? 'COMPLIANT' : 'gCO2eq/MJ Over Limit'}
          status={calc.isCompliant ? 'live' : 'demo'}
          icon={<TrendingDown className={`w-5 h-5 ${calc.isCompliant ? 'text-emerald-400' : 'text-amber-400'}`} />}
        />
      </div>

      <div className="bg-bg-panel border border-border-default rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-base mb-1">Compliance Gauge</h2>
            <p className="text-sm text-text-muted">Current performance vs FuelEU 2025 regulatory target</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
            calc.isCompliant
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          }`}>
            {calc.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
          </span>
        </div>
        <div className="space-y-4">
          <div className="relative h-12 bg-bg-base rounded-lg overflow-hidden border border-border-subtle">
            <div className="absolute inset-0 flex items-center">
              <div className="absolute left-0 top-0 bottom-0 w-[83.33%] border-r-2 border-brand-primary border-dashed" />
              <div className="absolute left-[83.33%] top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="bg-brand-primary text-bg-base text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                  Target: {FUELEU_2025_TARGET}
                </div>
              </div>
            </div>
            <div
              className={`h-full transition-all duration-500 relative ${
                calc.isCompliant
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-red-500'
              }`}
              style={{ width: `${calc.gaugeWidth}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                <div className={`text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg ${
                  calc.isCompliant ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  Actual: {calc.ghgIntensity.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>0 gCO2eq/MJ</span>
            <span className="text-brand-primary font-medium">Target Zone ({FUELEU_2025_TARGET})</span>
            <span>110 gCO2eq/MJ</span>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-subtle">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-primary mb-1">
                {((FUELEU_2025_TARGET / 110) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-text-muted">Target Achievement</div>
            </div>
            <div className="text-center border-l border-r border-border-subtle">
              <div className={`text-2xl font-bold mb-1 ${calc.isCompliant ? 'text-emerald-400' : 'text-red-400'}`}>
                {((calc.ghgIntensity / FUELEU_2025_TARGET) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-text-muted">Current Performance</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${calc.isCompliant ? 'text-emerald-400' : 'text-amber-400'}`}>
                {calc.isCompliant ? 'Compliant' : 'Non-Compliant'}
              </div>
              <div className="text-xs text-text-muted">Status</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`bg-bg-panel border rounded-lg p-6 ${calc.isCompliant ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${calc.isCompliant ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                <DollarSign className={`w-5 h-5 ${calc.isCompliant ? 'text-emerald-400' : 'text-red-400'}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-base">Penalty Calculation</h3>
                <p className="text-sm text-text-muted">FuelEU Maritime Non-Compliance</p>
              </div>
            </div>
            <Badge variant="live">Live Formula</Badge>
          </div>
          <div className="space-y-4">
            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Deficit</span>
                <span className="text-sm font-medium text-text-base">{calc.deficit.toFixed(2)} gCO2eq/MJ</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Energy Consumed</span>
                <span className="text-sm font-medium text-text-base">{Number(energyConsumedMJ).toLocaleString()} MJ</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">VLSFO Equivalent</span>
                <span className="text-sm font-medium text-text-base">{calc.vlsfoEquivKg.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
                <span className="text-sm text-text-muted">Penalty Rate</span>
                <span className="text-sm font-medium text-text-base">€{PENALTY_RATE_PER_TONNE.toLocaleString()} per tonne</span>
              </div>
            </div>
            <div className={`rounded-lg p-6 border ${calc.isCompliant ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="text-center">
                <div className={`text-sm mb-2 font-medium ${calc.isCompliant ? 'text-emerald-400' : 'text-red-400'}`}>
                  {calc.isCompliant ? 'No Penalty — Compliant' : 'Total Penalty'}
                </div>
                <div className={`text-4xl font-bold mb-1 ${calc.isCompliant ? 'text-emerald-400' : 'text-red-400'}`}>
                  €{Math.round(calc.penalty).toLocaleString()}
                </div>
                <div className="text-xs text-text-muted">Annual non-compliance cost</div>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-text-muted bg-bg-base rounded p-3 border border-border-subtle">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p>
                Penalties are calculated based on energy consumed × GHG intensity deficit × €{PENALTY_RATE_PER_TONNE.toLocaleString()}/tonne VLSFO equivalent.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-panel border border-brand-primary/30 rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-base">Alternative Fuel Impact</h3>
                <p className="text-sm text-text-muted">Compliance Optimization Scenario</p>
              </div>
            </div>
            <Badge variant="live">Live</Badge>
          </div>
          <div className="space-y-4">
            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-base">Bio-Methanol Blend (15%)</span>
                <span className="text-lg font-bold text-brand-primary">B15</span>
              </div>
              <div className="relative h-2 bg-bg-sidebar rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary to-green-400 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                <div className="text-xs text-text-muted mb-1">Current Fuel</div>
                <div className="text-sm font-medium text-text-base mb-1">{FUEL_DEFS[fuelTypeKey]?.label ?? fuelTypeKey}</div>
                <div className={`text-xs ${calc.isCompliant ? 'text-emerald-400' : 'text-red-400'}`}>
                  {calc.ghgIntensity.toFixed(1)} gCO2eq/MJ
                </div>
              </div>
              <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                <div className="text-xs text-text-muted mb-1">Blended Fuel</div>
                <div className="text-sm font-medium text-text-base mb-1">VLSFO + Bio-MeOH</div>
                <div className={`text-xs ${blendScenario.isCompliant ? 'text-brand-primary' : 'text-amber-400'}`}>
                  {blendScenario.intensity.toFixed(1)} gCO2eq/MJ
                </div>
              </div>
            </div>
            <div className="bg-brand-primary/10 rounded-lg p-6 border border-brand-primary/30">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-brand-primary" />
                  <div className="text-sm text-brand-primary font-medium">Projected Intensity</div>
                </div>
                <div className="text-4xl font-bold text-brand-primary mb-1">{blendScenario.intensity.toFixed(1)}</div>
                <div className="text-xs text-text-muted mb-3">gCO2eq/MJ</div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${blendScenario.isCompliant ? 'bg-brand-primary/20' : 'bg-amber-500/20'}`}>
                  <CheckCircle className={`w-3 h-3 ${blendScenario.isCompliant ? 'text-brand-primary' : 'text-amber-400'}`} />
                  <span className={`text-xs font-medium ${blendScenario.isCompliant ? 'text-brand-primary' : 'text-amber-400'}`}>
                    {blendScenario.isCompliant ? 'Compliant' : 'Still Deficit'}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">GHG Reduction</span>
                <span className="text-sm font-medium text-brand-primary">{blendScenario.reduction.toFixed(2)} gCO2eq/MJ</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
                <span className="text-sm text-text-muted">Compliance Margin</span>
                <span className={`text-sm font-medium ${blendScenario.isCompliant ? 'text-brand-primary' : 'text-amber-400'}`}>
                  {(FUELEU_2025_TARGET - blendScenario.intensity).toFixed(2)} gCO2eq/MJ
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-text-muted bg-bg-base rounded p-3 border border-border-subtle">
              <Zap className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
              <p>Blending 15% bio-methanol reduces well-to-wake GHG intensity below the regulatory limit, eliminating penalties.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-panel border border-border-default rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-base mb-1">Compliance Scenarios</h3>
            <p className="text-sm text-text-muted">Alternative fuel strategies vs FuelEU 2025 target ({FUELEU_2025_TARGET} gCO2eq/MJ)</p>
          </div>
          <Badge variant="live">Formula-Driven</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Fuel Mix</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">GHG Intensity</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">vs Target</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(FUEL_DEFS).map(([key, fuel]) => {
                const isOk = fuel.co2Factor <= FUELEU_2025_TARGET;
                const diff = fuel.co2Factor - FUELEU_2025_TARGET;
                return (
                  <tr key={key} className={`border-b border-border-subtle ${key === fuelTypeKey ? 'bg-brand-primary/5' : ''}`}>
                    <td className="py-3 px-4 text-sm text-text-base">{fuel.label}</td>
                    <td className="text-right py-3 px-4 text-sm font-mono text-text-muted">{fuel.co2Factor.toFixed(2)}</td>
                    <td className={`text-right py-3 px-4 text-sm font-mono ${isOk ? 'text-emerald-400' : 'text-amber-500'}`}>
                      {isOk ? `-${Math.abs(diff).toFixed(2)}` : `+${diff.toFixed(2)}`}
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`text-xs font-bold ${isOk ? 'text-brand-primary' : 'text-amber-500'}`}>
                        {isOk ? 'COMPLIANT' : 'DEFICIT'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
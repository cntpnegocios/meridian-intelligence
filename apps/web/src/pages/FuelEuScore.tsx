
import { Zap, AlertCircle, CheckCircle, TrendingDown, DollarSign, Leaf } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';

export function FuelEuScore() {
  const targetIntensity = 89.3;
  const actualIntensity = 92.1;
  
  
  const blendPercentage = 15;
  const projectedIntensity = 88.5;

  const compliancePercentage = (actualIntensity / targetIntensity) * 100;
  const gaugePercentage = Math.min(compliancePercentage, 120);

  return (
    <div className="min-h-screen bg-bg-base p-6 space-y-6">
      <PageHeader
        title="FuelEU Compliance Score"
        subtitle="GHG Intensity & Penalty Calculator"
        status="demo"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Target GHG Intensity"
          value="89.3"
          subtitle="gCO2eq/MJ (2025 Limit)"
          status="demo"
          icon={<CheckCircle className="w-5 h-5 text-text-brand-primary" />}
        />
        <MetricCard
          title="Actual Intensity"
          value="92.1"
          subtitle="gCO2eq/MJ (Current Fleet)"
          status="demo"
          icon={<AlertCircle className="w-5 h-5 text-red-400" />}
          trend={{ value: '3.1', direction: 'up' }}
        />
        <MetricCard
          title="Compliance Deficit"
          value="2.8"
          subtitle="gCO2eq/MJ Over Limit"
          status="demo"
          icon={<TrendingDown className="w-5 h-5 text-amber-400" />}
        />
      </div>

      <div className="bg-bg-panel border border-border-default rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-base mb-1">Compliance Gauge</h2>
            <p className="text-sm text-text-muted">Current performance vs regulatory target</p>
          </div>
          <Badge variant="demo">Demo Data</Badge>
        </div>

        <div className="space-y-4">
          <div className="relative h-12 bg-bg-base rounded-lg overflow-hidden border border-border-subtle">
            <div className="absolute inset-0 flex items-center">
              <div className="absolute left-0 top-0 bottom-0 w-[83.33%] border-r-2 border-text-brand-primary border-dashed"></div>
              <div className="absolute left-[83.33%] top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="bg-text-brand-primary text-bg-base text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                  Target: 89.3
                </div>
              </div>
            </div>
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500 relative"
              style={{ width: `${gaugePercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  Actual: 92.1
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-text-muted">
            <span>0 gCO2eq/MJ</span>
            <span className="text-text-brand-primary font-medium">Target Zone</span>
            <span>110 gCO2eq/MJ</span>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-subtle">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-brand-primary mb-1">83.3%</div>
              <div className="text-xs text-text-muted">Target Achievement</div>
            </div>
            <div className="text-center border-l border-r border-border-subtle">
              <div className="text-2xl font-bold text-red-400 mb-1">103.1%</div>
              <div className="text-xs text-text-muted">Current Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">Non-Compliant</div>
              <div className="text-xs text-text-muted">Status</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-panel border border-red-500/30 rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-base">Penalty Calculation</h3>
                <p className="text-sm text-text-muted">FuelEU Maritime Non-Compliance</p>
              </div>
            </div>
            <Badge variant="demo">Demo</Badge>
          </div>

          <div className="space-y-4">
            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Deficit</span>
                <span className="text-sm font-medium text-text-base">2.8 gCO2eq/MJ</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Energy Consumed</span>
                <span className="text-sm font-medium text-text-base">24,500 MJ</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">VLSFO Equivalent</span>
                <span className="text-sm font-medium text-text-base">68.6 tonnes</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
                <span className="text-sm text-text-muted">Penalty Rate</span>
                <span className="text-sm font-medium text-text-base">€2,400 per tonne</span>
              </div>
            </div>

            <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/30">
              <div className="text-center">
                <div className="text-sm text-red-400 mb-2 font-medium">Total Penalty</div>
                <div className="text-4xl font-bold text-red-400 mb-1">€145,200</div>
                <div className="text-xs text-text-muted">Annual non-compliance cost</div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-text-muted bg-bg-base rounded p-3 border border-border-subtle">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p>
                Penalties apply per voyage and are calculated based on the energy consumed multiplied by the GHG intensity deficit and the penalty rate of €2,400 per tonne of VLSFO equivalent.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-panel border border-text-brand-primary/30 rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-text-brand-primary/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-text-brand-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-base">Alternative Fuel Impact</h3>
                <p className="text-sm text-text-muted">Compliance Optimization Scenario</p>
              </div>
            </div>
            <Badge variant="demo">Demo</Badge>
          </div>

          <div className="space-y-4">
            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-base">Bio-Methanol Blend</span>
                <span className="text-lg font-bold text-text-brand-primary">{blendPercentage}%</span>
              </div>
              <div className="relative h-2 bg-bg-sidebar rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-text-brand-primary to-green-400 rounded-full"
                  style={{ width: `${blendPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                <div className="text-xs text-text-muted mb-1">Current Fuel</div>
                <div className="text-sm font-medium text-text-base mb-1">VLSFO 100%</div>
                <div className="text-xs text-red-400">92.1 gCO2eq/MJ</div>
              </div>
              <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
                <div className="text-xs text-text-muted mb-1">Blended Fuel</div>
                <div className="text-sm font-medium text-text-base mb-1">VLSFO + Bio-MeOH</div>
                <div className="text-xs text-text-brand-primary">88.5 gCO2eq/MJ</div>
              </div>
            </div>

            <div className="bg-text-brand-primary/10 rounded-lg p-6 border border-text-brand-primary/30">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-text-brand-primary" />
                  <div className="text-sm text-text-brand-primary font-medium">Projected Intensity</div>
                </div>
                <div className="text-4xl font-bold text-text-brand-primary mb-1">{projectedIntensity}</div>
                <div className="text-xs text-text-muted mb-3">gCO2eq/MJ</div>
                <div className="inline-flex items-center gap-2 bg-text-brand-primary/20 rounded-full px-3 py-1">
                  <CheckCircle className="w-3 h-3 text-text-brand-primary" />
                  <span className="text-xs font-medium text-text-brand-primary">Compliant</span>
                </div>
              </div>
            </div>

            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Penalty Savings</span>
                <span className="text-sm font-bold text-text-brand-primary">€145,200</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">GHG Reduction</span>
                <span className="text-sm font-medium text-text-base">3.6 gCO2eq/MJ</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
                <span className="text-sm text-text-muted">Compliance Margin</span>
                <span className="text-sm font-medium text-text-brand-primary">0.8 gCO2eq/MJ</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-text-muted bg-bg-base rounded p-3 border border-border-subtle">
              <Zap className="w-4 h-4 text-text-brand-primary flex-shrink-0 mt-0.5" />
              <p>
                Blending 15% bio-methanol reduces well-to-wake GHG intensity below the regulatory limit, eliminating penalties and providing a compliance buffer for operational flexibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-panel border border-border-default rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-base mb-1">Compliance Scenarios</h3>
            <p className="text-sm text-text-muted">Alternative fuel blending strategies</p>
          </div>
          <Badge variant="demo">Demo Data</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Fuel Mix</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">GHG Intensity</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Penalty</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-subtle">
                <td className="py-3 px-4 text-sm text-text-base">100% VLSFO</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-text-muted">92.1</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-amber-500">€145,200</td>
                <td className="text-center py-3 px-4"><span className="text-xs text-amber-500">DEFICIT</span></td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="py-3 px-4 text-sm text-text-base">85% VLSFO + 15% Bio-Methanol</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-text-muted">88.5</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-brand-primary">€0</td>
                <td className="text-center py-3 px-4"><span className="text-xs text-brand-primary">COMPLIANT</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

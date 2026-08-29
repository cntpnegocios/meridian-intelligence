import { useEffect, useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { checkHealth } from '../api/client';
import { Ship, Activity, AlertTriangle, Database, TrendingDown, Anchor, Leaf } from 'lucide-react';

// Demo emissions data — realistic monthly snapshot
const MONTHLY_EMISSIONS = [
  { month: 'Mar', value: 1840 },
  { month: 'Apr', value: 2120 },
  { month: 'May', value: 1950 },
  { month: 'Jun', value: 2340 },
  { month: 'Jul', value: 2180 },
  { month: 'Aug', value: 1620 },
];

const FLEET_DEMO = [
  { name: 'MV MERIDIAN PIONEER', imo: '9876543', status: 'En Route', route: 'Santos → Rotterdam', eta: '12 Sep', emissions: '1,420 tCO2', risk: 'low' },
  { name: 'MV ATLANTIC STAR', imo: '9234512', status: 'At Berth', route: 'Rotterdam → Hamburg', eta: 'Arrived', emissions: '180 tCO2', risk: 'low' },
  { name: 'MV CORREDORA DO SUL', imo: '9512334', status: 'En Route', route: 'Paranaguá → Antwerp', eta: '18 Sep', emissions: '3,210 tCO2', risk: 'high' },
];

function MiniBarChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map(d => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-sm bg-cyan-500/40 hover:bg-cyan-500/70 transition-colors"
            style={{ height: `${(d.value / max) * 100}%` }}
            title={`${d.value} tCO2e`}
          />
          <span className="text-[9px] text-neutral-500">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function RiskBadge({ risk }: { risk: 'low' | 'high' | 'medium' }) {
  const map = {
    low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded border font-medium uppercase tracking-wider ${map[risk]}`}>
      {risk === 'high' ? '⚠ ETS Risk' : '✓ Compliant'}
    </span>
  );
}

export function Overview() {
  const [apiStatus, setApiStatus] = useState<'API UNAVAILABLE' | 'LIVE' | 'LOADING'>('LOADING');

  useEffect(() => {
    checkHealth().then(setApiStatus);
  }, []);

  const totalEmissions = MONTHLY_EMISSIONS.reduce((sum, d) => sum + d.value, 0);
  const etsExposure = Math.round(totalEmissions * 0.5 * 65); // 50% EU scope * €65/t

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader
        title="Intelligence Overview"
        subtitle="MARITIME & REGULATORY INTELLIGENCE"
        status="demo"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">

        {/* KPI Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="Active Voyages"
            value="3"
            status="demo"
            subtitle="2 en route · 1 at berth"
            icon={<Ship size={16} className="text-cyan-400" />}
          />
          <MetricCard
            title="Tracked Vessels"
            value="3"
            status="demo"
            subtitle="Fleet · DEMO DATA"
            icon={<Anchor size={16} className="text-cyan-400" />}
          />
          <MetricCard
            title="Regulatory Alerts"
            value="1"
            status="demo"
            subtitle="1 high ETS risk voyage"
            icon={<AlertTriangle size={16} className="text-amber-400" />}
          />
          <MetricCard
            title="System Status"
            value={apiStatus === 'LOADING' ? '...' : apiStatus}
            status={apiStatus === 'LIVE' ? 'live' : apiStatus === 'LOADING' ? 'loading' : 'error'}
            subtitle={apiStatus === 'API UNAVAILABLE' ? 'BACKEND OFFLINE' : 'BACKEND CONNECTED'}
            icon={<Activity size={16} className="text-emerald-400" />}
          />
        </section>

        {/* Emissions + Compliance Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Emissions Chart */}
          <div className="col-span-2 border border-border-default rounded-xl p-6 bg-bg-panel">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider">Fleet Emissions — 2026</h3>
                <p className="text-xs text-text-muted mt-1">Total: <span className="text-cyan-400 font-semibold">{totalEmissions.toLocaleString()} tCO2e</span> · YTD</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-medium uppercase tracking-wider">DEMO DATA</span>
            </div>
            <MiniBarChart data={MONTHLY_EMISSIONS} />
          </div>

          {/* EU ETS Exposure */}
          <div className="border border-border-default rounded-xl p-6 bg-bg-panel flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider flex items-center gap-2">
              <Leaf size={14} className="text-emerald-400" /> EU ETS Exposure
            </h3>
            <div>
              <p className="text-3xl font-bold text-amber-400">€{(etsExposure / 1000).toFixed(1)}K</p>
              <p className="text-xs text-text-muted mt-1">Est. allowances needed · @€65/t</p>
            </div>
            <div className="mt-auto">
              <div className="text-xs text-text-muted mb-1">Coverage progress</div>
              <div className="h-1.5 w-full bg-white/5 rounded-full">
                <div className="h-1.5 w-[22%] bg-amber-500 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-text-muted mt-1">
                <span>22% covered</span>
                <span>78% gap</span>
              </div>
            </div>
            <a href="/eu-ets" className="text-xs text-cyan-400 hover:underline mt-1">Open ETS Calculator →</a>
          </div>
        </section>

        {/* Fleet Table */}
        <section className="border border-border-default rounded-xl bg-bg-panel overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-border-subtle">
            <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider">Active Fleet</h3>
            <span className="text-[10px] px-2 py-1 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-medium uppercase tracking-wider">DEMO DATA</span>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-sidebar border-b border-border-subtle text-text-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Vessel</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Route</th>
                <th className="px-6 py-3 font-medium">ETA</th>
                <th className="px-6 py-3 font-medium">YTD Emissions</th>
                <th className="px-6 py-3 font-medium">ETS Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {FLEET_DEMO.map(v => (
                <tr key={v.imo} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-base">{v.name}</div>
                    <div className="text-xs text-text-muted">IMO {v.imo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${v.status === 'En Route' ? 'text-emerald-400' : 'text-text-muted'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${v.status === 'En Route' ? 'bg-emerald-400 animate-pulse' : 'bg-text-muted'}`} />
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted text-xs">{v.route}</td>
                  <td className="px-6 py-4 text-text-muted text-xs">{v.eta}</td>
                  <td className="px-6 py-4 font-mono text-xs text-cyan-300">{v.emissions}</td>
                  <td className="px-6 py-4"><RiskBadge risk={v.risk as 'low' | 'high'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Data Sources Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="EU ETS Exposure" value={`€${(etsExposure / 1000).toFixed(1)}K`} status="demo" subtitle="Estimated · @€65/t EUA" />
          <MetricCard title="FuelEU Compliance" value="73%" status="demo" subtitle="GHG Intensity vs 2025 target" />
          <MetricCard title="Evidence Objects" value="3" status="demo" subtitle="SHA-256 verified records" icon={<Database size={14} className="text-cyan-400" />} />
          <MetricCard title="Decarbonization Gap" value="−12%" status="demo" subtitle="vs IMO 2030 target" icon={<TrendingDown size={14} className="text-amber-400" />} />
        </section>

      </div>
    </div>
  );
}

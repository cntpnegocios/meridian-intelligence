import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Anchor, Ship, AlertTriangle, Wind, TrendingDown, Activity } from 'lucide-react';

// ── Demo Port Data — Port of Santos ───────────────────────────
const PORT = { name: 'Port of Santos', code: 'BRSSZ', country: 'Brazil', lat: -23.95, lon: -46.32 };

const VESSEL_CALLS = [
  { mmsi: '219019216', name: 'MV MERIDIAN PIONEER', flag: '🇧🇷', type: 'Bulk Carrier', dwt: 85000, eta: 'Arrived 2h ago', status: 'BERTH', emissions_voyage: 2523, eeoi: 8.5, fuel: 'HFO', risk: 'MEDIUM' },
  { mmsi: '538006765', name: 'MSC AURORA', flag: '🇵🇦', type: 'Container Ship', dwt: 140000, eta: 'ETA 14:30 UTC', status: 'INBOUND', emissions_voyage: 4120, eeoi: 12.1, fuel: 'VLSFO', risk: 'HIGH' },
  { mmsi: '636018241', name: 'CORREDORA DO SUL', flag: '🇧🇷', type: 'Tanker', dwt: 60000, eta: 'Departing 16:00', status: 'OUTBOUND', emissions_voyage: 1890, eeoi: 7.2, fuel: 'LNG', risk: 'LOW' },
  { mmsi: '477213100', name: 'ASIA FORTUNE', flag: '🇨🇳', type: 'Bulk Carrier', dwt: 95000, eta: 'ETA Tomorrow 08:00', status: 'INBOUND', emissions_voyage: 3340, eeoi: 9.8, fuel: 'HFO', risk: 'MEDIUM' },
];

const MONTHLY_PORT_EMISSIONS = [
  { month: 'Mar', value: 12400 }, { month: 'Apr', value: 15800 }, { month: 'May', value: 13200 },
  { month: 'Jun', value: 18900 }, { month: 'Jul', value: 14300 }, { month: 'Aug', value: 9100 },
];
const TOTAL_PORT_CO2 = MONTHLY_PORT_EMISSIONS.reduce((s, m) => s + m.value, 0);

const RISK_STYLES: Record<string, string> = {
  LOW: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  MEDIUM: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  HIGH: 'text-red-400 bg-red-500/10 border-red-500/20',
};
const STATUS_DOT: Record<string, string> = {
  BERTH: 'bg-emerald-400',
  INBOUND: 'bg-cyan-400 animate-pulse',
  OUTBOUND: 'bg-amber-400',
};

function MiniBar({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map(d => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-sm bg-blue-500/30 hover:bg-blue-500/60 transition-colors"
            style={{ height: `${(d.value / max) * 100}%` }} title={`${d.value.toLocaleString()} tCO2`} />
          <span className="text-[9px] text-neutral-500">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

export function PortDashboard() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader
        title={`${PORT.name} — Port Intelligence`}
        subtitle={`${PORT.code} · GREEN PORT PROGRAMME`}
        status="demo"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">

        {/* KPI Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="Vessels in Port / Inbound"
            value={`${VESSEL_CALLS.filter(v => v.status !== 'OUTBOUND').length} / ${VESSEL_CALLS.length}`}
            status="demo"
            subtitle="Active traffic · DEMO"
            icon={<Ship size={14} className="text-cyan-400" />}
          />
          <MetricCard
            title="YTD Port Emissions"
            value={`${(TOTAL_PORT_CO2 / 1000).toFixed(0)}K tCO2`}
            status="demo"
            subtitle="Declared voyage emissions on arrival"
            icon={<Activity size={14} className="text-text-muted" />}
          />
          <MetricCard
            title="High-Risk Vessels"
            value={VESSEL_CALLS.filter(v => v.risk === 'HIGH').length.toString()}
            status="demo"
            subtitle="Above Green Port threshold"
            icon={<AlertTriangle size={14} className="text-red-400" />}
          />
          <MetricCard
            title="Green Berth Priority"
            value="LNG / Methanol"
            status="demo"
            subtitle="Low-emission vessels get priority"
            icon={<Wind size={14} className="text-emerald-400" />}
          />
        </section>

        {/* Emissions Chart + Ranking */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 border border-border-default rounded-xl p-6 bg-bg-panel">
            <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider mb-1">Monthly Port Emissions</h3>
            <p className="text-xs text-text-muted mb-4">Declared CO2 from all vessel calls — 2026 YTD</p>
            <MiniBar data={MONTHLY_PORT_EMISSIONS} />
          </div>
          <div className="border border-border-default rounded-xl p-6 bg-bg-panel">
            <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingDown size={14} className="text-emerald-400" /> Green Ranking
            </h3>
            <div className="flex flex-col gap-2">
              {[...VESSEL_CALLS].sort((a, b) => a.eeoi - b.eeoi).map((v, i) => (
                <div key={v.mmsi} className="flex items-center gap-3 py-2 border-b border-border-subtle last:border-0">
                  <span className={`text-lg font-bold w-6 ${i === 0 ? 'text-emerald-400' : i === 1 ? 'text-cyan-400' : 'text-text-muted'}`}>
                    #{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-base truncate">{v.name}</p>
                    <p className="text-[10px] text-text-muted">{v.fuel} · {v.eeoi} gCO2/t·nm</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${RISK_STYLES[v.risk]}`}>{v.risk}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vessel Calls Table */}
        <section className="border border-border-default rounded-xl bg-bg-panel overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
            <div>
              <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider">Traffic Monitor — Active Calls</h3>
              <p className="text-xs text-text-muted mt-0.5">Geofence: {PORT.lat}°S, {Math.abs(PORT.lon)}°W · radius 10 NM</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Geofence Active</span>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-sidebar border-b border-border-subtle text-text-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Vessel</th>
                <th className="px-6 py-3 font-medium">Type / DWT</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">ETA / ETD</th>
                <th className="px-6 py-3 font-medium">Voyage CO2</th>
                <th className="px-6 py-3 font-medium">EEOI</th>
                <th className="px-6 py-3 font-medium">Fuel</th>
                <th className="px-6 py-3 font-medium">Green Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {VESSEL_CALLS.map(v => (
                <tr key={v.mmsi} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-base text-xs">{v.flag} {v.name}</div>
                    <div className="text-[10px] text-text-muted">MMSI {v.mmsi}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-text-muted">
                    {v.type}<br />{v.dwt.toLocaleString()} DWT
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${v.status === 'BERTH' ? 'text-emerald-400' : v.status === 'INBOUND' ? 'text-cyan-400' : 'text-amber-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[v.status]}`} />
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-text-muted">{v.eta}</td>
                  <td className="px-6 py-4 font-mono text-xs text-cyan-300">{v.emissions_voyage.toLocaleString()} tCO2</td>
                  <td className="px-6 py-4 font-mono text-xs text-text-base">{v.eeoi}</td>
                  <td className="px-6 py-4 text-xs text-text-muted">{v.fuel}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${RISK_STYLES[v.risk]}`}>{v.risk}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="text-xs text-text-muted border border-border-subtle rounded-lg p-3 bg-bg-panel">
          <Anchor size={11} className="inline mr-1" />
          <strong>Port Intelligence</strong> — Data sourced from Spire S-AIS and declared MRV reports. Vessel CO2 data is the declared voyage emission. Green Port ranking is based on EEOI (Energy Efficiency Operational Indicator). For authoritative data, consult the Evidence Vault.
        </div>

      </div>
    </div>
  );
}

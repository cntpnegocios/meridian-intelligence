import { Link } from 'react-router-dom';
import { Leaf, Scale, Zap, Ship, ArrowRight } from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from '../components/ui/PageHeader';

interface Vessel {
  name: string;
  imo: string;
  route: string;
  flag: string;
  flagEmoji: string;
  type: string;
  status: 'IN TRANSIT' | 'IN PORT' | 'DEPARTING';
  eeoi: string;
  fuel: string;
  co2: string;
  etsCost: string;
}

const vessels: Vessel[] = [
  {
    name: 'MV MERIDIAN PIONEER',
    imo: '9876543',
    route: 'Santos → Rotterdam',
    flag: 'Brazil',
    flagEmoji: '🇧🇷',
    type: 'Bulk Carrier',
    status: 'IN TRANSIT',
    eeoi: '8.5',
    fuel: 'HFO',
    co2: '2,523',
    etsCost: '€41,130'
  },
  {
    name: 'MSC AURORA',
    imo: '9234567',
    route: 'Hamburg → Antwerp',
    flag: 'Panama',
    flagEmoji: '🇵🇦',
    type: 'Container',
    status: 'IN PORT',
    eeoi: '12.1',
    fuel: 'VLSFO',
    co2: '4,120',
    etsCost: '€67,160'
  },
  {
    name: 'CORREDORA DO SUL',
    imo: '9345678',
    route: 'Paranaguá → Rotterdam',
    flag: 'Brazil',
    flagEmoji: '🇧🇷',
    type: 'Tanker',
    status: 'DEPARTING',
    eeoi: '7.2',
    fuel: 'LNG',
    co2: '1,890',
    etsCost: '€30,820'
  }
];

const monthlyEmissions = [
  { month: 'Mar', value: 2100 },
  { month: 'Apr', value: 3200 },
  { month: 'May', value: 2800 },
  { month: 'Jun', value: 4100 },
  { month: 'Jul', value: 3400 },
  { month: 'Aug', value: 2523 }
];

const maxEmission = Math.max(...monthlyEmissions.map(e => e.value));

function getStatusColor(status: Vessel['status']): string {
  switch (status) {
    case 'IN TRANSIT':
      return 'text-brand-primary';
    case 'IN PORT':
      return 'text-emerald-400';
    case 'DEPARTING':
      return 'text-accent-demo';
  }
}

function getStatusDotClass(status: Vessel['status']): string {
  switch (status) {
    case 'IN TRANSIT':
      return 'bg-brand-primary animate-pulse';
    case 'IN PORT':
      return 'bg-emerald-400';
    case 'DEPARTING':
      return 'bg-accent-demo';
  }
}

export function Overview() {
  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="mx-auto max-w-[1600px] space-y-8">
        <PageHeader
          title="Fleet Intelligence"
          subtitle="OPERATOR CONTROL TOWER"
          status="demo"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Fleet Emissions YTD"
            value="9,175 tCO2e"
            subtitle="12% reduction vs last year"
            status="demo"
            icon={<Leaf size={16} />}
            trend={{ value: '-12%', direction: 'down' }}
          />
          <MetricCard
            title="EU ETS Exposure"
            value="€149,580"
            subtitle="8% increase in fuel cost"
            status="demo"
            icon={<Scale size={16} />}
            trend={{ value: '+8%', direction: 'up' }}
          />
          <MetricCard
            title="FuelEU Score"
            value="62/100"
            subtitle="2025 target: 89.3 gCO2eq/MJ"
            status="demo"
            icon={<Zap size={16} />}
          />
          <MetricCard
            title="Active Voyages"
            value="3"
            subtitle="2 inbound EU, 1 outbound"
            status="demo"
            icon={<Ship size={16} />}
          />
        </div>

        <div className="rounded-lg border border-border-default bg-bg-panel">
          <div className="border-b border-border-subtle px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-base">Fleet Overview</h2>
              <Badge variant="demo">Demo Data</Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Vessel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    IMO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Flag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    EEOI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Fuel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    CO2 (voyage)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    ETS Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {vessels.map((vessel) => (
                  <tr key={vessel.imo} className="hover:bg-bg-sidebar transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-text-base">
                      {vessel.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted font-mono">
                      {vessel.imo}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-base">
                      {vessel.route}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      <span className="mr-1">{vessel.flagEmoji}</span>
                      {vessel.flag}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {vessel.type}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusDotClass(vessel.status)}`} />
                        <span className={`font-medium ${getStatusColor(vessel.status)}`}>
                          {vessel.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-text-base">
                      {vessel.eeoi} <span className="text-text-muted text-xs">gCO2/t·nm</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {vessel.fuel}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-text-base">
                      {vessel.co2} <span className="text-text-muted text-xs">tCO2</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-text-base">
                      {vessel.etsCost}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        to="/voyage-intelligence"
                        className="inline-flex items-center gap-1 text-brand-primary hover:text-brand-primary/80 transition-colors"
                      >
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-lg border border-border-default bg-bg-panel p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-base">
                Monthly CO₂ Emissions — 2026 YTD
              </h2>
              <Badge variant="demo">Demo Data</Badge>
            </div>
            <div className="flex items-end justify-between gap-4 h-64">
              {monthlyEmissions.map((item) => {
                const heightPercentage = (item.value / maxEmission) * 100;
                return (
                  <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="text-sm font-mono text-text-base">
                      {item.value.toLocaleString()}
                    </div>
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full bg-brand-primary hover:opacity-80 transition-opacity rounded-t"
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </div>
                    <div className="text-xs font-medium text-text-muted">
                      {item.month}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-xs text-text-muted text-center">
              tCO2 emissions per month
            </div>
          </div>

          <div className="rounded-lg border border-border-default bg-bg-panel p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-base">
                EU ETS — 2026 Exposure
              </h2>
              <Badge variant="demo">Demo Data</Badge>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-text-base">€149,580</div>
                <div className="text-sm text-text-muted mt-1">Total ETS liability</div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-muted">Annual budget utilization</span>
                  <span className="font-mono text-text-base">70%</span>
                </div>
                <div className="h-2 bg-bg-sidebar rounded-full overflow-hidden">
                  <div className="h-full bg-accent-demo" style={{ width: '70%' }} />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border-subtle">
                <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  Vessel Breakdown
                </div>
                {vessels.map((vessel) => (
                  <div key={vessel.imo} className="flex items-center justify-between text-sm">
                    <span className="text-text-muted truncate">{vessel.name}</span>
                    <span className="font-mono text-text-base ml-2">{vessel.etsCost}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border-subtle space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Current EUA price</span>
                  <span className="font-mono text-text-base">€65/tCO2</span>
                </div>
                <div className="text-xs text-text-muted leading-relaxed">
                  Phase-in: 100% (2026) · EU+non-EU voyages: 50% scope
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border-default bg-bg-panel p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-base">
              Decarbonization Gap — IMO 2030 Target
            </h2>
            <Badge variant="demo">Demo Data</Badge>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-text-muted mb-1">Current Fleet EEOI</div>
                <div className="text-2xl font-bold text-text-base">
                  9.3 <span className="text-sm font-normal text-text-muted">gCO2/t·nm</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-text-muted mb-1">IMO 2030 Target</div>
                <div className="text-2xl font-bold text-brand-primary">
                  6.1 <span className="text-sm font-normal text-text-muted">gCO2/t·nm</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-text-muted mb-1">Gap to Close</div>
                <div className="text-2xl font-bold text-accent-danger">
                  −3.2 <span className="text-sm font-normal text-text-muted">gCO2/t·nm (−34%)</span>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-text-muted mb-2">
                <span>0</span>
                <span>IMO 2030 target: 6.1</span>
                <span>Current: 9.3</span>
              </div>
              <div className="relative h-3 rounded-full bg-bg-base border border-border-subtle overflow-hidden">
                {/* Target marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-brand-primary z-10"
                  style={{ left: `${(6.1 / 14) * 100}%` }}
                />
                {/* Current fill */}
                <div
                  className="h-full rounded-full bg-accent-danger/60 transition-all"
                  style={{ width: `${(9.3 / 14) * 100}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-3">
                Fleet must reduce average EEOI by 34% to meet IMO 2030 −40% pathway.
                Current trajectory requires fuel switching or operational efficiency gains.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

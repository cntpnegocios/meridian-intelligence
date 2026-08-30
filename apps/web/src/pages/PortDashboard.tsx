import { Ship, Anchor, TrendingUp, AlertTriangle } from 'lucide-react';

import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from '../components/ui/PageHeader';

interface VesselTraffic {
  mmsi: string;
  name: string;
  type: string;
  etaStatus: string;
  fuelType: string;
  eeoiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  portCO2Risk: 'Low' | 'Medium' | 'High';
  eta?: string;
  status?: string;
}

const vesselTrafficData: VesselTraffic[] = [
  {
    mmsi: '477824500',
    name: 'MSC GULSUN',
    type: 'Container Ship',
    etaStatus: 'In Port',
    fuelType: 'VLSFO',
    eeoiRating: 'C',
    portCO2Risk: 'High',
    status: 'Berthed'
  },
  {
    mmsi: '636019825',
    name: 'VALE BRASIL',
    type: 'Bulk Carrier',
    etaStatus: 'ETA 14:30 UTC',
    fuelType: 'LSMGO',
    eeoiRating: 'B',
    portCO2Risk: 'Medium',
    eta: '14:30 UTC'
  },
  {
    mmsi: '563872000',
    name: 'MAERSK ESSEX',
    type: 'Container Ship',
    etaStatus: 'In Port',
    fuelType: 'VLSFO',
    eeoiRating: 'D',
    portCO2Risk: 'High',
    status: 'Loading'
  },
  {
    mmsi: '229767000',
    name: 'CMA CGM ANTOINE DE SAINT EXUPERY',
    type: 'Container Ship',
    etaStatus: 'ETA 22:15 UTC',
    fuelType: 'LNG',
    eeoiRating: 'A',
    portCO2Risk: 'Low',
    eta: '22:15 UTC'
  },
  {
    mmsi: '371234000',
    name: 'PACIFIC EXPLORER',
    type: 'Tanker',
    etaStatus: 'In Port',
    fuelType: 'HFO',
    eeoiRating: 'E',
    portCO2Risk: 'High',
    status: 'Discharging'
  },
  {
    mmsi: '538009876',
    name: 'COSCO SHIPPING UNIVERSE',
    type: 'Container Ship',
    etaStatus: 'ETA 08:45 UTC',
    fuelType: 'VLSFO',
    eeoiRating: 'C',
    portCO2Risk: 'Medium',
    eta: '08:45 UTC'
  },
  {
    mmsi: '255806720',
    name: 'ATLANTIC HARMONY',
    type: 'Bulk Carrier',
    etaStatus: 'In Port',
    fuelType: 'LSMGO',
    eeoiRating: 'B',
    portCO2Risk: 'Low',
    status: 'Anchored'
  },
  {
    mmsi: '636092345',
    name: 'IRON CHIEFTAIN',
    type: 'Bulk Carrier',
    etaStatus: 'ETA 16:00 UTC',
    fuelType: 'VLSFO',
    eeoiRating: 'C',
    portCO2Risk: 'Medium',
    eta: '16:00 UTC'
  }
];

function getRiskColor(risk: string): string {
  switch (risk) {
    case 'High':
      return 'text-[#d7b76c]';
    case 'Medium':
      return 'text-[#8da2b1]';
    case 'Low':
      return 'text-[#59bdb8]';
    default:
      return 'text-text-muted';
  }
}

function getRiskBgColor(risk: string): string {
  switch (risk) {
    case 'High':
      return 'bg-[#d7b76c]/10 border-[#d7b76c]/30';
    case 'Medium':
      return 'bg-[#8da2b1]/10 border-[#8da2b1]/30';
    case 'Low':
      return 'bg-[#59bdb8]/10 border-[#59bdb8]/30';
    default:
      return 'bg-bg-panel border-border-subtle';
  }
}

function getEEOIColor(rating: string): string {
  switch (rating) {
    case 'A':
      return 'text-[#59bdb8] bg-[#59bdb8]/10';
    case 'B':
      return 'text-[#59bdb8]/80 bg-[#59bdb8]/10';
    case 'C':
      return 'text-[#8da2b1] bg-[#8da2b1]/10';
    case 'D':
      return 'text-[#d7b76c] bg-[#d7b76c]/10';
    case 'E':
      return 'text-[#e07856] bg-[#e07856]/10';
    default:
      return 'text-text-muted bg-bg-panel';
  }
}

export function PortDashboard() {
  const vesselsInPort = vesselTrafficData.filter(v => v.status).length;
  const inbound24h = vesselTrafficData.filter(v => v.eta).length;
  const outbound24h = 3;
  const geofenceEmissions = 1847.3;

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <PageHeader
          title="Port Intelligence"
          subtitle="PORT OF SANTOS (BRSSZ)"
          status="demo"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Vessels in Port"
            value={vesselsInPort.toString()}
            subtitle="Currently berthed or anchored"
            status="demo"
            icon={<Anchor className="h-5 w-5" />}
          />
          <MetricCard
            title="Inbound (24h)"
            value={inbound24h.toString()}
            subtitle="Expected arrivals"
            status="demo"
            icon={<Ship className="h-5 w-5" />}
            trend={{ value: '12', direction: 'up' }}
          />
          <MetricCard
            title="Outbound (24h)"
            value={outbound24h.toString()}
            subtitle="Scheduled departures"
            status="demo"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: '8', direction: 'down' }}
          />
          <MetricCard
            title="Geofence Emissions"
            value={`${geofenceEmissions.toLocaleString()} tCO₂`}
            subtitle="Last 24 hours"
            status="demo"
            icon={<AlertTriangle className="h-5 w-5" />}
            trend={{ value: '15', direction: 'up' }}
          />
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text-base">
                Vessel Traffic Emissions
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Real-time emissions monitoring for port operations
              </p>
            </div>
            <Badge variant="demo">Demo Data</Badge>
          </div>

          <div className="overflow-hidden rounded-lg border border-border-default bg-bg-panel">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle bg-bg-sidebar">
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                      MMSI / Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                      ETA / Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                      Fuel Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                      EEOI Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                      Port CO₂ Risk
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {vesselTrafficData.map(vessel => (
                    <tr
                      key={vessel.mmsi}
                      className={`transition-colors hover:bg-bg-sidebar ${
                        vessel.portCO2Risk === 'High' ? 'bg-[#d7b76c]/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <a
                          href={`/vessel/${vessel.mmsi}`}
                          className="group block"
                        >
                          <div className="text-sm font-medium text-text-base group-hover:text-brand-primary">
                            {vessel.name}
                          </div>
                          <div className="mt-0.5 font-mono text-xs text-text-muted">
                            {vessel.mmsi}
                          </div>
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-base">
                          {vessel.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {vessel.status ? (
                          <div>
                            <div className="text-sm font-medium text-text-base">
                              {vessel.status}
                            </div>
                            <div className="mt-0.5 text-xs text-text-muted">
                              In Port
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-sm font-medium text-brand-primary">
                              {vessel.eta}
                            </div>
                            <div className="mt-0.5 text-xs text-text-muted">
                              Inbound
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-bg-sidebar px-2.5 py-1 text-xs font-medium text-text-base">
                          {vessel.fuelType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${getEEOIColor(
                            vessel.eeoiRating
                          )}`}
                        >
                          {vessel.eeoiRating}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 ${getRiskBgColor(
                            vessel.portCO2Risk
                          )}`}
                        >
                          {vessel.portCO2Risk === 'High' && (
                            <AlertTriangle className="h-3.5 w-3.5 text-[#d7b76c]" />
                          )}
                          <span
                            className={`text-sm font-medium ${getRiskColor(
                              vessel.portCO2Risk
                            )}`}
                          >
                            {vessel.portCO2Risk}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
            <div>
              Showing {vesselTrafficData.length} vessels
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#59bdb8]"></div>
                <span>Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#8da2b1]"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#d7b76c]"></div>
                <span>High Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

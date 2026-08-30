import { Package, Ship, TrendingDown, FileText, Download, MapPin, Calendar } from 'lucide-react';

import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from '../components/ui/PageHeader';

interface Shipment {
  bookingRef: string;
  vessel: string;
  route: string;
  cargoTons: number;
  co2Allocation: number;
  status: 'In Transit' | 'Delivered';
  departureDate: string;
  arrivalDate: string;
  isGreenCorridor: boolean;
}

const shipments: Shipment[] = [
  {
    bookingRef: 'BKG-2024-8821',
    vessel: 'MSC GÜLSÜN',
    route: 'Shanghai → Rotterdam',
    cargoTons: 2840,
    co2Allocation: 312.4,
    status: 'In Transit',
    departureDate: '2024-01-15',
    arrivalDate: '2024-02-18',
    isGreenCorridor: true,
  },
  {
    bookingRef: 'BKG-2024-8734',
    vessel: 'EVER GIVEN',
    route: 'Singapore → Hamburg',
    cargoTons: 1920,
    co2Allocation: 249.6,
    status: 'In Transit',
    departureDate: '2024-01-18',
    arrivalDate: '2024-02-22',
    isGreenCorridor: true,
  },
  {
    bookingRef: 'BKG-2024-8612',
    vessel: 'CMA CGM ANTOINE DE SAINT EXUPERY',
    route: 'Busan → Los Angeles',
    cargoTons: 3150,
    co2Allocation: 441.0,
    status: 'Delivered',
    departureDate: '2023-12-28',
    arrivalDate: '2024-01-14',
    isGreenCorridor: false,
  },
  {
    bookingRef: 'BKG-2024-8589',
    vessel: 'MAERSK ESSEX',
    route: 'Ningbo → Felixstowe',
    cargoTons: 2650,
    co2Allocation: 291.5,
    status: 'Delivered',
    departureDate: '2023-12-22',
    arrivalDate: '2024-01-26',
    isGreenCorridor: true,
  },
  {
    bookingRef: 'BKG-2024-8401',
    vessel: 'COSCO SHIPPING UNIVERSE',
    route: 'Qingdao → Antwerp',
    cargoTons: 4200,
    co2Allocation: 546.0,
    status: 'Delivered',
    departureDate: '2023-12-10',
    arrivalDate: '2024-01-15',
    isGreenCorridor: false,
  },
];

const totalShipments = shipments.length;
const totalCargo = shipments.reduce((sum, s) => sum + s.cargoTons, 0);
const totalCO2 = shipments.reduce((sum, s) => sum + s.co2Allocation, 0);
const avgIntensity = (totalCO2 / totalCargo) * 1000;

const greenCorridorShipments = shipments.filter(s => s.isGreenCorridor);
const greenCorridorCO2 = greenCorridorShipments.reduce((sum, s) => sum + s.co2Allocation, 0);
const greenCorridorCargo = greenCorridorShipments.reduce((sum, s) => sum + s.cargoTons, 0);
const greenCorridorIntensity = (greenCorridorCO2 / greenCorridorCargo) * 1000;

const conventionalShipments = shipments.filter(s => !s.isGreenCorridor);
const conventionalCO2 = conventionalShipments.reduce((sum, s) => sum + s.co2Allocation, 0);
const conventionalCargo = conventionalShipments.reduce((sum, s) => sum + s.cargoTons, 0);
const conventionalIntensity = (conventionalCO2 / conventionalCargo) * 1000;

const reductionPercentage = ((conventionalIntensity - greenCorridorIntensity) / conventionalIntensity) * 100;

function handleDownloadCertificate(bookingRef: string): void {
  console.log(`Downloading certificate for ${bookingRef}`);
}

export function ShipperPortal(): React.ReactNode {
  return (
    <div className="min-h-screen bg-bg-base p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <PageHeader
          title="Cargo Intelligence"
          subtitle="SHIPPER PORTAL - SCOPE 3"
          status="demo"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Shipments"
            value={totalShipments.toString()}
            subtitle="Active & Delivered"
            status="demo"
            icon={<Package size={16}/>}
          />
          <MetricCard
            title="Total Cargo"
            value={totalCargo.toLocaleString()}
            subtitle="metric tons"
            status="demo"
            icon={<Ship size={16}/>}
          />
          <MetricCard
            title="Scope 3 CO₂"
            value={totalCO2.toFixed(1)}
            subtitle="metric tons allocated"
            status="demo"
            icon={<TrendingDown size={16}/>}
          />
          <MetricCard
            title="Avg Intensity"
            value={avgIntensity.toFixed(1)}
            subtitle="gCO₂/ton·km"
            status="demo"
            icon={<FileText size={16}/>}
            trend={{ value: '-12.3', direction: 'down' }}
          />
        </div>

        <div className="rounded-lg border border-border-default bg-bg-panel">
          <div className="border-b border-border-subtle p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-base">Active Bookings & Shipments</h2>
                <p className="mt-1 text-sm text-text-muted">Track emissions allocation per booking</p>
              </div>
              <Badge variant="demo">Demo Data</Badge>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Booking Ref
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Vessel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Route
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                    Cargo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                    CO₂ Allocation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Certificate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {shipments.map((shipment) => (
                  <tr key={shipment.bookingRef} className="hover:bg-bg-sidebar/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-medium text-text-base">
                          {shipment.bookingRef}
                        </span>
                        {shipment.isGreenCorridor && (
                          <span className="mt-1 inline-flex items-center gap-1 text-xs text-brand-primary">
                            <TrendingDown className="h-3 w-3" />
                            Green Corridor
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ship className="h-4 w-4 text-text-muted" />
                        <span className="text-sm text-text-base">{shipment.vessel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-text-muted" />
                        <span className="text-sm text-text-base">{shipment.route}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-text-base">
                        {shipment.cargoTons.toLocaleString()}
                      </span>
                      <span className="ml-1 text-xs text-text-muted">tons</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-text-base">
                        {shipment.co2Allocation.toFixed(1)}
                      </span>
                      <span className="ml-1 text-xs text-text-muted">tCO₂</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {shipment.status === 'In Transit' ? (
                          <Badge variant="live">In Transit</Badge>
                        ) : (
                          <Badge variant="demo">Delivered</Badge>
                        )}
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Calendar className="h-3 w-3" />
                          {shipment.status === 'In Transit' ? (
                            <span>ETA {shipment.arrivalDate}</span>
                          ) : (
                            <span>Arrived {shipment.arrivalDate}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDownloadCertificate(shipment.bookingRef)}
                        className="inline-flex items-center gap-2 rounded-md border border-border-default bg-bg-sidebar px-3 py-1.5 text-sm font-medium text-text-base transition-colors hover:border-brand-primary hover:text-brand-primary"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-border-default bg-bg-panel">
          <div className="border-b border-border-subtle p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-base">Decarbonization Impact</h2>
                <p className="mt-1 text-sm text-text-muted">
                  Scope 3 emissions reduction through Green Corridor adoption
                </p>
              </div>
              <Badge variant="demo">Demo Data</Badge>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-lg border border-border-subtle bg-bg-sidebar p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">Green Corridor Routes</span>
                    <span className="text-2xl font-bold text-brand-primary">
                      {greenCorridorShipments.length}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-text-muted">
                    {greenCorridorCargo.toLocaleString()} tons · {greenCorridorCO2.toFixed(1)} tCO₂
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-text-base">
                      {greenCorridorIntensity.toFixed(1)}
                    </span>
                    <span className="text-xs text-text-muted">gCO₂/ton·km</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border-subtle bg-bg-sidebar p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">Conventional Routes</span>
                    <span className="text-2xl font-bold text-text-base">
                      {conventionalShipments.length}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-text-muted">
                    {conventionalCargo.toLocaleString()} tons · {conventionalCO2.toFixed(1)} tCO₂
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-text-base">
                      {conventionalIntensity.toFixed(1)}
                    </span>
                    <span className="text-xs text-text-muted">gCO₂/ton·km</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-lg border border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-brand-primary/10 p-3">
                    <TrendingDown className="h-8 w-8 text-brand-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-muted">Emissions Reduction</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-brand-primary">
                        {reductionPercentage.toFixed(1)}%
                      </span>
                      <span className="text-sm text-text-muted">lower intensity</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

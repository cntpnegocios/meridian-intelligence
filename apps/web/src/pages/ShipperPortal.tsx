import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { Package, Leaf, Download, QrCode, TrendingDown } from 'lucide-react';

// ── Demo Shipper Data ─────────────────────────────────────────
const SHIPPER_COMPANY = 'Vale S.A.';
const BOOKINGS = [
  {
    id: 'BK-2026-0234',
    vessel: 'MV MERIDIAN PIONEER',
    route: 'Santos (BRSSZ) → Rotterdam (NLRTM)',
    date: '2026-08-15',
    cargo_tons: 42000,
    cargo_type: 'Iron Ore',
    distance_nm: 5400,
    co2_tons: 2523.3,
    co2_per_ton: 0.0601,
    scope3_category: 'Scope 3 Cat. 4 (Upstream Transport)',
    methodology: 'ISO 14083:2023 / IMO DCS',
    status: 'VERIFIED',
    ets_cost_share: 41_130,
  },
  {
    id: 'BK-2026-0198',
    vessel: 'MV ATLANTIC STAR',
    route: 'Vitória (BRVIX) → Hamburg (DEHAM)',
    date: '2026-07-28',
    cargo_tons: 65000,
    cargo_type: 'Pellets',
    distance_nm: 5800,
    co2_tons: 3101.2,
    co2_per_ton: 0.0477,
    scope3_category: 'Scope 3 Cat. 4 (Upstream Transport)',
    methodology: 'ISO 14083:2023 / IMO DCS',
    status: 'DEMO',
    ets_cost_share: 50_570,
  },
  {
    id: 'BK-2026-0121',
    vessel: 'MV CORREDORA DO SUL',
    route: 'Paranaguá (BRPNG) → Antwerp (BEANR)',
    date: '2026-06-10',
    cargo_tons: 78000,
    cargo_type: 'Soy',
    distance_nm: 5700,
    co2_tons: 3550.8,
    co2_per_ton: 0.0456,
    scope3_category: 'Scope 3 Cat. 4 (Upstream Transport)',
    methodology: 'ISO 14083:2023 / IMO DCS',
    status: 'DEMO',
    ets_cost_share: 57_880,
  },
];

const TOTAL_CO2 = BOOKINGS.reduce((s, b) => s + b.co2_tons, 0);
const TOTAL_ETS = BOOKINGS.reduce((s, b) => s + b.ets_cost_share, 0);
const AVG_INTENSITY = BOOKINGS.reduce((s, b) => s + b.co2_per_ton, 0) / BOOKINGS.length;

function CertBadge({ status }: { status: string }) {
  return <Badge variant={status === 'VERIFIED' ? 'live' : 'demo'}>{status}</Badge>;
}

export function ShipperPortal() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader
        title="Shipper Intelligence"
        subtitle={`${SHIPPER_COMPANY} · CARGO CARBON FOOTPRINT`}
        status="demo"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">

        {/* KPI Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="YTD Cargo Emissions"
            value={`${(TOTAL_CO2 / 1000).toFixed(1)}K tCO2e`}
            status="demo"
            subtitle="Scope 3 Cat. 4 — ISO 14083"
            icon={<Leaf size={14} className="text-emerald-400" />}
          />
          <MetricCard
            title="Avg. Emission Intensity"
            value={`${(AVG_INTENSITY * 1000).toFixed(1)} kg/t`}
            status="demo"
            subtitle="CO2 per tonne of cargo"
            trend={{ value: '–8% vs last year', direction: 'down' }}
          />
          <MetricCard
            title="ETS Cost Attributable"
            value={`€${(TOTAL_ETS / 1000).toFixed(0)}K`}
            status="demo"
            subtitle="Cargo's share of operator ETS cost"
            icon={<TrendingDown size={14} className="text-amber-400" />}
          />
          <MetricCard
            title="Shipments Certified"
            value={`1 / ${BOOKINGS.length}`}
            status="demo"
            subtitle="ISO 14083 verified records"
            icon={<Package size={14} className="text-cyan-400" />}
          />
        </section>

        {/* Booking Table */}
        <section className="border border-border-default rounded-xl bg-bg-panel overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
            <div>
              <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider">Cargo Bookings — Carbon Footprint</h3>
              <p className="text-xs text-text-muted mt-0.5">Methodology: ISO 14083:2023 · IMO DCS · EU MRV</p>
            </div>
            <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors font-medium">
              <Download size={12} /> Export ESG Report
            </button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-sidebar border-b border-border-subtle text-text-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Booking ID</th>
                <th className="px-6 py-3 font-medium">Route</th>
                <th className="px-6 py-3 font-medium">Cargo (t)</th>
                <th className="px-6 py-3 font-medium">CO2 Total</th>
                <th className="px-6 py-3 font-medium">CO2 / Tonne</th>
                <th className="px-6 py-3 font-medium">ETS Share</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {BOOKINGS.map(b => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-text-base">{b.id}</div>
                    <div className="text-[10px] text-text-muted">{b.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-text-base">{b.route}</div>
                    <div className="text-[10px] text-text-muted">{b.vessel} · {b.distance_nm.toLocaleString()} NM</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-text-base">{b.cargo_tons.toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono text-xs text-cyan-300">{b.co2_tons.toLocaleString()} tCO2</td>
                  <td className="px-6 py-4 font-mono text-xs text-text-base">{(b.co2_per_ton * 1000).toFixed(1)} kg/t</td>
                  <td className="px-6 py-4 font-mono text-xs text-amber-400">€{b.ets_cost_share.toLocaleString()}</td>
                  <td className="px-6 py-4"><CertBadge status={b.status} /></td>
                  <td className="px-6 py-4">
                    <a
                      href={`/public/voyage/${b.id.toLowerCase()}`}
                      className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                    >
                      <QrCode size={11} /> View Public
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Green Freight Certificate Demo */}
        <section className="border border-emerald-500/20 rounded-xl bg-bg-panel overflow-hidden">
          <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center justify-between bg-emerald-500/5">
            <div className="flex items-center gap-3">
              <Leaf size={18} className="text-emerald-400" />
              <div>
                <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Green Freight Certificate</h3>
                <p className="text-xs text-text-muted">Booking BK-2026-0234 · Verified by MeridianMRV</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="live">VERIFIED</Badge>
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 transition-colors">
                <Download size={11} /> Download PDF
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 text-sm">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Shipper</p>
              <p className="font-semibold text-text-base">{SHIPPER_COMPANY}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Route</p>
              <p className="font-semibold text-text-base">Santos → Rotterdam</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">CO2 Attributable</p>
              <p className="font-semibold text-emerald-300">2,523.3 tCO2e</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Methodology</p>
              <p className="font-semibold text-text-base">ISO 14083:2023</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">SHA-256</p>
              <p className="font-mono text-[10px] text-cyan-300">a3f82b...d9c411</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Evidence ID</p>
              <p className="font-mono text-xs text-text-base">EVD-2026-0234-001</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Scope Category</p>
              <p className="font-semibold text-text-base">Scope 3 Cat. 4</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Public URL</p>
              <a href="/public/voyage/bk-2026-0234" className="text-xs text-cyan-400 hover:underline font-mono">meridian.io/v/bk-0234</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

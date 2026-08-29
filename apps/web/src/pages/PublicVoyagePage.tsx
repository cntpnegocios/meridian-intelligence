import { Badge } from '../components/ui/Badge';
import { Shield, MapPin, Leaf, Hash, Calendar, Ship, ExternalLink, CheckCircle } from 'lucide-react';

// ── Public Voyage Record ──────────────────────────────────────
// This page is intentionally accessible without authentication.
// It demonstrates anti-greenwashing transparency.

const VOYAGE = {
  id: 'VOY-2026-0234',
  vessel_name: 'MV MERIDIAN PIONEER',
  imo: '9876543',
  flag: 'Brazil',
  operator: 'Meridian Shipping Ltda.',
  route: 'Port of Santos, Brazil → Port of Rotterdam, Netherlands',
  departure: '2026-08-15T10:00:00Z',
  arrival_est: '2026-09-12T08:00:00Z',
  distance_nm: 5400,
  cargo_type: 'Iron Ore',
  cargo_tons: 42000,
  fuel_type: 'HFO (Heavy Fuel Oil)',
  fuel_consumed_tons: 810,
  co2_tons: 2523.3,
  co2_intensity_kg_per_ton: 60.1,
  methodology: 'ISO 14083:2023 · IMO DCS',
  evidence_id: 'EVD-2026-0234-001',
  sha256: 'a3f82bc9d1e4f67a2b8c3d5e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
  ais_observations: 47,
  sar_validations: 3,
  evidence_status: 'VERIFIED',
  promoted_at: '2026-08-20T14:32:11Z',
  verifier: 'MeridianMRV Core Engine v2.1.0',
};

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1 font-medium">{label}</p>
      <p className={`text-sm text-neutral-100 font-medium ${mono ? 'font-mono text-cyan-300 break-all text-xs' : ''}`}>{value}</p>
    </div>
  );
}

export function PublicVoyagePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Shield size={14} className="text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-neutral-100">MERIDIAN</span>
              <span className="text-xs tracking-widest text-cyan-400 ml-1 font-semibold">MRV</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="live" className="px-3 py-1 text-xs">
              <CheckCircle size={10} className="mr-1 inline" /> VERIFIED RECORD
            </Badge>
            <span className="text-xs text-neutral-500">Public Transparency Portal</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">

        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Ship size={20} className="text-cyan-400" />
            <h1 className="text-2xl font-bold text-neutral-100">{VOYAGE.vessel_name}</h1>
            <span className="text-xs px-2 py-1 bg-neutral-800 rounded text-neutral-400 font-mono">IMO {VOYAGE.imo}</span>
          </div>
          <p className="text-sm text-neutral-400 flex items-center gap-2">
            <MapPin size={13} className="text-cyan-400" />
            {VOYAGE.route}
          </p>
          <p className="text-xs text-neutral-500">{VOYAGE.operator} · {VOYAGE.flag}</p>
        </div>

        {/* Verification Banner */}
        <div className="flex items-start gap-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl p-5">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <CheckCircle size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-emerald-300 text-sm">This voyage record has been independently verified</p>
            <p className="text-xs text-neutral-400 mt-1">
              Verified by <strong className="text-neutral-300">{VOYAGE.verifier}</strong> on {new Date(VOYAGE.promoted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
              Evidence hash is immutably stored in the MeridianMRV Core registry.
            </p>
          </div>
        </div>

        {/* Emissions Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Leaf size={16} className="text-emerald-400" />, label: 'CO2 Emitted', value: `${VOYAGE.co2_tons.toLocaleString()} tCO2e`, sub: VOYAGE.methodology },
            { icon: <Ship size={16} className="text-cyan-400" />, label: 'Cargo Transported', value: `${VOYAGE.cargo_tons.toLocaleString()} t`, sub: VOYAGE.cargo_type },
            { icon: <MapPin size={16} className="text-blue-400" />, label: 'Distance', value: `${VOYAGE.distance_nm.toLocaleString()} NM`, sub: 'Santos → Rotterdam' },
            { icon: <Leaf size={16} className="text-amber-400" />, label: 'CO2 per Tonne', value: `${VOYAGE.co2_intensity_kg_per_ton} kg/t`, sub: 'Carbon intensity' },
          ].map((card) => (
            <div key={card.label} className="border border-neutral-800 rounded-xl p-5 bg-neutral-900 flex flex-col gap-2">
              {card.icon}
              <p className="text-xs text-neutral-500 uppercase tracking-wider">{card.label}</p>
              <p className="text-xl font-bold text-neutral-100">{card.value}</p>
              <p className="text-[10px] text-neutral-600">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Voyage Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900">
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar size={14} className="text-cyan-400" /> Voyage Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Departure" value={new Date(VOYAGE.departure).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} />
              <Field label="Est. Arrival" value={new Date(VOYAGE.arrival_est).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} />
              <Field label="Fuel Type" value={VOYAGE.fuel_type} />
              <Field label="Fuel Consumed" value={`${VOYAGE.fuel_consumed_tons.toLocaleString()} tonnes`} />
              <Field label="Calculation Methodology" value={VOYAGE.methodology} />
              <Field label="AIS Observations" value={`${VOYAGE.ais_observations} fixes · ${VOYAGE.sar_validations} SAR`} />
            </div>
          </div>

          <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900">
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Hash size={14} className="text-violet-400" /> Evidence & Traceability
            </h3>
            <div className="flex flex-col gap-4">
              <Field label="Evidence ID" value={VOYAGE.evidence_id} />
              <Field label="SHA-256 Hash" value={VOYAGE.sha256} mono />
              <Field label="Verification Status" value={VOYAGE.evidence_status} />
              <Field label="Verified by" value={VOYAGE.verifier} />
              <a
                href={`/evidence-vault?id=${VOYAGE.evidence_id}`}
                className="flex items-center gap-2 text-xs text-cyan-400 hover:underline mt-2"
              >
                <ExternalLink size={11} /> View in Evidence Vault (requires login)
              </a>
            </div>
          </div>
        </div>

        {/* Data Classification */}
        <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Data Classification</h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            {[
              { label: 'AIS Position Data', source: 'Spire Maritime S-AIS', type: 'OBSERVED', color: 'text-emerald-400' },
              { label: 'Satellite SAR Validation', source: 'Copernicus Sentinel-1', type: 'OBSERVED', color: 'text-emerald-400' },
              { label: 'Fuel Consumption', source: 'Vessel MRV Declaration', type: 'DECLARED', color: 'text-cyan-400' },
              { label: 'CO2 Calculation', source: 'ISO 14083:2023 Factor', type: 'DERIVED', color: 'text-blue-400' },
              { label: 'EU ETS Exposure', source: 'Regulation (EU) 2015/757', type: 'ESTIMATED', color: 'text-amber-400' },
              { label: 'EEOI', source: 'IMO MEPC.1/Circ.684', type: 'DERIVED', color: 'text-blue-400' },
            ].map(d => (
              <div key={d.label} className="border border-neutral-800 rounded-lg p-3 bg-neutral-950">
                <p className="text-neutral-400 mb-1 font-medium">{d.label}</p>
                <p className="text-neutral-600 text-[10px] mb-2">{d.source}</p>
                <span className={`text-[10px] font-bold uppercase ${d.color}`}>{d.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-neutral-800">
          <p className="text-xs text-neutral-600">
            This is a public transparency record issued by MeridianMRV Intelligence Platform.
            Record ID: <span className="font-mono text-neutral-500">{VOYAGE.id}</span>.
            SHA-256: <span className="font-mono text-neutral-500">{VOYAGE.sha256.slice(0, 20)}...</span>
          </p>
          <p className="text-xs text-neutral-700 mt-1">
            Data sourced from: Spire Maritime · Copernicus Sentinel-1 · IMO DCS · Vessel declarations · EU MRV Regulation.
          </p>
        </div>

      </main>
    </div>
  );
}

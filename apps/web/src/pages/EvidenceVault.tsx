import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Shield, Hash, ExternalLink, CheckCircle, Clock, AlertTriangle, Upload } from 'lucide-react';
import { useState } from 'react';

// ── Demo Evidence Records ─────────────────────────────────────
const RECORDS = [
  {
    id: 'EVD-2026-0234-001',
    voyage_id: 'VOY-2026-0234',
    vessel: 'MV MERIDIAN PIONEER',
    route: 'Santos → Rotterdam',
    source: 'Spire S-AIS + Copernicus SAR',
    type: 'VOYAGE_EMISSIONS',
    capture_date: '2026-08-15',
    promoted_at: '2026-08-20T14:32:11Z',
    sha256: 'a3f82bc9d1e4f67a2b8c3d5e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    parser_version: 'meridian-parser-v2.1.0',
    confidence: 0.98,
    status: 'VERIFIED',
    ais_count: 47,
    sar_count: 3,
    co2: 2523.3,
  },
  {
    id: 'EVD-2026-0198-002',
    voyage_id: 'VOY-2026-0198',
    vessel: 'MV ATLANTIC STAR',
    route: 'Vitória → Hamburg',
    source: 'Spire S-AIS',
    type: 'VOYAGE_EMISSIONS',
    capture_date: '2026-07-28',
    promoted_at: null,
    sha256: 'b7c91de2a4f83b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    parser_version: 'meridian-parser-v2.1.0',
    confidence: 0.91,
    status: 'PENDING_REVIEW',
    ais_count: 38,
    sar_count: 1,
    co2: 3101.2,
  },
  {
    id: 'EVD-2026-0121-003',
    voyage_id: 'VOY-2026-0121',
    vessel: 'MV CORREDORA DO SUL',
    route: 'Paranaguá → Antwerp',
    source: 'Spire S-AIS',
    type: 'VOYAGE_EMISSIONS',
    capture_date: '2026-06-10',
    promoted_at: null,
    sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    parser_version: 'meridian-parser-v2.0.3',
    confidence: 0.87,
    status: 'PENDING_REVIEW',
    ais_count: 55,
    sar_count: 2,
    co2: 3550.8,
  },
];

const STATUS_MAP = {
  VERIFIED: { variant: 'live' as const, icon: <CheckCircle size={10} className="inline mr-1" /> },
  PENDING_REVIEW: { variant: 'stale' as const, icon: <Clock size={10} className="inline mr-1" /> },
  REJECTED: { variant: 'error' as const, icon: <AlertTriangle size={10} className="inline mr-1" /> },
};

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 95 ? 'bg-emerald-500' : pct >= 85 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 bg-white/5 rounded-full">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-text-base">{pct}%</span>
    </div>
  );
}

export function EvidenceVault() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader title="Evidence Vault" subtitle="MARITIME & REGULATORY INTELLIGENCE" status="demo" />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">

        {/* Legend */}
        <div className="flex items-start gap-3 border border-violet-500/20 bg-violet-500/5 rounded-lg px-4 py-3 text-xs text-violet-300">
          <Shield size={14} className="shrink-0 mt-0.5" />
          <span>
            The Evidence Vault stores immutable, hashed records of analytical outputs from Meridian Intelligence.
            Records must be <strong>reviewed by a human analyst</strong> before being promoted to the authoritative MeridianMRV Core.
            SHA-256 hashes guarantee data integrity. LLM never generates evidence — it only interprets it.
          </span>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border-default rounded-xl p-4 bg-bg-panel text-center">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Total Records</p>
            <p className="text-3xl font-bold text-text-base">{RECORDS.length}</p>
          </div>
          <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-4 text-center">
            <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Verified</p>
            <p className="text-3xl font-bold text-emerald-300">{RECORDS.filter(r => r.status === 'VERIFIED').length}</p>
          </div>
          <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-amber-300">{RECORDS.filter(r => r.status === 'PENDING_REVIEW').length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="border border-border-default rounded-xl bg-bg-panel overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
            <h3 className="text-sm font-semibold text-text-base uppercase tracking-wider">Evidence Records</h3>
            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border-default hover:border-brand-primary/50 text-text-muted hover:text-brand-primary transition-colors">
              <Upload size={11} /> Promote to Core
            </button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-sidebar border-b border-border-subtle text-text-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Evidence ID</th>
                <th className="px-6 py-3 font-medium">Voyage / Vessel</th>
                <th className="px-6 py-3 font-medium">Capture Date</th>
                <th className="px-6 py-3 font-medium">SHA-256</th>
                <th className="px-6 py-3 font-medium">Parser</th>
                <th className="px-6 py-3 font-medium">Confidence</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {RECORDS.map(rec => {
                const isOpen = expanded === rec.id;
                const st = STATUS_MAP[rec.status as keyof typeof STATUS_MAP];
                return (
                  <>
                    <tr
                      key={rec.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setExpanded(isOpen ? null : rec.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Hash size={11} className="text-violet-400 shrink-0" />
                          <span className="font-mono text-xs text-text-base">{rec.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-medium text-text-base">{rec.vessel}</div>
                        <div className="text-[10px] text-text-muted">{rec.route}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-text-muted">{rec.capture_date}</td>
                      <td className="px-6 py-4 font-mono text-[10px] text-cyan-300">{rec.sha256.slice(0, 16)}…</td>
                      <td className="px-6 py-4 text-[10px] text-text-muted font-mono">{rec.parser_version}</td>
                      <td className="px-6 py-4"><ConfidenceBar value={rec.confidence} /></td>
                      <td className="px-6 py-4">
                        <Badge variant={st.variant}>{st.icon}{rec.status.replace('_', ' ')}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`/public/voyage/${rec.voyage_id.toLowerCase()}`}
                          className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                          onClick={e => e.stopPropagation()}>
                          <ExternalLink size={10} /> Public
                        </a>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={`${rec.id}-detail`} className="bg-black/20">
                        <td colSpan={8} className="px-6 py-5">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <p className="text-text-muted uppercase tracking-wider mb-1">CO2 Emitted</p>
                              <p className="text-cyan-300 font-semibold">{rec.co2.toLocaleString()} tCO2e</p>
                            </div>
                            <div>
                              <p className="text-text-muted uppercase tracking-wider mb-1">AIS Observations</p>
                              <p className="text-text-base font-semibold">{rec.ais_count} fixes</p>
                            </div>
                            <div>
                              <p className="text-text-muted uppercase tracking-wider mb-1">SAR Validations</p>
                              <p className="text-text-base font-semibold">{rec.sar_count} Sentinel-1 passes</p>
                            </div>
                            <div>
                              <p className="text-text-muted uppercase tracking-wider mb-1">Source</p>
                              <p className="text-text-base font-semibold">{rec.source}</p>
                            </div>
                            <div className="col-span-4">
                              <p className="text-text-muted uppercase tracking-wider mb-1">Full SHA-256</p>
                              <p className="font-mono text-[10px] text-cyan-300 break-all">{rec.sha256}</p>
                            </div>
                            {rec.promoted_at && (
                              <div className="col-span-4">
                                <p className="text-emerald-400 text-xs flex items-center gap-1.5">
                                  <CheckCircle size={11} /> Promoted to MeridianMRV Core on {new Date(rec.promoted_at).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

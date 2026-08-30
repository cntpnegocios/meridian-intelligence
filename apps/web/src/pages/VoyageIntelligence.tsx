import { useState, useEffect } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { MapCockpit } from "../components/ui/MapCockpit";

// ── Types ──────────────────────────────────────────────────────────────────
interface Voyage {
  id: string;
  vessel_name?: string;
  imo?: string;
  origin_port?: string;
  dest_port?: string;
  departure_at?: string;
  arrival_at?: string;
  distance_nm?: number;
  status?: string;
}

interface VoyagesResponse {
  voyages?: Voyage[];
  items?: Voyage[];
  data?: Voyage[];
}

export function VoyageIntelligence() {
  const [voyages, setVoyages] = useState<Voyage[]>([]);
  const [voyagesLoading, setVoyagesLoading] = useState(true);
  const [voyagesError, setVoyagesError] = useState<string | null>(null);

  // ── Fetch real voyages from API ─────────────────────────────────────────
  useEffect(() => {
    const fetchVoyages = async () => {
      setVoyagesLoading(true);
      setVoyagesError(null);
      try {
        const res = await fetch('/api/v1/voyages');
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data: VoyagesResponse | Voyage[] = await res.json();
        // Handle various response shapes
        const list = Array.isArray(data)
          ? (data as Voyage[])
          : (data as VoyagesResponse).voyages
            ?? (data as VoyagesResponse).items
            ?? (data as VoyagesResponse).data
            ?? [];
        setVoyages(list);
      } catch (e) {
        setVoyagesError(e instanceof Error ? e.message : 'Failed to load voyages');
        setVoyages([]);
      } finally {
        setVoyagesLoading(false);
      }
    };
    fetchVoyages();
  }, []);

  const firstVoyage = voyages[0];

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader 
        title="Voyage Intelligence" 
        subtitle="MARITIME & REGULATORY INTELLIGENCE" 
        status={voyagesLoading ? 'demo' : voyagesError ? 'demo' : voyages.length > 0 ? 'live' : 'demo'}
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <section className="mb-6">
          <MapCockpit />
        </section>

        {/* Voyage loading / error / empty states */}
        {voyagesLoading && (
          <div className="flex items-center gap-3 text-sm text-text-muted px-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse inline-block" />
            Loading voyages…
          </div>
        )}
        {!voyagesLoading && voyagesError && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            Could not load voyages: {voyagesError}
          </div>
        )}
        {!voyagesLoading && !voyagesError && voyages.length === 0 && (
          <div className="rounded-lg border border-border-default bg-bg-panel px-6 py-8 text-center">
            <div className="text-3xl mb-3">🛳️</div>
            <p className="text-sm font-medium text-text-base mb-1">No voyages recorded yet</p>
            <p className="text-xs text-text-muted">AIS tracking will populate this view once vessels are reporting.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="Vessel"
                value={firstVoyage?.vessel_name ?? 'DEMO'}
                status={firstVoyage ? 'live' : 'demo'}
                subtitle={firstVoyage?.imo ? `IMO: ${firstVoyage.imo}` : 'IMO: 9876543'}
              />
              <MetricCard
                title="Last AIS Fix"
                value="—"
                status="unavailable"
                subtitle="No provider data"
              />
              <MetricCard
                title="Speed (SOG)"
                value="—"
                status="unavailable"
                subtitle="knots"
              />
              <MetricCard title="ETA" value="—" status="unavailable" subtitle="Destination" />
            </div>
            
            <div className="border border-border-default rounded-xl p-6 bg-bg-panel">
              <h3 className="text-lg font-semibold mb-4 border-b border-border-subtle pb-2">Voyage Telemetry</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <span className="block text-xs text-text-muted uppercase tracking-wider mb-1">Position Confidence</span>
                  <Badge variant="unavailable">UNAVAILABLE</Badge>
                </div>
                <div>
                  <span className="block text-xs text-text-muted uppercase tracking-wider mb-1">Latitude</span>
                  <span className="text-sm font-medium">--</span>
                </div>
                <div>
                  <span className="block text-xs text-text-muted uppercase tracking-wider mb-1">Longitude</span>
                  <span className="text-sm font-medium">--</span>
                </div>
                <div>
                  <span className="block text-xs text-text-muted uppercase tracking-wider mb-1">Course (COG)</span>
                  <span className="text-sm font-medium">--</span>
                </div>
                <div>
                  <span className="block text-xs text-text-muted uppercase tracking-wider mb-1">Distance Travelled</span>
                  <span className="text-sm font-medium">--</span>
                </div>
                <div>
                  <span className="block text-xs text-text-muted uppercase tracking-wider mb-1">Distance Remaining</span>
                  <span className="text-sm font-medium">--</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 border border-border-default rounded-xl p-6 bg-bg-panel">
            <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
              Event Timeline
              <Badge variant="demo">DEMO</Badge>
            </h3>
            
            <div className="relative border-l-2 border-border-subtle ml-3 flex flex-col gap-6 pb-4">
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-1.5 ring-4 ring-bg-panel"></div>
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-text-base">PORT_DEPARTURE</strong>
                  <span className="text-xs text-text-muted">10:00 UTC</span>
                </div>
                <p className="text-xs text-text-muted">Departed from Port of Santos.</p>
              </div>
              
              <div className="relative pl-6 opacity-60">
                <div className="absolute w-3 h-3 bg-brand-primary rounded-full -left-[7px] top-1.5 ring-4 ring-bg-panel"></div>
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-text-base">AIS_POSITION</strong>
                  <span className="text-xs text-text-muted">Pending</span>
                </div>
                <p className="text-xs text-text-muted">Awaiting provider integration.</p>
              </div>

              <div className="relative pl-6 opacity-40">
                <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-[7px] top-1.5 ring-4 ring-bg-panel"></div>
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-text-base">AIS_GAP</strong>
                  <span className="text-xs text-text-muted">--</span>
                </div>
              </div>

              <div className="relative pl-6 opacity-40">
                <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[7px] top-1.5 ring-4 ring-bg-panel"></div>
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-text-base">ROUTE_DEVIATION</strong>
                  <span className="text-xs text-text-muted">--</span>
                </div>
              </div>
              
              <div className="relative pl-6 opacity-40">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-bg-panel"></div>
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-text-base">PORT_ARRIVAL</strong>
                  <span className="text-xs text-text-muted">--</span>
                </div>
                <p className="text-xs text-text-muted">Expected at Port of Rotterdam.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

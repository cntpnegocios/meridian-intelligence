import { useState, useMemo, useEffect, useCallback } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, ArcLayer, LineLayer } from '@deck.gl/layers';
import { Map as MapLibreMap } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// ── Types ──────────────────────────────────────────────────────────────────
interface TransportNode {
  id: string;
  node_type: 'PORT' | 'AIRPORT' | 'MULTIMODAL' | 'INLAND';
  name: string;
  country: string;
  country_iso: string;
  unlocode?: string;
  iata?: string;
  icao?: string;
  latitude: number;
  longitude: number;
  max_draft_m?: number;
  has_containers?: boolean;
  has_lng?: boolean;
  has_rail?: boolean;
  airport_type?: string;
  elevation_ft?: number;
  runway_count?: number;
  in_eu_ets_scope?: boolean;
  source?: string;
}

interface GeoJsonFeature {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: [number, number] };
  properties: TransportNode;
}

interface GeoJsonResult {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
  meta: { total: number; source: string };
}

interface LayerState {
  seaports: boolean;
  airports: boolean;
  maritimeRoute: boolean;
  aviationRoute: boolean;
  liveAssets: boolean;
}

const INITIAL_VIEW_STATE = {
  longitude: -20.0,
  latitude: 15.0,
  zoom: 3,
  pitch: 45,
  bearing: 0,
};

const SATELLITE_STYLE = {
  version: 8 as const,
  sources: {
    satellite: {
      type: 'raster' as const,
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      attribution: 'Tiles © Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
    },
  },
  layers: [{ id: 'satellite', type: 'raster' as const, source: 'satellite' }],
};

// Node color by type
const NODE_COLOR: Record<string, [number, number, number]> = {
  PORT:       [0, 255, 128],
  AIRPORT:    [0, 191, 255],
  MULTIMODAL: [255, 200, 0],
  INLAND:     [200, 100, 255],
};

// ── Component ──────────────────────────────────────────────────────────────
export function MapCockpit() {
  const [layers, setLayers] = useState<LayerState>({
    seaports: true,
    airports: true,
    maritimeRoute: true,
    aviationRoute: false,
    liveAssets: true,
  });

  const [nodes, setNodes] = useState<GeoJsonFeature[]>([]);
  const [nodesLoading, setNodesLoading] = useState(true);
  const [nodesError, setNodesError] = useState<string | null>(null);
  const [nodesTotal, setNodesTotal] = useState(0);

  const [selectedNode, setSelectedNode] = useState<TransportNode | null>(null);
  const [originNode, setOriginNode] = useState<TransportNode | null>(null);
  const [destinationNode, setDestinationNode] = useState<TransportNode | null>(null);

  // ── Fetch real nodes from API ────────────────────────────────────────────
  useEffect(() => {
    const fetchNodes = async () => {
      setNodesLoading(true);
      setNodesError(null);
      try {
        const types: string[] = [];
        if (layers.seaports) types.push('PORT', 'MULTIMODAL');
        if (layers.airports) types.push('AIRPORT');
        if (types.length === 0) { setNodes([]); setNodesLoading(false); return; }

        const url = `http://localhost:8000/api/v1/nodes?node_type=${types.join(',')}&limit=5000`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data: GeoJsonResult = await res.json();
        setNodes(data.features);
        setNodesTotal(data.meta.total);
      } catch (e) {
        setNodesError(e instanceof Error ? e.message : 'Failed to load nodes');
        setNodes([]);
      } finally {
        setNodesLoading(false);
      }
    };
    fetchNodes();
  }, [layers.seaports, layers.airports]);

  // ── deck.gl layers ────────────────────────────────────────────────────────
  const deckLayers = useMemo(() => {
    const result = [];

    // Real transport nodes — ScatterplotLayer (simpler, typed correctly)
    if (nodes.length > 0) {
      result.push(
        new ScatterplotLayer({
          id: 'transport-nodes',
          data: nodes.map(f => ({
            position: f.geometry.coordinates as [number, number],
            node_type: f.properties.node_type,
            properties: f.properties,
          })),
          getPosition: (d: { position: [number, number] }) => d.position,
          getFillColor: (d: { node_type: string }) => {
            const c = NODE_COLOR[d.node_type] ?? [200, 200, 200];
            return [c[0], c[1], c[2], 220] as [number, number, number, number];
          },
          getRadius: (d: { node_type: string }) =>
            d.node_type === 'AIRPORT' ? 18000 : 22000,
          pickable: true,
          autoHighlight: true,
          highlightColor: [255, 255, 255, 80] as [number, number, number, number],
          onClick: (info: { object?: { properties: TransportNode } }) => {
            if (info.object) setSelectedNode(info.object.properties);
          },
        })
      );
    }

    // Maritime route — flat LineLayer on ocean surface
    if (layers.maritimeRoute && originNode && destinationNode &&
        originNode.node_type === 'PORT' && destinationNode.node_type === 'PORT') {
      result.push(
        new LineLayer({
          id: 'maritime-route',
          data: [{ source: [originNode.longitude, originNode.latitude] as [number, number],
                   target: [destinationNode.longitude, destinationNode.latitude] as [number, number] }],
          getSourcePosition: (d: { source: [number, number] }) => d.source,
          getTargetPosition: (d: { target: [number, number] }) => d.target,
          getColor: [0, 255, 128, 200] as [number, number, number, number],
          getWidth: 3,
        })
      );
    } else if (layers.maritimeRoute) {
      // Default route: Santos → Rotterdam
      result.push(
        new LineLayer({
          id: 'maritime-route-default',
          data: [{ source: [-46.2936, -23.9744] as [number, number],
                   target: [4.2867, 51.885] as [number, number] }],
          getSourcePosition: (d: { source: [number, number] }) => d.source,
          getTargetPosition: (d: { target: [number, number] }) => d.target,
          getColor: [0, 255, 128, 180] as [number, number, number, number],
          getWidth: 2,
        })
      );
    }

    // Aviation route — ArcLayer with altitude
    if (layers.aviationRoute) {
      const origin: [number, number] = originNode?.node_type === 'AIRPORT'
        ? [originNode.longitude, originNode.latitude]
        : [-46.473, -23.4355]; // GRU default
      const dest: [number, number] = destinationNode?.node_type === 'AIRPORT'
        ? [destinationNode.longitude, destinationNode.latitude]
        : [8.5705, 50.0333]; // FRA default

      result.push(
        new ArcLayer({
          id: 'aviation-route',
          data: [{ source: origin, target: dest }],
          getSourcePosition: (d: { source: [number, number] }) => d.source,
          getTargetPosition: (d: { target: [number, number] }) => d.target,
          getSourceColor: [0, 191, 255, 200] as [number, number, number, number],
          getTargetColor: [0, 191, 255, 200] as [number, number, number, number],
          getWidth: 3,
          getHeight: 0.3,
        })
      );
    }

    return result;
  }, [nodes, layers, originNode, destinationNode]);


  const toggleLayer = useCallback((key: keyof LayerState) => {
    setLayers(s => ({ ...s, [key]: !s[key] }));
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-[#07131f] rounded-xl overflow-hidden border border-[#1b2b39]">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={deckLayers}
        onClick={(info) => { if (!info.object) setSelectedNode(null); }}
      >
        <MapLibreMap mapStyle={SATELLITE_STYLE} />
      </DeckGL>

      {/* HUD Panel */}
      <div className="absolute top-4 left-4 bg-[#091923]/90 backdrop-blur-md p-4 rounded-lg border border-[#1b2b39] w-64 shadow-2xl z-10">
        <div className="flex items-center justify-between mb-1 border-b border-[#1b2b39] pb-2">
          <h3 className="text-sm font-bold text-[#eaf1f6]">GLOBAL NODE REGISTRY</h3>
          {nodesLoading
            ? <span className="text-[10px] text-yellow-400 animate-pulse">LOADING…</span>
            : nodesError
              ? <span className="text-[10px] text-red-400">API OFFLINE</span>
              : <span className="text-[10px] font-mono text-emerald-400">{nodesTotal.toLocaleString()} NODES</span>
          }
        </div>

        <div className="text-[10px] font-mono text-emerald-400 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          UN/LOCODE · NGA WPI · OurAirports
        </div>

        <div className="space-y-2 mb-4">
          {([
            { key: 'seaports',      label: 'Seaports (UN/LOCODE + WPI)', color: 'text-emerald-400' },
            { key: 'airports',      label: 'Airports (OurAirports)',       color: 'text-[#00bfff]' },
            { key: 'maritimeRoute', label: 'Maritime Route (Sea Trace)',   color: 'text-emerald-400' },
            { key: 'aviationRoute', label: 'Aviation Route (Sky Arc)',     color: 'text-[#00bfff]' },
          ] as const).map(({ key, label, color }) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={layers[key]}
                onChange={() => toggleLayer(key)}
                className="rounded bg-[#1b2b39] border-[#2a4050]"
              />
              <span className={`text-xs ${color}`}>{label}</span>
            </label>
          ))}
        </div>

        <div className="border-t border-[#1b2b39] pt-2 space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-[#8da2b1]">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: '#00ff80' }} />PORT
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: '#00bfff' }} />AIRPORT
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: '#ffc800' }} />MULTI
          </div>
        </div>
      </div>

      {/* Node Detail Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-[#091923]/95 backdrop-blur-md p-4 rounded-lg border border-[#1b2b39] w-72 shadow-2xl z-10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                selectedNode.node_type === 'PORT' ? 'bg-emerald-900 text-emerald-400' : 'bg-blue-900 text-blue-300'
              }`}>
                {selectedNode.node_type}
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{selectedNode.name}</h4>
              <p className="text-[11px] text-[#8da2b1]">{selectedNode.country}</p>
            </div>
            <button onClick={() => setSelectedNode(null)}
              className="text-[#8da2b1] hover:text-white text-lg leading-none">×</button>
          </div>

          <div className="space-y-1 text-[11px] border-t border-[#1b2b39] pt-2">
            {selectedNode.unlocode && <div className="flex justify-between"><span className="text-[#8da2b1]">UN/LOCODE</span><span className="font-mono text-white">{selectedNode.unlocode}</span></div>}
            {selectedNode.iata && <div className="flex justify-between"><span className="text-[#8da2b1]">IATA</span><span className="font-mono text-[#00bfff]">{selectedNode.iata}</span></div>}
            {selectedNode.icao && <div className="flex justify-between"><span className="text-[#8da2b1]">ICAO</span><span className="font-mono text-[#00bfff]">{selectedNode.icao}</span></div>}
            {selectedNode.max_draft_m && <div className="flex justify-between"><span className="text-[#8da2b1]">Max Draft</span><span className="text-white">{selectedNode.max_draft_m} m</span></div>}
            {selectedNode.elevation_ft && <div className="flex justify-between"><span className="text-[#8da2b1]">Elevation</span><span className="text-white">{selectedNode.elevation_ft} ft</span></div>}
            {selectedNode.runway_count && <div className="flex justify-between"><span className="text-[#8da2b1]">Runways</span><span className="text-white">{selectedNode.runway_count}</span></div>}
            <div className="flex justify-between">
              <span className="text-[#8da2b1]">EU ETS Scope</span>
              <span className={selectedNode.in_eu_ets_scope ? 'text-orange-400' : 'text-emerald-400'}>
                {selectedNode.in_eu_ets_scope ? 'YES' : 'NO'}
              </span>
            </div>
            {selectedNode.has_containers && <div className="flex justify-between"><span className="text-[#8da2b1]">Containers</span><span className="text-emerald-400">✓</span></div>}
            {selectedNode.has_lng && <div className="flex justify-between"><span className="text-[#8da2b1]">LNG</span><span className="text-emerald-400">✓</span></div>}
            {selectedNode.has_rail && <div className="flex justify-between"><span className="text-[#8da2b1]">Rail</span><span className="text-emerald-400">✓</span></div>}
            <div className="flex justify-between mt-1 pt-1 border-t border-[#1b2b39]">
              <span className="text-[#8da2b1]">SOURCE</span>
              <span className="text-[10px] text-[#8da2b1]">{selectedNode.source}</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setOriginNode(selectedNode)}
              className="text-[11px] py-1.5 px-2 rounded bg-emerald-900/60 text-emerald-400 hover:bg-emerald-800/60 border border-emerald-800 font-bold"
            >
              SET ORIGIN
            </button>
            <button
              onClick={() => setDestinationNode(selectedNode)}
              className="text-[11px] py-1.5 px-2 rounded bg-blue-900/60 text-blue-400 hover:bg-blue-800/60 border border-blue-800 font-bold"
            >
              SET DESTINATION
            </button>
          </div>
        </div>
      )}

      {/* Route context bar */}
      {(originNode || destinationNode) && (
        <div className="absolute bottom-4 left-4 right-4 bg-[#091923]/90 backdrop-blur-md p-3 rounded-lg border border-[#1b2b39] shadow-2xl flex items-center gap-4">
          <div className="flex-1 text-xs">
            <span className="text-[#8da2b1] text-[10px]">ORIGIN</span>
            <div className="text-emerald-400 font-bold">{originNode ? `${originNode.unlocode ?? originNode.iata ?? '—'} ${originNode.name}` : '—'}</div>
          </div>
          <div className="text-[#8da2b1]">→</div>
          <div className="flex-1 text-xs">
            <span className="text-[#8da2b1] text-[10px]">DESTINATION</span>
            <div className="text-blue-400 font-bold">{destinationNode ? `${destinationNode.unlocode ?? destinationNode.iata ?? '—'} ${destinationNode.name}` : '—'}</div>
          </div>
          <button
            onClick={() => { setOriginNode(null); setDestinationNode(null); }}
            className="text-[10px] text-[#8da2b1] hover:text-white px-2 py-1 rounded border border-[#1b2b39]"
          >
            CLEAR
          </button>
        </div>
      )}
    </div>
  );
}

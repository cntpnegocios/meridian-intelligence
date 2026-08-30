import { useState, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
import { Map as MapLibreMap } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// Demo Data matching the DB
const DEMO_PORTS = [
  { name: 'Santos (BRSSZ)', coordinates: [-46.2936, -23.9744], color: [0, 255, 128] },
  { name: 'Rotterdam (NLRTM)', coordinates: [4.2867, 51.8850], color: [0, 255, 128] },
];

const DEMO_VESSEL_POSITIONS = [
  { 
    name: 'MV EXAMPLE (IMO 9781234)', 
    coordinates: [-21.02, 14.43], // Mid-Atlantic Demo 
    heading: 45,
    speed: 14.5
  }
];

const INITIAL_VIEW_STATE = {
  longitude: -20.0,
  latitude: 15.0,
  zoom: 3,
  pitch: 45,
  bearing: 0
};

export function MapCockpit() {
  const [layersSelected, setLayersSelected] = useState({
    ports: true,
    vessels: true,
    route: true
  });

  const layers = useMemo(() => {
    const activeLayers = [];

    if (layersSelected.ports) {
      activeLayers.push(
        new ScatterplotLayer({
          id: 'ports-layer',
          data: DEMO_PORTS,
          getPosition: d => d.coordinates,
          getFillColor: d => d.color,
          getRadius: 15000, // 15km
          pickable: true,
        })
      );
    }

    if (layersSelected.vessels) {
      activeLayers.push(
        new ScatterplotLayer({
          id: 'vessels-layer',
          data: DEMO_VESSEL_POSITIONS,
          getPosition: d => d.coordinates,
          getFillColor: [255, 0, 0],
          getRadius: 50000, // Exaggerated for visibility at high zoom
          pickable: true,
        })
      );
    }

    if (layersSelected.route) {
      activeLayers.push(
        new ArcLayer({
          id: 'route-arc-layer',
          data: [{ source: DEMO_PORTS[0].coordinates, target: DEMO_PORTS[1].coordinates }],
          getSourcePosition: d => d.source,
          getTargetPosition: d => d.target,
          getSourceColor: [0, 255, 128],
          getTargetColor: [0, 255, 128],
          getWidth: 2,
        })
      );
    }

    return activeLayers;
  }, [layersSelected]);

  return (
    <div className="relative w-full h-[600px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <MapLibreMap 
          mapStyle={{
            version: 8,
            sources: {
              'satellite': {
                type: 'raster',
                tiles: [
                  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                ],
                tileSize: 256,
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              }
            },
            layers: [
              {
                id: 'satellite-layer',
                type: 'raster',
                source: 'satellite',
                minzoom: 0,
                maxzoom: 22
              }
            ]
          }}
        />
      </DeckGL>
      
      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-md p-4 rounded-lg border border-slate-700/50 w-64 shadow-2xl">
        <h3 className="text-sm font-bold text-slate-100 mb-1 border-b border-slate-700 pb-2">
          MERIDIAN VOYAGE HUD
        </h3>
        <p className="text-xs font-mono text-emerald-400 mb-4">LIVE ● TRACKING</p>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-xs text-slate-300">
            <input 
              type="checkbox" 
              checked={layersSelected.ports}
              onChange={() => setLayersSelected(s => ({...s, ports: !s.ports}))}
              className="rounded bg-slate-700 border-slate-600 text-emerald-500 focus:ring-emerald-500"
            />
            <span>Port Geofences</span>
          </label>
          <label className="flex items-center space-x-2 text-xs text-slate-300">
            <input 
              type="checkbox" 
              checked={layersSelected.route}
              onChange={() => setLayersSelected(s => ({...s, route: !s.route}))}
              className="rounded bg-slate-700 border-slate-600 text-emerald-500 focus:ring-emerald-500"
            />
            <span>Voyage Route (Arc)</span>
          </label>
          <label className="flex items-center space-x-2 text-xs text-slate-300">
            <input 
              type="checkbox" 
              checked={layersSelected.vessels}
              onChange={() => setLayersSelected(s => ({...s, vessels: !s.vessels}))}
              className="rounded bg-slate-700 border-slate-600 text-emerald-500 focus:ring-emerald-500"
            />
            <span>Vessel Position (S-AIS)</span>
          </label>
        </div>
      </div>
      
      {/* Vessel Panel */}
      <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-md p-4 rounded-lg border border-slate-700/50 shadow-2xl flex space-x-6 items-center">
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">IMO 9781234</div>
          <div className="text-sm font-bold text-white">MV EXAMPLE</div>
        </div>
        <div className="h-8 w-px bg-slate-700"></div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">SOG</div>
          <div className="text-sm font-mono text-emerald-400">14.5 kn</div>
        </div>
        <div className="h-8 w-px bg-slate-700"></div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">AIS Confidence</div>
          <div className="text-sm font-mono text-emerald-400">98% (SAT)</div>
        </div>
      </div>
    </div>
  );
}

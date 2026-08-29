import { useState } from "react";
import { MapCockpit } from "../components/ui/MapCockpit";

export default function GreenCorridorsDashboard() {
  const [activeScenario, setActiveScenario] = useState("Santos-Rotterdam Baseline");

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-sans">
      
      {/* Sidebar */}
      <aside className="w-80 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-xl font-semibold text-emerald-400 tracking-tight">Green Corridors</h1>
          <p className="text-sm text-neutral-500 mt-1">Control Tower & Twin</p>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-4">Active Scenarios</h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setActiveScenario("Santos-Rotterdam Baseline")}
              className={`w-full text-left p-3 rounded border ${activeScenario === "Santos-Rotterdam Baseline" ? "border-emerald-500/50 bg-emerald-500/10" : "border-neutral-800 hover:border-neutral-700"}`}
            >
              <div className="font-medium text-sm text-neutral-200">Santos → Rotterdam</div>
              <div className="text-xs text-neutral-500 mt-1">Baseline HFO • 5,400 NM</div>
            </button>
            
            <button 
              onClick={() => setActiveScenario("Santos-Rotterdam Methanol")}
              className={`w-full text-left p-3 rounded border ${activeScenario === "Santos-Rotterdam Methanol" ? "border-emerald-500/50 bg-emerald-500/10" : "border-neutral-800 hover:border-neutral-700"}`}
            >
              <div className="font-medium text-sm text-neutral-200">Santos → Rotterdam</div>
              <div className="text-xs text-emerald-500/70 mt-1">Green Methanol • 5,400 NM</div>
            </button>
          </div>

          <h2 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-4 mt-8">Twin Output</h2>
          <div className="p-4 bg-neutral-900 rounded border border-neutral-800 space-y-4">
             <div>
                <div className="text-xs text-neutral-500">Est. Emissions</div>
                <div className="text-lg font-mono">{activeScenario.includes("Methanol") ? "142.5" : "2,450.8"} <span className="text-xs text-neutral-500">tCO2e</span></div>
             </div>
             <div>
                <div className="text-xs text-neutral-500">Reg. Exposure (EU ETS)</div>
                <div className="text-lg font-mono text-amber-500">{activeScenario.includes("Methanol") ? "€4,500" : "€78,000"}</div>
             </div>
             <button className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-xs font-medium transition-colors">
               Run Calculation
             </button>
             <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium transition-colors">
               Promote to Evidence
             </button>
          </div>
        </div>
      </aside>

      {/* Map Cockpit */}
      <main className="flex-1 relative">
        <MapCockpit />
        
        {/* Status Overlay */}
        <div className="absolute bottom-6 left-6 bg-neutral-900/90 backdrop-blur border border-neutral-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-neutral-300">Live Engine</span>
          </div>
          <div className="text-xs text-neutral-500">Geofence: <span className="text-neutral-300">Active</span></div>
          <div className="text-xs text-neutral-500">AIS: <span className="text-neutral-300">Spire Demo</span></div>
          <div className="text-xs text-neutral-500">Model: <span className="text-amber-500/80">ESTIMATED (PACE-X Sim)</span></div>
        </div>
      </main>
    </div>
  );
}

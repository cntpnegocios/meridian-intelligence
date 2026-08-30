import { useState, useEffect } from "react";
import { MapCockpit } from "../components/ui/MapCockpit";
import { fetchVesselByImo, simulateVoyage } from "../api/client";

export default function GreenCorridorsDashboard() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [conventionalData, setConventionalData] = useState<any>(null);
  const [greenData, setGreenData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch ships by IMO
      const emma = await fetchVesselByImo("9321483"); // Emma Maersk (VLSFO)
      const laura = await fetchVesselByImo("9944546"); // Laura Maersk (Bio-Methanol)

      // 2. Run simulation side-by-side
      const dist = 5400.0;
      const scope = 100.0;
      
      const convRes = await simulateVoyage({
        vessel_id: emma.id,
        distance_nm: dist,
        target_speed_knots: 25.5,
        regulatory_scope_percent: scope
      });
      
      const greenRes = await simulateVoyage({
        vessel_id: laura.id,
        distance_nm: dist,
        target_speed_knots: 17.4, // Eco speed
        regulatory_scope_percent: scope
      });

      setConventionalData(convRes);
      setGreenData(greenRes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    runSimulation();
  }, []);

  const formatMoney = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatEur = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-sans">
      
      {/* Sidebar - Financial Twin */}
      <aside className="w-[450px] border-r border-neutral-800 flex flex-col shrink-0 z-10 bg-neutral-950">
        <div className="p-5 border-b border-neutral-800">
          <h1 className="text-xl font-semibold text-forest-grove tracking-tight">Green Corridors</h1>
          <p className="text-xs text-neutral-400 mt-1">Investment & Regulatory Twin (Phase 9)</p>
        </div>
        
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Corridor Economics</h2>
             <button 
                onClick={runSimulation}
                disabled={isLoading}
                className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs rounded border border-neutral-700 disabled:opacity-50"
             >
                {isLoading ? "Running Physics..." : "Re-simulate"}
             </button>
          </div>

          {error && <div className="text-red-400 text-xs mb-4 p-2 bg-red-900/20 rounded border border-red-900">{error}</div>}

          {conventionalData && greenData && (
            <div className="space-y-6">
              
              {/* Route Summary */}
              <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-sm font-medium">Santos → Rotterdam</div>
                  <div className="text-xs text-neutral-500">5,400 NM</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                     <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Conventional</div>
                     <div className="text-xs text-neutral-300 truncate">{conventionalData.vessel_name}</div>
                     <div className="text-xs text-neutral-500">VLSFO • {conventionalData.speed_knots} kts</div>
                  </div>
                  <div>
                     <div className="text-[10px] text-forest-grove uppercase tracking-wider">Green Corridor</div>
                     <div className="text-xs text-neutral-300 truncate">{greenData.vessel_name}</div>
                     <div className="text-xs text-neutral-500">Methanol • {greenData.speed_knots} kts</div>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
                <table className="w-full text-xs text-right">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-500 bg-neutral-950/50">
                      <th className="p-3 font-medium text-left">Metric</th>
                      <th className="p-3 font-medium text-neutral-400">Baseline</th>
                      <th className="p-3 font-medium text-forest-grove">Green</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/50">
                    <tr className="hover:bg-neutral-800/20">
                      <td className="p-3 text-left text-neutral-400">TTW CO₂e</td>
                      <td className="p-3 font-mono">{conventionalData.ttw_co2_tonnes.toLocaleString()} t</td>
                      <td className="p-3 font-mono text-forest-grove">{greenData.ttw_co2_tonnes.toLocaleString()} t</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/20">
                      <td className="p-3 text-left text-neutral-400">Fuel Cost</td>
                      <td className="p-3 font-mono text-red-400/80">{formatMoney(conventionalData.fuel_cost_usd)}</td>
                      <td className="p-3 font-mono text-red-400/80">{formatMoney(greenData.fuel_cost_usd)}</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/20">
                      <td className="p-3 text-left text-neutral-400">EU ETS Cost</td>
                      <td className="p-3 font-mono text-amber-500/80">{formatEur(conventionalData.regulatory.eu_ets_cost_eur)}</td>
                      <td className="p-3 font-mono text-forest-grove">{formatEur(greenData.regulatory.eu_ets_cost_eur)}</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/20">
                      <td className="p-3 text-left text-neutral-400">FuelEU Penalty</td>
                      <td className="p-3 font-mono text-amber-500/80">{formatEur(conventionalData.regulatory.fueleu_penalty_eur)}</td>
                      <td className="p-3 font-mono text-forest-grove">Compliant</td>
                    </tr>
                    <tr className="bg-neutral-800/30 font-medium">
                      <td className="p-3 text-left">Total (Fuel + Reg)</td>
                      <td className="p-3 font-mono text-lg">{formatMoney(conventionalData.fuel_cost_usd + (conventionalData.regulatory.total_regulatory_cost_eur * 1.1))}</td>
                      <td className="p-3 font-mono text-lg text-forest-grove">{formatMoney(greenData.fuel_cost_usd + (greenData.regulatory.total_regulatory_cost_eur * 1.1))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* TCO Highlights */}
              {conventionalData && greenData && (
                <div className="bg-emerald-900/10 border border-emerald-900/30 p-4 rounded-lg">
                  <h3 className="text-xs font-semibold text-forest-grove uppercase tracking-wider mb-2">Investor Summary</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    By switching to the Bio-Methanol Green Corridor, despite higher raw fuel costs, regulatory savings (ETS/FuelEU) yield a net reduction in Total Cost of Ownership (TCO).
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                     <div className="bg-neutral-900/50 p-2 rounded">
                        <div className="text-[10px] text-neutral-500">CO2e Reduction</div>
                        <div className="text-sm font-semibold text-forest-grove">
                          -{((1 - (greenData.ttw_co2_tonnes / conventionalData.ttw_co2_tonnes)) * 100).toFixed(1)}%
                        </div>
                     </div>
                     <div className="bg-neutral-900/50 p-2 rounded">
                        <div className="text-[10px] text-neutral-500">Evidence Vault</div>
                        <div className="text-[9px] font-mono text-neutral-600 truncate" title={greenData.evidence.hash}>
                          {greenData.evidence.hash.substring(0, 16)}...
                        </div>
                     </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </aside>

      {/* Map Cockpit */}
      <main className="flex-1 relative">
        <MapCockpit />
        
        {/* Status Overlay */}
        <div className="absolute bottom-6 right-6 bg-neutral-900/90 backdrop-blur border border-neutral-800 p-4 rounded-lg w-64 shadow-2xl">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-800">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500' : 'bg-forest-grove'} animate-pulse`}></div>
            <span className="text-xs font-medium text-neutral-300">Meridian Core Engine</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500">Physics Engine:</span>
              <span className="text-neutral-300">Active</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500">Regulatory Engine:</span>
              <span className="text-neutral-300">Active</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500">Evidence Vault:</span>
              <span className="text-forest-grove font-mono">SHA-256</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


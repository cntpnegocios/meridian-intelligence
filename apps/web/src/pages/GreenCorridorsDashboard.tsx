import { useState } from 'react';
import { ShieldCheck, Ship, Plane, Leaf, Zap, BarChart3 } from 'lucide-react';

export default function GreenCorridorsDashboard() {
  const [activeTab, setActiveTab] = useState<'SEA' | 'AIR'>('SEA');

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-ink-black/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-forest-grove tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-forest-grove animate-pulse"></span> Multi-Modal Network
          </div>
          <h1 className="text-[28px] font-semibold text-ink-black font-libre-caslon-text">Global Green Corridors</h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('SEA')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'SEA' ? 'bg-ink-black text-pure-white shadow-md' : 'bg-pure-white text-graphite border border-ink-black/10 hover:bg-mist-gray'}`}
          >
            Sea Corridors
          </button>
          <button 
            onClick={() => setActiveTab('AIR')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'AIR' ? 'bg-ink-black text-pure-white shadow-md' : 'bg-pure-white text-graphite border border-ink-black/10 hover:bg-mist-gray'}`}
          >
            Air Corridors (SAF)
          </button>
        </div>
      </div>

      {activeTab === 'SEA' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Corridor Profile */}
          <div className="lg:col-span-2 bg-pure-white rounded-[20px] p-6 border border-ink-black/10 shadow-[0_0_1px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.1)_inset]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-[10px] font-semibold text-forest-grove border border-forest-grove/30 bg-forest-grove/5 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">Live Pilot</div>
                <h2 className="text-[22px] font-bold text-ink-black flex items-center gap-2"><Ship size={24} className="text-forest-grove" /> Brazil – UK / EU Sea Corridor</h2>
                <p className="text-graphite text-sm mt-1">Agri-food and commodity flows. High EU ETS / FuelEU exposure.</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-graphite font-medium uppercase tracking-wider">Engine</div>
                <div className="text-sm font-bold text-ink-black">Pace-X (Greensee + CCV)</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-mist-gray rounded-xl border border-ink-black/5">
                <div className="text-xs text-graphite mb-1 uppercase tracking-wider font-medium">Measure</div>
                <div className="text-xl font-bold text-ink-black">12,450 tCO2e</div>
                <div className="text-xs text-forest-grove mt-1">Baseline Established</div>
              </div>
              <div className="p-4 bg-mist-gray rounded-xl border border-ink-black/5">
                <div className="text-xs text-graphite mb-1 uppercase tracking-wider font-medium">Optimise (Methanol)</div>
                <div className="text-xl font-bold text-ink-black">-34% EEOI Gap</div>
                <div className="text-xs text-forest-grove mt-1">FuelEU Compliant</div>
              </div>
              <div className="p-4 bg-mist-gray rounded-xl border border-ink-black/5">
                <div className="text-xs text-graphite mb-1 uppercase tracking-wider font-medium">Forecast & Monetise</div>
                <div className="text-xl font-bold text-ink-black">€840k Liability</div>
                <div className="text-xs text-forest-grove mt-1">Fully Hedged via Trace</div>
              </div>
            </div>
            
            <div className="h-2 w-full bg-mist-gray rounded-full overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1)_inset]">
              <div className="h-full bg-forest-grove shadow-[0_1px_2px_rgba(0,0,0,0.25)_inset]" style={{width: '66%'}}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-graphite font-medium">
              <span>Current Trajectory</span>
              <span>IMO 2030 Target (Met)</span>
            </div>
          </div>

          {/* Evidence Layer */}
          <div className="bg-pure-white rounded-[20px] p-6 border border-ink-black/10 shadow-[0_0_1px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.1)_inset] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={20} className="text-forest-grove" />
                <h3 className="text-[16px] font-bold text-ink-black">MeridianMRV Evidence</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-grove/10 flex items-center justify-center shrink-0 mt-0.5"><Zap size={12} className="text-forest-grove" /></div>
                  <div>
                    <div className="text-sm font-semibold text-ink-black">DLT Provenance</div>
                    <div className="text-xs text-graphite">Immutable record of EU ETS allocation.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-grove/10 flex items-center justify-center shrink-0 mt-0.5"><Leaf size={12} className="text-forest-grove" /></div>
                  <div>
                    <div className="text-sm font-semibold text-ink-black">EUDR & Biodiversity</div>
                    <div className="text-xs text-graphite">Biofuel feedstock (B30) verified zero-deforestation.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-grove/10 flex items-center justify-center shrink-0 mt-0.5"><BarChart3 size={12} className="text-forest-grove" /></div>
                  <div>
                    <div className="text-sm font-semibold text-ink-black">Scope 3 Insetting</div>
                    <div className="text-xs text-graphite">123Carbon-ready attribute registry.</div>
                  </div>
                </li>
              </ul>
            </div>
            <button className="w-full mt-6 py-3 border border-ink-black/20 rounded-full text-sm font-semibold text-ink-black hover:bg-mist-gray transition-colors">
              View Audit Trail
            </button>
          </div>
        </div>
      )}

      {activeTab === 'AIR' && (
        <div className="grid grid-cols-1 gap-6 animate-fade-in opacity-90">
          <div className="bg-pure-white rounded-[20px] p-8 border border-ink-black/10 shadow-[0_0_1px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.1)_inset] relative overflow-hidden">
             <div className="absolute top-8 right-8 bg-ink-black text-pure-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
              Strategic Extension / Q4 2026
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Plane size={28} className="text-forest-grove" />
              <h2 className="text-[24px] font-bold text-ink-black">Brazil – UAE Air Cargo Corridor</h2>
            </div>
            <p className="text-graphite text-sm max-w-2xl mb-8">
              Food security, cargo demand, Gulf aviation hubs and investment appetite. Integrating Sustainable Aviation Fuel (SAF) Book & Claim mechanics powered by the Pace-X and MeridianMRV engine.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-ink-black/10 p-5 rounded-2xl bg-mist-gray/30">
                <div className="w-10 h-10 bg-pure-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <span className="font-bold text-ink-black text-sm">01</span>
                </div>
                <h3 className="font-semibold text-ink-black mb-2">Air Corridor Data Module</h3>
                <p className="text-xs text-graphite">Airline/route emissions, CORSIA and ReFuelEU mandate workflow integrated directly into Pace-X.</p>
              </div>
              <div className="border border-ink-black/10 p-5 rounded-2xl bg-mist-gray/30">
                <div className="w-10 h-10 bg-pure-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <span className="font-bold text-ink-black text-sm">02</span>
                </div>
                <h3 className="font-semibold text-ink-black mb-2">SAF Supply Evidence</h3>
                <p className="text-xs text-graphite">MeridianMRV captures fuel production assets, certification (RSB/ISCC), and EUDR feedstock compliance.</p>
              </div>
              <div className="border border-ink-black/10 p-5 rounded-2xl bg-mist-gray/30">
                <div className="w-10 h-10 bg-pure-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <span className="font-bold text-ink-black text-sm">03</span>
                </div>
                <h3 className="font-semibold text-ink-black mb-2">Book & Claim Engine</h3>
                <p className="text-xs text-graphite">Cryptographically secure issuance and retirement of SAF attributes for cargo buyers (Scope 3).</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

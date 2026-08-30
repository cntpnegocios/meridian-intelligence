import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, ArrowRight, BarChart3, Target, Calculator, Coins, Satellite, Ship, Plane, Activity } from 'lucide-react';

const DynamicSatelliteTracker = () => {
  const [metrics, setMetrics] = useState({ co2: 12450, dist: 4120, fuel: 4500, eua: 840200 });

  // Simulador de dados em tempo real (Telemetry)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        co2: prev.co2 + Math.floor(Math.random() * 3),
        dist: prev.dist + Math.floor(Math.random() * 2),
        fuel: prev.fuel > 0 ? prev.fuel - Math.floor(Math.random() * 2) : 0,
        eua: prev.eua + Math.floor(Math.random() * 150)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-[#061110] overflow-hidden rounded-[20px] border border-mist-gray shadow-[0_20px_50px_rgba(11,131,92,0.15)] group">
      <style>{`
        @keyframes pan-orbit {
          0% { transform: translateX(-30px) translateY(10px); }
          50% { transform: translateX(30px) translateY(-5px); }
          100% { transform: translateX(-30px) translateY(10px); }
        }
        @keyframes fly-across {
          0% { transform: translate(-50px, 200px) scale(0.7); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translate(400px, 20px) scale(0.9); opacity: 0; }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        .radar-grid {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(11, 131, 92, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(11, 131, 92, 0.08) 1px, transparent 1px);
        }
      `}</style>

      {/* Radar Grid Background & Ambient Glow */}
      <div className="absolute inset-0 radar-grid opacity-80"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-forest-grove/20 rounded-full blur-[80px]"></div>

      {/* Animated SVG Connections (Scanning Lines) */}
      <svg className="absolute inset-0 w-full h-full z-10" style={{ filter: 'drop-shadow(0 0 3px rgba(11,131,92,0.8))' }}>
        {/* Beam to Ship */}
        <line x1="35%" y1="25%" x2="25%" y2="70%" stroke="#0b835c" strokeWidth="1.5" strokeDasharray="4 4" 
              style={{ animation: 'dash-flow 1s linear infinite' }} />
        {/* Beam to Plane (faint) */}
        <line x1="35%" y1="25%" x2="65%" y2="45%" stroke="#0b835c" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.3" />
        
        {/* End target dots */}
        <circle cx="25%" cy="70%" r="3" fill="#0b835c" className="animate-ping" />
      </svg>

      {/* Top Status Bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="text-[10px] font-mono text-pure-white/80 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-forest-grove animate-pulse"></span>
          Meridian Trace Live
        </div>
        <div className="text-[10px] font-mono text-forest-grove border border-forest-grove/30 bg-forest-grove/10 px-2 py-0.5 rounded animate-pulse">
          DLT SYNCED
        </div>
      </div>

      {/* Satellite (Orbital) */}
      <div className="absolute top-[18%] left-[30%] z-20 flex flex-col items-center" style={{ animation: 'pan-orbit 12s ease-in-out infinite' }}>
        <div className="bg-ink-black/80 backdrop-blur border border-forest-grove/40 p-2.5 rounded-xl mb-2 relative shadow-[0_0_15px_rgba(11,131,92,0.3)]">
           <Satellite size={22} className="text-forest-grove animate-[pulse_2s_infinite]" />
           <div className="absolute -top-1 -right-1 w-2 h-2 bg-pure-white rounded-full animate-ping"></div>
        </div>
        <span className="text-[9px] font-mono text-forest-grove/90 tracking-widest">PACE-X EYE</span>
      </div>

      {/* Airplane (Aviation Corridor passing by) */}
      <div className="absolute top-[40%] left-0 z-10" style={{ animation: 'fly-across 18s linear infinite' }}>
        <div className="flex items-center gap-2 text-pure-white/50">
          <Plane size={18} className="transform rotate-[35deg]" />
          <div className="bg-pure-white/5 backdrop-blur-sm border border-pure-white/10 px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest">
            Air Cargo SAF
          </div>
        </div>
      </div>

      {/* Ship (Maritime Corridor) */}
      <div className="absolute bottom-[22%] left-[15%] z-20 flex items-end gap-3 group-hover:scale-105 transition-transform duration-500">
        <div className="w-14 h-14 bg-[#0a1f1b] border-2 border-forest-grove/50 rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(11,131,92,0.4)]">
          <Ship size={24} className="text-pure-white" />
          <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-forest-grove border-2 border-[#061110] rounded-full flex items-center justify-center">
            <Activity size={10} className="text-pure-white animate-pulse" />
          </div>
        </div>
        <div className="pb-1 bg-ink-black/50 backdrop-blur-sm p-2 rounded-lg border border-pure-white/5">
          <div className="text-[9px] font-mono text-forest-grove mb-1 tracking-widest uppercase">Target Lock</div>
          <div className="text-xs font-bold text-pure-white tracking-wider">BR-UK EXPRESS</div>
        </div>
      </div>

      {/* Live Data HUD */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="bg-[#0a1f1b]/90 backdrop-blur-md border border-forest-grove/20 p-4 rounded-xl font-mono w-[200px] shadow-2xl">
          <div className="text-[9px] text-pure-white/50 uppercase tracking-widest mb-3 flex items-center justify-between">
            Live Telemetry
            <div className="w-1.5 h-1.5 bg-forest-grove rounded-full animate-ping"></div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-pure-white/70">CO2 EMISSION</span>
                <span className="text-[11px] font-bold text-pure-white">{metrics.co2.toLocaleString()}T</span>
              </div>
              <div className="w-full h-1 bg-pure-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-forest-grove w-[75%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-pure-white/70">VLSFO FUEL</span>
                <span className="text-[11px] font-bold text-amber-400">{metrics.fuel.toLocaleString()}T</span>
              </div>
              <div className="w-full h-1 bg-pure-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[45%]"></div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-forest-grove/20">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-pure-white/70">EU ETS EXPOSURE</span>
                <span className="text-[11px] font-bold text-forest-grove">€{metrics.eua.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-pure-white text-ink-black overflow-hidden flex flex-col font-geist">
      {/* Sticky Navigation Bar */}
      <nav className="w-full bg-pure-white border-b border-ink-black/10 sticky top-0 z-50 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="h-6 w-6 text-forest-grove" />
            <span className="font-semibold text-ink-black tracking-tight text-lg font-libre-caslon-text">MERIDIAN</span>
          </div>
          <div className="flex items-center gap-8 text-[14px] font-medium">
            <a href="#platform" className="text-graphite hover:text-forest-grove transition-colors">Air & Sea Platform</a>
            <a href="#corridors" className="text-graphite hover:text-forest-grove transition-colors">Green Corridors</a>
            <a href="#finops" className="text-graphite hover:text-forest-grove transition-colors">Tax FinOps</a>
            
            {/* Outlined Button Style */}
            <Link to="/login" className="px-6 py-2 bg-transparent border border-ink-black text-ink-black rounded-full font-medium hover:bg-mist-gray transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-6 relative z-10">
        
        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-grove bg-forest-grove/5 text-forest-grove text-[12px] uppercase tracking-[0.1em] font-semibold mb-8">
          The Pace-X & MeridianMRV Ecosystem
        </div>

        <div className="text-center max-w-[1200px] z-10 w-full flex flex-col lg:flex-row gap-16 items-center text-left">
          
          <div className="flex-1">
            {/* Hero Headline - Editorial Serif */}
            <h1 className="text-[56px] md:text-[76px] font-libre-caslon-text leading-[1.05] tracking-[-0.015em] text-ink-black mb-6">
              The Engine for <br/><span className="text-forest-grove">Air & Sea</span><br/> Green Corridors.
            </h1>
            
            {/* Hero Subhead */}
            <p className="text-[18px] md:text-[20px] font-medium text-graphite leading-[1.4] max-w-[500px] mb-10">
              Merging physical fleet optimization with immutable DLT provenance. Deploy SAF aviation routes and maritime pathways with 100% auditability.
            </p>
            
            <div className="flex items-center gap-4">
              {/* Filled Dark Button */}
              <Link to="/login" className="px-8 py-4 bg-ink-black text-pure-white rounded-full font-semibold text-[15px] flex items-center gap-2 shadow-lg hover:bg-forest-grove hover:shadow-xl transition-all duration-300">
                Enter Control Tower <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Dynamic Floating Product Mockup Card */}
          <div className="flex-1 w-full max-w-[540px] h-[480px] relative">
            <DynamicSatelliteTracker />
          </div>
          
        </div>

        {/* Feature Cards Showcase - 4 Pillars Framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] mt-[100px] max-w-[1200px] w-full z-10">
          <div className="bg-mist-gray/40 p-[32px] rounded-[24px] border border-ink-black/5 hover:bg-mist-gray hover:-translate-y-1 transition-all duration-300">
            <BarChart3 className="h-10 w-10 text-forest-grove mb-5" />
            <h3 className="text-[20px] font-bold text-ink-black mb-3 font-libre-caslon-text">1. Measure</h3>
            <p className="text-graphite text-[15px] leading-[1.5]">Ingest AIS tracking, operational data, and cargo details to establish an irrefutable emissions baseline.</p>
          </div>
          <div className="bg-mist-gray/40 p-[32px] rounded-[24px] border border-ink-black/5 hover:bg-mist-gray hover:-translate-y-1 transition-all duration-300">
            <Target className="h-10 w-10 text-forest-grove mb-5" />
            <h3 className="text-[20px] font-bold text-ink-black mb-3 font-libre-caslon-text">2. Optimise</h3>
            <p className="text-graphite text-[15px] leading-[1.5]">Simulate maritime pathways, aviation routes, and biofuel mixtures (SAF) for immediate operational efficiency.</p>
          </div>
          <div className="bg-mist-gray/40 p-[32px] rounded-[24px] border border-ink-black/5 hover:bg-mist-gray hover:-translate-y-1 transition-all duration-300">
            <Calculator className="h-10 w-10 text-forest-grove mb-5" />
            <h3 className="text-[20px] font-bold text-ink-black mb-3 font-libre-caslon-text">3. Forecast</h3>
            <p className="text-graphite text-[15px] leading-[1.5]">Translate consumption into real-time regulatory exposure for EU ETS, FuelEU Maritime, and CORSIA frameworks.</p>
          </div>
          <div className="bg-mist-gray/40 p-[32px] rounded-[24px] border border-ink-black/5 hover:bg-mist-gray hover:-translate-y-1 transition-all duration-300">
            <Coins className="h-10 w-10 text-forest-grove mb-5" />
            <h3 className="text-[20px] font-bold text-ink-black mb-3 font-libre-caslon-text">4. Monetise</h3>
            <p className="text-graphite text-[15px] leading-[1.5]">Secure Scope 3 insetting and asset provenance on DLT, protected from double-counting and fraud.</p>
          </div>
        </div>
      </main>
    </div>
  );
}


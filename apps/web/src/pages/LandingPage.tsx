import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Cloud, ArrowRight, BarChart3, Target, Calculator, Coins, Satellite, Ship, Plane, Activity, Globe } from 'lucide-react';

const GdprBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show banner after short delay for impact
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[900px] bg-ink-black text-pure-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 border border-pure-white/10 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-forest-grove/20 rounded-full shrink-0">
          <ShieldCheck size={20} className="text-forest-grove" />
        </div>
        <div>
          <div className="text-sm font-bold mb-1 font-libre-caslon-text tracking-wide">Strict Privacy & GDPR Compliance</div>
          <div className="text-xs text-pure-white/60 leading-relaxed max-w-xl">
            Meridian Trace uses essential operational cookies and DLT nodes to securely process maritime and aviation emissions data in accordance with EU GDPR and LGPD frameworks. 
            <Link to="/legal/privacy" className="text-forest-grove hover:underline ml-1">Learn more</Link>
          </div>
        </div>
      </div>
      <div className="flex gap-3 shrink-0 w-full md:w-auto mt-4 md:mt-0">
         <button onClick={() => setIsVisible(false)} className="flex-1 md:flex-none px-6 py-2.5 text-xs font-semibold rounded-full border border-pure-white/20 hover:bg-pure-white/10 transition-colors">Preferences</button>
         <button onClick={() => setIsVisible(false)} className="flex-1 md:flex-none px-6 py-2.5 text-xs font-semibold rounded-full bg-forest-grove text-pure-white shadow-lg shadow-forest-grove/20 hover:bg-[#096b4b] transition-colors">Accept All</button>
      </div>
    </div>
  )
}

// Importing ShieldCheck manually since I used it inside GdprBanner
import { ShieldCheck } from 'lucide-react';


const DynamicSatelliteTracker = () => {
  const [metrics, setMetrics] = useState({ co2: 12450, dist: 4120, fuel: 4500, eua: 840200 });

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

      {/* Animated SVG Connections */}
      <svg className="absolute inset-0 w-full h-full z-10" style={{ filter: 'drop-shadow(0 0 3px rgba(11,131,92,0.8))' }}>
        <line x1="35%" y1="25%" x2="25%" y2="70%" stroke="#0b835c" strokeWidth="1.5" strokeDasharray="4 4" 
              style={{ animation: 'dash-flow 1s linear infinite' }} />
        <line x1="35%" y1="25%" x2="65%" y2="45%" stroke="#0b835c" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.3" />
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

      {/* Airplane */}
      <div className="absolute top-[40%] left-0 z-10" style={{ animation: 'fly-across 18s linear infinite' }}>
        <div className="flex items-center gap-2 text-pure-white/50">
          <Plane size={18} className="transform rotate-[35deg]" />
          <div className="bg-pure-white/5 backdrop-blur-sm border border-pure-white/10 px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest">
            Air Cargo SAF
          </div>
        </div>
      </div>

      {/* Ship */}
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
    <div className="min-h-screen bg-pure-white text-ink-black overflow-hidden flex flex-col font-geist relative">
      <GdprBanner />

      {/* Sticky Navigation Bar */}
      <nav className="w-full bg-pure-white border-b border-ink-black/10 sticky top-0 z-50 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="h-6 w-6 text-forest-grove" />
            <span className="font-semibold text-ink-black tracking-tight text-lg font-libre-caslon-text">MERIDIAN</span>
          </div>
          <div className="flex items-center gap-8 text-[14px] font-medium hidden md:flex">
            <a href="#platform" className="text-graphite hover:text-forest-grove transition-colors">Air & Sea Platform</a>
            <a href="#corridors" className="text-graphite hover:text-forest-grove transition-colors">Green Corridors</a>
            <a href="#finops" className="text-graphite hover:text-forest-grove transition-colors">Tax FinOps</a>
          </div>
          <Link to="/login" className="px-6 py-2 bg-transparent border border-ink-black text-ink-black rounded-full font-medium hover:bg-mist-gray transition-all">
            Sign In
          </Link>
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
            <h1 className="text-[56px] md:text-[76px] font-libre-caslon-text leading-[1.05] tracking-[-0.015em] text-ink-black mb-6">
              The Engine for <br/><span className="text-forest-grove">Air & Sea</span><br/> Green Corridors.
            </h1>
            <p className="text-[18px] md:text-[20px] font-medium text-graphite leading-[1.4] max-w-[500px] mb-10">
              Merging physical fleet optimization with immutable DLT provenance. Deploy SAF aviation routes and maritime pathways with 100% auditability.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/login" className="px-8 py-4 bg-ink-black text-pure-white rounded-full font-semibold text-[15px] flex items-center gap-2 shadow-lg hover:bg-forest-grove hover:shadow-xl transition-all duration-300">
                Enter Control Tower <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-[540px] h-[480px] relative mt-10 lg:mt-0">
            <DynamicSatelliteTracker />
          </div>
          
        </div>

        {/* Feature Cards Showcase */}
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

      {/* Expanded Enterprise App-Like Footer */}
      <footer className="w-full bg-ink-black text-pure-white py-20 px-6 mt-auto">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Anchor className="h-8 w-8 text-forest-grove" />
              <span className="font-semibold tracking-tight text-2xl font-libre-caslon-text">MERIDIAN</span>
            </div>
            <p className="text-pure-white/60 text-sm max-w-[280px] leading-relaxed mb-8">
              The global intelligence engine for Air & Sea Green Corridors. Cryptographic auditability powered by Pace-X and MeridianMRV.
            </p>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-forest-grove uppercase tracking-widest px-3 py-1.5 border border-forest-grove/30 rounded-full bg-forest-grove/5">
              <span className="w-2 h-2 rounded-full bg-forest-grove animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-pure-white mb-6 uppercase tracking-widest text-[11px] font-mono">Platform</h4>
            <ul className="space-y-4 text-[13px] text-pure-white/60 font-medium">
              <li><Link to="/login" className="hover:text-forest-grove transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-forest-grove"/> Operator Control Tower</Link></li>
              <li><Link to="/login" className="hover:text-forest-grove transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-forest-grove"/> Shipper Intelligence</Link></li>
              <li><Link to="/login" className="hover:text-forest-grove transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-forest-grove"/> Tax FinOps Engine</Link></li>
              <li><Link to="/login" className="hover:text-forest-grove transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-forest-grove"/> Evidence Vault (DLT)</Link></li>
              <li><Link to="/api-docs" className="hover:text-forest-grove text-forest-grove font-bold transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-forest-grove"/> Developer API Gateway</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-pure-white mb-6 uppercase tracking-widest text-[11px] font-mono">Compliance & Law</h4>
            <ul className="space-y-4 text-[13px] text-pure-white/60 font-medium">
              <li><Link to="/regulatory" className="hover:text-forest-grove transition-colors text-pure-white flex items-center gap-2"><Globe size={14} className="text-forest-grove"/> Global Jurisdictions</Link></li>
              <li><Link to="/regulatory" className="hover:text-forest-grove transition-colors">IMO / MARPOL Framework</Link></li>
              <li><Link to="/regulatory" className="hover:text-forest-grove transition-colors">EU ETS & FuelEU Maritime</Link></li>
              <li><Link to="/regulatory" className="hover:text-forest-grove transition-colors">UK MRV / ETS</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-pure-white mb-6 uppercase tracking-widest text-[11px] font-mono">Legal Portals</h4>
            <ul className="space-y-4 text-[13px] text-pure-white/60 font-medium">
              <li><Link to="/legal/privacy" className="hover:text-forest-grove transition-colors">GDPR & Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="hover:text-forest-grove transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/security" className="hover:text-forest-grove transition-colors">Security & Trust Center</Link></li>
            </ul>
          </div>

        </div>

                <div className="max-w-[1200px] mx-auto mt-20 pt-8 border-t border-pure-white/10 text-[12px] text-pure-white/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© 2026 MeridianMRV Limited. Registration No. 1475892.</p>
            <div className="hidden md:block w-1 h-1 bg-pure-white/20 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Cloud size={14} className="text-[#F38020]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-pure-white/60">Protected by Cloudflare Enterprise</span>
            </div>
          </div>
          <div className="flex gap-8 font-medium">
            <Link to="/legal/privacy" className="hover:text-pure-white transition-colors">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-pure-white transition-colors">Terms</Link>
            <Link to="/legal/security" className="hover:text-pure-white transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}



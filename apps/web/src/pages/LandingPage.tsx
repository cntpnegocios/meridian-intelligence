import { Link } from 'react-router-dom';
import { Anchor, ShieldCheck, Cpu, Globe2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-pure-white text-ink-black overflow-hidden flex flex-col font-geist">
      {/* Sticky Navigation Bar */}
      <nav className="w-full bg-pure-white border-b border-ink-black/10 sticky top-0 z-50 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="h-6 w-6 text-forest-grove" />
            <span className="font-semibold text-ink-black tracking-tight text-lg">MERIDIAN</span>
          </div>
          <div className="flex items-center gap-8 text-[14px] font-medium">
            <a href="#features" className="text-graphite hover:text-forest-grove transition-colors">Platform</a>
            <a href="#compliance" className="text-graphite hover:text-forest-grove transition-colors">EU MRV</a>
            <a href="#finops" className="text-graphite hover:text-forest-grove transition-colors">FinOps</a>
            
            {/* Outlined Button Style */}
            <Link to="/login" className="px-6 py-2 bg-transparent border border-ink-black text-ink-black rounded-full font-medium hover:bg-mist-gray transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Top Announcement Banner (Simulado com um padding superior no Main para respirar) */}
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-24 pb-20 px-6 relative z-10">
        
        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-grove bg-transparent text-forest-grove text-[12px] uppercase tracking-[0.1em] font-semibold mb-8">
          Powered by Greensee AI Engine
        </div>

        <div className="text-center max-w-[1200px] z-10 w-full flex flex-col lg:flex-row gap-12 items-center text-left">
          
          <div className="flex-1">
            {/* Hero Headline - Editorial Serif */}
            <h1 className="text-[64px] md:text-[92px] font-libre-caslon-text leading-[1.2] tracking-[-0.011em] text-ink-black mb-6">
              Meet <span className="text-forest-grove">Meridian Trace</span>.<br />
              The AI for MRV.
            </h1>
            
            {/* Hero Subhead */}
            <p className="text-[18px] md:text-[20px] font-medium text-ink-black leading-[1.25] max-w-[520px] mb-10">
              The ultimate digital twin platform. MRV Emissions, Cryptographic Audit, Predictive Routing, and Tax FinOps in a single ecosystem.
            </p>
            
            <div className="flex items-center gap-4">
              {/* Filled Dark Button */}
              <Link to="/login" className="px-6 py-3 bg-ink-black text-pure-white rounded-full font-medium text-[14px] flex items-center gap-2 shadow-[0_1px_1px_0_rgba(0,0,0,0.15),_0_1px_2px_0_rgba(255,255,255,0.75)_inset] hover:opacity-90 transition-opacity">
                Enter Environment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Floating Product Mockup Card */}
          <div className="flex-1 w-full max-w-lg">
            <div 
              className="rounded-[20px] p-6 shadow-[0_0_1px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.25)_inset] border border-mist-gray h-[450px] relative overflow-hidden flex flex-col justify-end"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(28,43,39,0.3), rgba(28,43,39,0.7)), url("https://images.unsplash.com/photo-1580674684081-7767dc31d8f5?q=80&w=1000&auto=format&fit=crop")`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              {/* Fake UI inside the card */}
              <div className="absolute top-6 left-6 text-xs text-pure-white/80 font-mono tracking-wider uppercase flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-forest-grove animate-pulse"></span> Satellite Tracker</div>
              <div className="space-y-4 w-full">
                <div className="bg-mist-gray text-ink-black p-4 rounded-[20px] rounded-bl-none text-[16px] leading-[1.5] w-3/4">
                  Bunker Delivery Note analyzed. 4,500 Tons of VLSFO detected.
                </div>
                <div className="bg-forest-grove text-pure-white p-4 rounded-[20px] rounded-br-none text-[16px] leading-[1.5] w-3/4 self-end ml-auto shadow-sm">
                  Proceed with EU ETS taxation assessment.
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Feature Cards Showcase - Mist Gray Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mt-[80px] max-w-[1200px] w-full z-10">
          <div className="bg-mist-gray p-[24px] rounded-[20px]">
            <ShieldCheck className="h-8 w-8 text-forest-grove mb-4" />
            <h3 className="text-[20px] font-semibold text-ink-black mb-2">Official Compliance</h3>
            <p className="text-graphite text-[14px] leading-[1.5]">Automated generation of MRV and DCS reports. On-site auditing protected by SHA-256 cryptography.</p>
          </div>
          <div className="bg-mist-gray p-[24px] rounded-[20px]">
            <Cpu className="h-8 w-8 text-forest-grove mb-4" />
            <h3 className="text-[20px] font-semibold text-ink-black mb-2">Document Intelligence</h3>
            <p className="text-graphite text-[14px] leading-[1.5]">AI that reads physical Bunker Delivery Notes (BDN) at ports to prevent density and sulfur fraud.</p>
          </div>
          <div className="bg-mist-gray p-[24px] rounded-[20px]">
            <Globe2 className="h-8 w-8 text-forest-grove mb-4" />
            <h3 className="text-[20px] font-semibold text-ink-black mb-2">Tax FinOps</h3>
            <p className="text-graphite text-[14px] leading-[1.5]">Real-time translation of emissions into Euro invoices based on the European carbon market.</p>
          </div>
        </div>
      </main>
    </div>
  );
}




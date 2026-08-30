import { Anchor, ShieldCheck, Scale, Globe, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegulatoryFramework() {
  return (
    <div className="min-h-screen bg-pure-white text-ink-black overflow-hidden flex flex-col font-geist">
      {/* Navigation */}
      <nav className="w-full bg-pure-white border-b border-ink-black/10 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="h-6 w-6 text-forest-grove" />
            <Link to="/" className="font-semibold text-ink-black tracking-tight text-lg font-libre-caslon-text hover:text-forest-grove transition-colors">MERIDIAN</Link>
          </div>
          <Link to="/" className="flex items-center gap-2 text-[14px] font-medium text-graphite hover:text-forest-grove transition-colors">
            <ArrowLeft size={16} /> Back to Platform
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-20">
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-grove bg-forest-grove/5 text-forest-grove text-[12px] uppercase tracking-[0.1em] font-semibold mb-6">
            Meridian Trace Legal Intelligence
          </div>
          <h1 className="text-[48px] md:text-[64px] font-libre-caslon-text leading-[1.1] tracking-[-0.015em] text-ink-black mb-6">
            Global Regulatory <br/><span className="text-forest-grove">Frameworks.</span>
          </h1>
          <p className="text-[18px] md:text-[20px] font-medium text-graphite leading-[1.4]">
            Meridian Trace actively monitors, calculates, and enforces compliance across overlapping international, European, British, and Brazilian jurisdictions.
          </p>
        </div>

        {/* The Grid of Legal Agents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Maritime Law Agent */}
          <div className="bg-mist-gray/40 p-10 rounded-[24px] border border-ink-black/5 hover:bg-mist-gray transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-pure-white rounded-2xl shadow-sm border border-ink-black/5">
                <Globe className="h-8 w-8 text-forest-grove" />
              </div>
              <div>
                <h2 className="text-[24px] font-bold text-ink-black font-libre-caslon-text">International Maritime Law</h2>
                <div className="text-xs font-mono uppercase tracking-widest text-graphite mt-1">Global Jurisdiction</div>
              </div>
            </div>
            <ul className="space-y-4 text-[15px] text-graphite">
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>IMO Data Collection System (DCS):</strong> Automated baseline consumption reporting.</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>MARPOL Annex VI:</strong> Real-time fuel sulfur limit tracking (SECA/ECA zones).</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>UNCLOS:</strong> Territorial waters routing and high-seas boundary logic.</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>CORSIA:</strong> Ready architecture for global aviation carbon offsetting.</span></li>
            </ul>
          </div>

          {/* EU Regulatory Agent */}
          <div className="bg-mist-gray/40 p-10 rounded-[24px] border border-ink-black/5 hover:bg-mist-gray transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-pure-white rounded-2xl shadow-sm border border-ink-black/5">
                <Scale className="h-8 w-8 text-forest-grove" />
              </div>
              <div>
                <h2 className="text-[24px] font-bold text-ink-black font-libre-caslon-text">European Union (EU)</h2>
                <div className="text-xs font-mono uppercase tracking-widest text-graphite mt-1">EU Commission Directives</div>
              </div>
            </div>
            <ul className="space-y-4 text-[15px] text-graphite">
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>EU ETS Maritime:</strong> Real-time EUA (Carbon Allowance) liability forecasting for voyages into/out of EEA ports.</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>FuelEU Maritime:</strong> Well-to-Wake greenhouse gas intensity calculations and pooling.</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>EU MRV (2015/757):</strong> Accredited reporting templates for CO2 emissions.</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>EUDR / CBAM:</strong> Zero-deforestation biomass feedstock tracking for SAF and Marine Biofuels.</span></li>
            </ul>
          </div>

          {/* UK Regulatory Agent */}
          <div className="bg-mist-gray/40 p-10 rounded-[24px] border border-ink-black/5 hover:bg-mist-gray transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-pure-white rounded-2xl shadow-sm border border-ink-black/5">
                <ShieldCheck className="h-8 w-8 text-forest-grove" />
              </div>
              <div>
                <h2 className="text-[24px] font-bold text-ink-black font-libre-caslon-text">United Kingdom (UK)</h2>
                <div className="text-xs font-mono uppercase tracking-widest text-graphite mt-1">UK Government Framework</div>
              </div>
            </div>
            <ul className="space-y-4 text-[15px] text-graphite">
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>UK MRV:</strong> Parallel monitoring and reporting for voyages calling at UK ports.</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>UK ETS:</strong> Separate ledger and financial hedging for UK Allowances (UKA).</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>Cross-Border Reconciliation:</strong> Automated subtraction logic between UK and EU jurisdictions.</span></li>
            </ul>
          </div>

          {/* Brazil Regulatory Agent */}
          <div className="bg-mist-gray/40 p-10 rounded-[24px] border border-ink-black/5 hover:bg-mist-gray transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-pure-white rounded-2xl shadow-sm border border-ink-black/5">
                <FileText className="h-8 w-8 text-forest-grove" />
              </div>
              <div>
                <h2 className="text-[24px] font-bold text-ink-black font-libre-caslon-text">Brazil & Mercosur</h2>
                <div className="text-xs font-mono uppercase tracking-widest text-graphite mt-1">Origin Market Framework</div>
              </div>
            </div>
            <ul className="space-y-4 text-[15px] text-graphite">
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>Agri-Export Corridors:</strong> Origin tracking for soy, corn, and meat exports ensuring compliance with European buyers.</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>Biofuel Feedstock (RenovaBio):</strong> Auditing local SAF and Methanol production chains (ethanol/biomass).</span></li>
              <li className="flex gap-3"><ArrowRight size={18} className="text-forest-grove shrink-0 mt-0.5" /> <span><strong>IBAMA / Environmental:</strong> Integration with local environmental registries for holistic asset provenance.</span></li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}

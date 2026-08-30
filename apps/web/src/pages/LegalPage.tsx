import { useParams, Link } from 'react-router-dom';
import { Shield, FileText, Lock, ArrowLeft, Anchor } from 'lucide-react';

export default function LegalPage() {
  const { document } = useParams();
  
  let title = "Legal Portal";
  let icon = <FileText size={32} className="text-forest-grove" />;
  
  if (document === 'privacy') {
    title = "GDPR & Privacy Policy";
    icon = <Shield size={32} className="text-forest-grove" />;
  } else if (document === 'security') {
    title = "Security & Trust Center";
    icon = <Lock size={32} className="text-forest-grove" />;
  } else if (document === 'terms') {
    title = "Terms of Service";
    icon = <FileText size={32} className="text-forest-grove" />;
  }

  return (
    <div className="min-h-screen bg-pure-white text-ink-black font-geist flex flex-col">
      <nav className="w-full bg-pure-white border-b border-ink-black/10 py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Anchor className="h-6 w-6 text-forest-grove" />
            <Link to="/" className="font-semibold text-ink-black tracking-tight text-lg font-libre-caslon-text hover:text-forest-grove transition-colors">MERIDIAN</Link>
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-graphite hover:text-forest-grove transition-colors">
          <ArrowLeft size={16} /> Return to Platform
        </Link>
      </nav>
      
      <main className="flex-1 max-w-[800px] mx-auto w-full py-20 px-6">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-grove/30 bg-forest-grove/5 text-forest-grove text-[10px] uppercase tracking-[0.1em] font-semibold mb-8">
            Legal & Governance Portal
         </div>
         <div className="mb-6">{icon}</div>
         <h1 className="text-4xl md:text-5xl font-libre-caslon-text font-bold mb-8 text-ink-black">{title}</h1>
         
         <div className="prose prose-sm max-w-none text-graphite space-y-6 text-[15px] leading-relaxed">
           <p className="font-mono text-xs uppercase tracking-widest text-ink-black">Effective Date: August 30, 2026</p>
           
           <hr className="border-ink-black/10 my-8" />
           
           <p>This portal outlines the compliance and governance mechanisms of Meridian Trace regarding data handling, cryptographic evidence, and cross-border regulatory adherence.</p>
           
           {document === 'privacy' && (
             <>
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">1. EU GDPR & LGPD Compliance</h3>
               <p>MeridianMRV operates as a data processor for maritime and aviation entities. All operational telemetry (AIS, BDN, fuel consumption) is processed within strictly segregated tenant environments to comply with the European General Data Protection Regulation (GDPR) and the Brazilian General Data Protection Law (LGPD).</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">2. Data Residency & Cryptography</h3>
               <p>Primary processing occurs in EU-compliant servers. Distributed Ledger Technology (DLT) cryptographic proofs are stored immutably on networks ensuring zero tampering, while still respecting the right-to-erasure for Personally Identifiable Information (PII) by keeping personal data off-chain.</p>
             </>
           )}
           
           {document !== 'privacy' && (
             <>
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">1. Corporate Governance & SaaS Agreement</h3>
               <p>By accessing the Meridian Trace Control Tower, the Pace-X ecosystem, or any connected API endpoints, organizations agree to the enterprise service level agreements (SLA) and our strict zero-tolerance policy against environmental emissions fraud.</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">2. Regulatory Liability</h3>
               <p>Calculations provided for EU ETS, FuelEU Maritime, UK MRV, and CORSIA are based on real-time legislative formulas. However, the final liability and retirement of carbon allowances (EUAs, UKAs) remain the sole responsibility of the Document of Compliance (DOC) holder.</p>
             </>
           )}
         </div>
      </main>
      
      <footer className="py-8 text-center text-xs text-graphite border-t border-ink-black/5 mt-auto">
        © 2026 MeridianMRV Limited. Designed for CCV & Pace-X ecosystem.
      </footer>
    </div>
  )
}

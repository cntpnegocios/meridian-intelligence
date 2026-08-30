import { useParams, Link } from 'react-router-dom';
import { Shield, FileText, Lock, ArrowLeft, Anchor, Cloud, Server } from 'lucide-react';

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
           
           {document === 'privacy' && (
             <>
               <p>This Privacy Policy outlines how MeridianMRV Limited ("Meridian", "we", "us") handles data within the Meridian Trace platform, in strict adherence to international frameworks.</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">1. Data Controller and Processor Relationship</h3>
               <p>Under the European General Data Protection Regulation (GDPR) (EU) 2016/679 and the Brazilian General Data Protection Law (LGPD), MeridianMRV Limited acts primarily as a <strong>Data Processor</strong>. Our enterprise clients (Shippers, Port Authorities, and Fleet Operators) act as the <strong>Data Controllers</strong>. We process operational telemetry, including Bunker Delivery Notes (BDNs) and AIS tracking coordinates, strictly under the instructions of the Controller for MRV compliance purposes.</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">2. Sub-processors and Infrastructure</h3>
               <p>To ensure high availability and security, Meridian Trace utilizes enterprise-grade sub-processors. Global traffic routing, Web Application Firewall (WAF), and DDoS protection are handled by <strong>Cloudflare, Inc.</strong> Core application hosting is distributed across ISO 27001 certified data centers. A full list of sub-processors is available upon request by verified tenant administrators.</p>

               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">3. Data Retention and DLT Immutability</h3>
               <p>Operational data is retained for the duration of the active SaaS agreement. Cryptographic hashes representing emissions evidence are stored immutably on Distributed Ledger Technology (DLT) for permanent auditability. Crucially, these hashes do not contain plain-text Personally Identifiable Information (PII), thereby respecting the Right to Erasure (Article 17 GDPR) while maintaining environmental accountability.</p>
             </>
           )}
           
           {document === 'terms' && (
             <>
               <p>These Terms of Service govern your access to the Meridian Trace Control Tower, Pace-X ecosystem tools, and related APIs.</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">1. Enterprise Service Level Agreement (SLA)</h3>
               <p>MeridianMRV guarantees a 99.9% uptime for the Meridian Trace Control Tower and active endpoints, backed by Cloudflare enterprise edge routing. Scheduled maintenance windows will be communicated to tenant administrators at least 48 hours in advance. Emergency security patches may be deployed with zero-downtime clustering.</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">2. Regulatory and Tax Liability Exemption</h3>
               <p>The Meridian Trace platform provides estimations, forecasts, and real-time calculations regarding EU ETS liabilities, FuelEU Maritime penalties, UK MRV requirements, and CORSIA baselines based on proprietary routing algorithms. However, MeridianMRV Limited is a technology provider, not a tax or legal advisory firm. The final legal obligation to surrender European Union Allowances (EUAs) or UK Allowances (UKAs) rests entirely and exclusively with the registered Document of Compliance (DOC) holder of the vessel or aircraft.</p>

               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">3. Governing Law and Jurisdiction</h3>
               <p>These Terms of Service shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of or in connection with this agreement shall be subject to the exclusive jurisdiction of the courts of London, United Kingdom.</p>
             </>
           )}

           {document === 'security' && (
             <>
               <p>The Security & Trust Center details the architectural safeguards protecting Meridian Trace's operational and financial data environments.</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">1. Edge Security and WAF</h3>
               <p>All inbound traffic to the Meridian Trace ecosystem is proxied through <strong>Cloudflare Enterprise</strong>. This layer provides immediate, automated mitigation against Layer 3, 4, and 7 DDoS attacks, and enforces rigorous Web Application Firewall (WAF) rulesets to prevent SQL injection, cross-site scripting (XSS), and zero-day vulnerabilities.</p>
               
               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">2. Cryptographic Proof of Emissions (DLT)</h3>
               <p>MeridianMRV differentiates itself by anchoring physical consumption data (BDNs, AIS logs, EUDR certificates) into a decentralized ledger. Every MRV report generated by the system is signed with a SHA-256 hash. This guarantees to European and British regulators that the data has not been tampered with post-ingestion, virtually eliminating document fraud in maritime and aviation supply chains.</p>

               <h3 className="text-xl font-bold text-ink-black mt-10 mb-4 font-libre-caslon-text">3. Zero-Trust Architecture</h3>
               <p>Our internal microservices operate on a strict Zero-Trust network topology. API calls between the calculation engine and the MeridianMRV evidence vault require mutual TLS (mTLS) authentication. User access is explicitly gated by granular Role-Based Access Control (RBAC) and mandatory Multi-Factor Authentication (MFA) via SSO.</p>
             </>
           )}
         </div>

         {/* Security Badges */}
         <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-16 pt-8 border-t border-ink-black/10">
           <div className="flex items-center gap-3 bg-mist-gray/50 px-4 py-2 rounded-xl border border-ink-black/5">
             <Cloud size={24} className="text-[#F38020]" />
             <div>
               <div className="text-[10px] font-mono uppercase tracking-widest text-graphite mb-0.5">Network Security</div>
               <div className="text-xs font-bold text-ink-black">Cloudflare Enterprise Secured</div>
             </div>
           </div>
           <div className="flex items-center gap-3 bg-mist-gray/50 px-4 py-2 rounded-xl border border-ink-black/5">
             <Server size={24} className="text-forest-grove" />
             <div>
               <div className="text-[10px] font-mono uppercase tracking-widest text-graphite mb-0.5">Data Integrity</div>
               <div className="text-xs font-bold text-ink-black">SHA-256 DLT Cryptography</div>
             </div>
           </div>
         </div>
      </main>
      
      <footer className="py-8 text-center text-xs text-graphite border-t border-ink-black/5 mt-auto">
        © 2026 MeridianMRV Limited. Designed for CCV & Pace-X ecosystem.
      </footer>
    </div>
  )
}

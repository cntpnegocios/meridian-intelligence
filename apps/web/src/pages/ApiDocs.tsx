import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, ChevronDown, ChevronUp } from 'lucide-react';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const methodStyles: Record<Method, { bg: string; border: string; text: string; badge: string }> = {
  GET: { bg: 'bg-[#ebf3fb]', border: 'border-[#61affe]', text: 'text-[#3b4151]', badge: 'bg-[#61affe]' },
  POST: { bg: 'bg-[#e8f6f0]', border: 'border-[#49cc90]', text: 'text-[#3b4151]', badge: 'bg-[#49cc90]' },
  PUT: { bg: 'bg-[#fbf1e6]', border: 'border-[#fca130]', text: 'text-[#3b4151]', badge: 'bg-[#fca130]' },
  DELETE: { bg: 'bg-[#fae7e7]', border: 'border-[#f93e3e]', text: 'text-[#3b4151]', badge: 'bg-[#f93e3e]' },
};

const Endpoint = ({ method, path, summary }: { method: Method; path: string; summary: string }) => {
  const styles = methodStyles[method];
  return (
    <div className={`flex items-center justify-between border ${styles.border} ${styles.bg} rounded-[4px] mb-3 p-1.5 transition-all hover:bg-opacity-80 cursor-pointer`}>
      <div className="flex items-center gap-4">
        <div className={`${styles.badge} text-white font-bold text-[14px] px-2 py-1.5 rounded-[3px] w-[80px] text-center shrink-0`}>
          {method}
        </div>
        <div className="font-mono text-[15px] font-bold text-[#3b4151]">{path}</div>
        <div className="text-[13px] text-[#3b4151] font-sans hidden md:block">{summary}</div>
      </div>
      <div className="flex items-center gap-4 pr-3 opacity-60">
        <Lock size={16} />
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

const ApiGroup = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center border-b border-[#3b4151]/20 pb-2 mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[24px] font-bold text-[#3b4151] capitalize">{title}</h2>
        <div className="opacity-50">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
      {isOpen && <div className="pl-2">{children}</div>}
    </div>
  );
};

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-white text-[#3b4151] font-sans">
      {/* Fake Meridian Header */}
      <nav className="w-full bg-[#1c2b27] py-3 px-6 flex justify-between items-center text-white">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold hover:text-[#0b835c] transition-colors">
            <ArrowLeft size={16} /> Back to Platform
          </Link>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <span className="font-semibold tracking-widest text-sm font-mono">MERIDIAN API GATEWAY</span>
        </div>
      </nav>

      <main className="max-w-[1460px] mx-auto w-full py-10 px-4 md:px-8">
        
        {/* Swagger Header */}
        <div className="mb-10">
          <h1 className="text-[36px] font-bold text-[#3b4151] mb-2 flex items-center gap-3">
            Meridian Trace API 
            <span className="bg-[#89bf04] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full align-middle">v1.3.0</span>
            <span className="bg-[#49cc90] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full align-middle">OAS3</span>
          </h1>
          <p className="text-[14px] text-[#3b4151] mb-4 max-w-4xl leading-relaxed">
            Documentation API for anchoring emissions data to DLT, processing Bunker Delivery Notes via AI, and hedging EU ETS liabilities. 
            Designed to seamlessly integrate with <strong>Pace-X</strong> and other routing optimization solutions.
            Compliant with ISO 27001, SOC2, and secured by Cloudflare Enterprise mTLS.
          </p>
          <a href="#" className="text-[#4990e2] text-[13px] hover:underline font-mono block mb-6">/openapi.json</a>

          <div className="flex items-center justify-between border-t border-[#3b4151]/10 pt-6">
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-bold text-[#3b4151]">Servers</span>
              <select className="border border-[#3b4151]/30 rounded px-4 py-2 text-[14px] text-[#3b4151] min-w-[300px] bg-white shadow-sm outline-none focus:border-[#49cc90]">
                <option>https://api.meridiantrace.com/v1 - Production Environment</option>
                <option>https://sandbox.meridiantrace.com/v1 - Sandbox</option>
              </select>
            </div>
            <button className="flex items-center gap-2 border-2 border-[#49cc90] text-[#49cc90] px-6 py-2 rounded-[4px] font-bold text-[14px] hover:bg-[#49cc90]/10 transition-colors">
              Authorize <Lock size={16} className="mb-0.5" />
            </button>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mt-8">
          
          <ApiGroup title="evidence-vault">
            <Endpoint method="POST" path="/dlt/anchor-report" summary="Anchor MRV report (JSON) to cryptographic DLT ledger" />
            <Endpoint method="GET" path="/dlt/verify/{hash}" summary="Verify cryptographic proof of an anchored emission document" />
            <Endpoint method="GET" path="/dlt/certificates/eudr" summary="Retrieve zero-deforestation (EUDR) certificates for SAF/Biofuel batches" />
          </ApiGroup>

          <ApiGroup title="tax-finops">
            <Endpoint method="GET" path="/liability/eu-ets/forecast" summary="Forecast EU ETS EUA liability based on Pace-X routing data" />
            <Endpoint method="GET" path="/liability/fueleu/compliance" summary="Check FuelEU Maritime compliance and penalty pooling" />
            <Endpoint method="POST" path="/hedge/eua/lock" summary="Lock a hedging position for EUA carbon allowances" />
          </ApiGroup>

          <ApiGroup title="document-intelligence">
            <Endpoint method="POST" path="/bdn/scan" summary="Upload and extract VLSFO/Methanol data from a physical Bunker Delivery Note via AI" />
            <Endpoint method="GET" path="/bdn/{id}/fraud-check" summary="Run forensic anomaly detection on a digitized BDN" />
          </ApiGroup>

          <ApiGroup title="aviation-corridors">
            <Endpoint method="POST" path="/saf/book-and-claim" summary="Register Sustainable Aviation Fuel (SAF) attributes for cargo insetting" />
            <Endpoint method="GET" path="/corsia/baseline" summary="Retrieve CORSIA emissions baseline for a specific flight corridor" />
          </ApiGroup>

          <ApiGroup title="pace-x-integrations">
            <Endpoint method="POST" path="/webhooks/route-optimized" summary="Receive optimized routing telemetry from Greensee / Pace-X" />
            <Endpoint method="GET" path="/sync/vessel-telemetry" summary="Sync real-time vessel IoT telemetry with the Evidence Vault" />
          </ApiGroup>

        </div>
      </main>
    </div>
  );
}

import { useParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';

export default function EuMrvReport() {
  const { id } = useParams();

  // Trigger print dialog on load
  useEffect(() => {
    // A small delay to let styles apply
    const timer = setTimeout(() => {
      window.print();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans print:bg-white print:m-0 print:p-0">
      <div className="max-w-[800px] mx-auto p-12 bg-white print:p-0 print:max-w-none">
        
        {/* EU Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2 uppercase tracking-wide">European Commission</h1>
            <h2 className="text-xl font-serif text-gray-700">MRV Emission Report</h2>
            <div className="text-sm font-mono mt-2 uppercase tracking-widest text-gray-500">Regulation (EU) 2015/757</div>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-[#003399] flex items-center justify-center rounded-sm mb-2 ml-auto">
              {/* Fake EU stars */}
              <div className="text-yellow-400 text-3xl leading-none font-serif">*</div>
            </div>
            <div className="text-xs font-mono font-bold">Doc No: {id}</div>
            <div className="text-xs font-mono">Date: {new Date().toISOString().split('T')[0]}</div>
          </div>
        </div>

        {/* Section 1: Vessel Details */}
        <h3 className="text-lg font-bold font-serif uppercase border-b border-gray-300 pb-2 mb-4 bg-gray-50 p-2">Part A: Vessel Data</h3>
        <table className="w-full text-sm mb-10 border-collapse">
          <tbody>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Vessel Name</td><td className="py-3 font-mono font-bold">MSC GULSUN</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">IMO Number</td><td className="py-3 font-mono">9839430</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Flag State</td><td className="py-3 font-mono">Panama (PAN)</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Ship Type</td><td className="py-3 font-mono">Container Ship</td></tr>
          </tbody>
        </table>

        {/* Section 2: Voyage Details */}
        <h3 className="text-lg font-bold font-serif uppercase border-b border-gray-300 pb-2 mb-4 bg-gray-50 p-2">Part B: Voyage Parameters</h3>
        <table className="w-full text-sm mb-10 border-collapse">
          <tbody>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Reporting Period</td><td className="py-3 font-mono">2025-01-15 to 2025-02-14</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Departure Port</td><td className="py-3 font-mono">SGSIN (Singapore)</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Arrival Port</td><td className="py-3 font-mono">NLRTM (Rotterdam)</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Distance Travelled</td><td className="py-3 font-mono">8,240 NM</td></tr>
          </tbody>
        </table>

        {/* Section 3: Emissions Data */}
        <h3 className="text-lg font-bold font-serif uppercase border-b border-gray-300 pb-2 mb-4 bg-gray-50 p-2">Part C: Emissions & Fuel</h3>
        <table className="w-full text-sm mb-10 border-collapse">
          <tbody>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Fuel Consumed (VLSFO)</td><td className="py-3 font-mono">1,420.5 Metric Tons</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Emission Factor</td><td className="py-3 font-mono">3.151 tCO2/tFuel</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">Total CO2 Emitted</td><td className="py-3 font-mono font-bold text-lg">4,475.99 tCO2</td></tr>
            <tr className="border-b border-gray-200"><td className="py-3 font-semibold w-1/3 text-gray-600">EU Scope (50%)</td><td className="py-3 font-mono text-red-600 font-bold">2,237.99 tCO2</td></tr>
          </tbody>
        </table>

        {/* Section 4: DLT Verification */}
        <div className="mt-12 border-2 border-black p-6 relative">
          <div className="absolute -top-4 left-6 bg-white px-2 font-serif font-bold uppercase flex items-center gap-2">
             <ShieldCheck size={18} /> Official Verification
          </div>
          
          <div className="flex items-start gap-6 mt-2">
            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center p-2 border border-gray-300 shrink-0">
               {/* Fake QR code visualization */}
               <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 opacity-50">
                  <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                  <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
                  <div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-black"></div>
                  <div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div>
               </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase mb-2">Cryptographic Immutability Proof</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                This document and its underlying telemetry (AIS fixes, BDN scans) have been cryptographically anchored to a Distributed Ledger by Meridian Trace. Any alteration to this PDF renders the hash invalid.
              </p>
              <div className="text-xs">
                <span className="font-bold">SHA-256 Hash:</span> 
                <span className="font-mono bg-gray-100 p-1 ml-2 break-all border border-gray-200">
                  a3f5d8c2e1b4f6a9d2c5e8b1f4a7d0c3e6b9f2a5d8c1e4b7f0a3d6c9e2b5f8a1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-16 flex justify-between">
          <div className="text-center">
            <div className="w-48 border-b border-black mb-2"></div>
            <div className="text-xs font-bold uppercase">Master of Vessel</div>
          </div>
          <div className="text-center">
            <div className="w-48 border-b border-black mb-2 flex items-end justify-center">
              <span className="font-signature text-2xl text-blue-900 -mb-2">Meridian Trace AI</span>
            </div>
            <div className="text-xs font-bold uppercase">Automated Verifier</div>
            <div className="text-[10px] text-gray-500 mt-1">Pace-X Ecosystem</div>
          </div>
        </div>

      </div>
    </div>
  );
}


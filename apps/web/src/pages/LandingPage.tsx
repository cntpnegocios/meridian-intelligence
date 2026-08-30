
import { Link } from 'react-router-dom';
import { Anchor, ShieldCheck, Globe2, Cpu, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="w-full border-b border-white/10 bg-black/20 backdrop-blur-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Anchor className="h-6 w-6 text-brand-primary" />
            <span className="font-bold tracking-widest text-lg">MERIDIAN</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Platform</a>
            <a href="#compliance" className="text-slate-300 hover:text-white transition-colors">EU MRV</a>
            <a href="#finops" className="text-slate-300 hover:text-white transition-colors">FinOps</a>
            <Link to="/login" className="px-5 py-2 bg-brand-primary text-slate-900 rounded-full font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2">
              Acessar Plataforma <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 relative z-10">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        
        <div className="text-center max-w-4xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold tracking-widest mb-8">
            <Globe2 className="h-4 w-4" /> POWERED BY GREENSEE AI ENGINE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Decarbonization OS for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500">
              Global Supply Chains
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A plataforma definitiva de gêmeos digitais. Emissões MRV, Auditoria Criptográfica, Roteamento Preditivo e FinOps Tributário em um único ecossistema.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link to="/login" className="px-8 py-4 bg-brand-primary text-bg-surface rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(30,195,179,0.3)]">
              Entrar nos Ambientes (Hub)
            </Link>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl w-full z-10">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm">
            <ShieldCheck className="h-10 w-10 text-brand-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Compliance Oficial (EU ETS)</h3>
            <p className="text-slate-400 text-sm">Geração automática de relatórios MRV e DCS. Auditoria in-loco protegida por criptografia SHA-256.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm">
            <Cpu className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Document Intelligence</h3>
            <p className="text-slate-400 text-sm">IA que lê notas físicas de combustível (BDN) nos portos para prevenir fraudes de densidade e enxofre.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm">
            <Globe2 className="h-10 w-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">FinOps & Carbon Pricing</h3>
            <p className="text-slate-400 text-sm">Tradução em tempo real de emissões para faturas em Euros baseadas no mercado de carbono Europeu.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

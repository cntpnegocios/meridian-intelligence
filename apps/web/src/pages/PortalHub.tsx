
import { useNavigate } from 'react-router-dom';
import { Anchor, Ship, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { usePortal, type PortalRole } from '../lib/portalContext';

export default function PortalHub() {
  const navigate = useNavigate();
  const { setRole } = usePortal();

  const handleSelectPortal = (role: PortalRole) => {
    setRole(role);
    navigate('/app/'); // Redireciona para o painel (AppShell)
  };

  const environments = [
    {
      role: 'OPERATOR' as PortalRole,
      title: 'Operator Control Tower',
      description: 'Fleet management, EU ETS & FuelEU compliance, live emissions tracking.',
      icon: <Ship className="h-10 w-10 text-blue-400" />,
      color: 'border-blue-500/30 hover:border-blue-400',
      bg: 'bg-blue-500/10 hover:bg-blue-500/20'
    },
    {
      role: 'SHIPPER' as PortalRole,
      title: 'Shipper Intelligence',
      description: 'CO2 per cargo, Scope 3 reporting, ESG certificates, booking tracking.',
      icon: <Building2 className="h-10 w-10 text-forest-grove" />,
      color: 'border-emerald-500/30 hover:border-emerald-400',
      bg: 'bg-forest-grove/10 hover:bg-forest-grove/20'
    },
    {
      role: 'PORT' as PortalRole,
      title: 'Port Authority Dashboard',
      description: 'Vessel arrivals, port congestion emissions, Green Berth rankings.',
      icon: <Anchor className="h-10 w-10 text-cyan-400" />,
      color: 'border-cyan-500/30 hover:border-cyan-400',
      bg: 'bg-cyan-500/10 hover:bg-cyan-500/20'
    },
    {
      role: 'REGULATOR' as PortalRole,
      title: 'Regulatory & Audit',
      description: 'MRV audit trails, SHA-256 verifications, fraud detection AI.',
      icon: <ShieldCheck className="h-10 w-10 text-amber-400" />,
      color: 'border-amber-500/30 hover:border-amber-400',
      bg: 'bg-amber-500/10 hover:bg-amber-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-pure-white flex flex-col relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Header simples */}
      <header className="w-full p-6 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Anchor className="h-6 w-6 text-brand-primary" />
          <span className="font-bold tracking-widest text-lg text-ink-black">MERIDIAN</span>
        </div>
        <div className="text-sm text-slate-mid">
          Welcome, <strong className="text-ink-black">Enterprise Admin</strong>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-ink-black mb-4">Select Your Workspace</h1>
          <p className="text-slate-mid text-lg">
            Selecione o portal corporativo desejado. O sistema carregará as ferramentas, <br/> mapas e dashboards específicos para o seu papel (Role).
          </p>
        </div>

        {/* Os "Quadrados bem desenhados" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
          {environments.map((env) => (
            <button
              key={env.role}
              onClick={() => handleSelectPortal(env.role)}
              className={`group flex flex-col items-start p-8 rounded-2xl border ${env.color} ${env.bg} backdrop-blur-sm transition-all duration-300 text-left`}
            >
              <div className="mb-6 p-4 rounded-xl bg-mist-gray/50 border border-ink-black/10/50 shadow-inner">
                {env.icon}
              </div>
              <h2 className="text-2xl font-bold text-ink-black mb-2 group-hover:text-brand-primary transition-colors">
                {env.title}
              </h2>
              <p className="text-slate-mid text-sm leading-relaxed mb-6 flex-1">
                {env.description}
              </p>
              
              <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-ink-black group-hover:text-brand-primary transition-colors">
                Enter Workspace <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}



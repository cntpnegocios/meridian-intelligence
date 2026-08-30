import { useNavigate } from 'react-router-dom';
import { Anchor, Ship, Building2, ShieldCheck, ArrowRight, Plane } from 'lucide-react';
import { usePortal, type PortalRole } from '../lib/portalContext';

export default function PortalHub() {
  const navigate = useNavigate();
  const { setRole } = usePortal();

  const handleSelectPortal = (role: PortalRole) => {
    setRole(role);
    navigate('/app/'); 
  };

  const environments = [
    {
      role: 'OPERATOR' as PortalRole,
      title: 'Operator Control Tower',
      description: 'Minimize ETS tax exposure. Automate EU MRV reporting and unlock real-time fleet decarbonization ROI.',
      icon: <Ship className="h-10 w-10 text-ink-black" />,
      color: 'border-mist-gray hover:border-forest-grove',
      bg: 'bg-pure-white hover:bg-mist-gray/50'
    },
    {
      role: 'SHIPPER' as PortalRole,
      title: 'Shipper Intelligence',
      description: 'Generate audited Scope 3 certificates. Prove zero-carbon supply chains to premium buyers.',
      icon: <Building2 className="h-10 w-10 text-ink-black" />,
      color: 'border-mist-gray hover:border-forest-grove',
      bg: 'bg-pure-white hover:bg-mist-gray/50'
    },
    {
      role: 'PORT' as PortalRole,
      title: 'Port Authority Dashboard',
      description: 'Vessel arrivals, port congestion emissions, Green Berth rankings.',
      icon: <Anchor className="h-10 w-10 text-ink-black" />,
      color: 'border-mist-gray hover:border-forest-grove',
      bg: 'bg-pure-white hover:bg-mist-gray/50'
    },
    {
      role: 'REGULATOR' as PortalRole,
      title: 'Regulatory & Audit',
      description: 'Cryptographic proof of emissions. Detect BDN fraud instantly with AI-powered forensic auditing.',
      icon: <ShieldCheck className="h-10 w-10 text-ink-black" />,
      color: 'border-mist-gray hover:border-forest-grove',
      bg: 'bg-pure-white hover:bg-mist-gray/50'
    }
  ];

  return (
    <div className="min-h-screen bg-pure-white flex flex-col relative overflow-hidden font-geist">
      {/* Background FX */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Header */}
      <header className="w-full p-6 z-10 flex justify-between items-center border-b border-ink-black/5 bg-pure-white">
        <div className="flex items-center gap-2">
          <Anchor className="h-6 w-6 text-forest-grove" />
          <span className="font-bold tracking-widest text-lg text-ink-black font-libre-caslon-text">MERIDIAN</span>
        </div>
        <div className="text-sm text-graphite">
          Welcome, <strong className="text-ink-black">Enterprise Admin</strong>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-16 p-6 z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-ink-black mb-4 font-libre-caslon-text">Select Workspace</h1>
          <p className="text-graphite text-lg max-w-xl mx-auto">
            Choose your operating environment.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
          {environments.map((env) => (
            <button
              key={env.role}
              onClick={() => handleSelectPortal(env.role)}
              className={`group flex flex-col items-start p-8 rounded-[20px] border shadow-[0_0_1px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.05)_inset] ${env.color} ${env.bg} transition-all duration-300 text-left`}
            >
              <div className="mb-6 p-4 rounded-xl bg-mist-gray border border-ink-black/5 shadow-sm">
                {env.icon}
              </div>
              <h2 className="text-xl font-bold text-ink-black mb-2 font-libre-caslon-text group-hover:text-forest-grove transition-colors">
                {env.title}
              </h2>
              <p className="text-graphite text-sm leading-relaxed mb-6 flex-1">
                {env.description}
              </p>
              
              <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-ink-black group-hover:text-forest-grove transition-colors">
                Enter Workspace <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
          
          {/* AVIATION CARD (LOCKED) */}
          <div className="md:col-span-2 group flex flex-col md:flex-row items-center md:items-start p-8 rounded-[20px] border border-ink-black/10 bg-mist-gray/30 text-left opacity-70 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-ink-black text-pure-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
              Q4 2026 / Architecture Ready
            </div>
            
            <div className="mb-6 md:mb-0 md:mr-6 p-4 rounded-xl bg-pure-white border border-ink-black/5 shadow-sm shrink-0 self-start">
              <Plane className="h-10 w-10 text-ink-black" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-ink-black mb-2 font-libre-caslon-text">
                Air Green Corridors
              </h2>
              <p className="text-graphite text-sm leading-relaxed mb-4">
                SAF Book-and-Claim, CORSIA compliance, and aviation emissions. Expanding the Pace-X and MeridianMRV ecosystem to airspace.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-ink-black">
                Locked <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

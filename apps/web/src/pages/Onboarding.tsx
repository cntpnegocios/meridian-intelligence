import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, ArrowRight, ShieldCheck, KeyRound, Building, Info } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  
  // Pré-preenchido para a Demo Pública
  const [email, setEmail] = useState('investor@meridianmrv.com');
  const [password, setPassword] = useState('demo-access-token-2026');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula validação Enterprise SSO 
    setTimeout(() => {
      // Define o direcionamento para a "segunda tela" (Hub de ambientes)
      navigate('/hub');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grade de Fundo Sci-Fi */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-primary opacity-20 blur-[100px]"></div>

      <div className="z-10 w-full max-w-md px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-bg-panel border border-brand-primary/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(30,195,179,0.3)]">
            <Anchor className="h-8 w-8 text-brand-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Meridian Intelligence</h1>
          <p className="text-text-muted text-center text-sm">
            Platform for Maritime & Aviation Decarbonization, Regulatory Compliance, and FinOps.
          </p>
        </div>

        <div className="bg-bg-panel border border-border-default rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-4">Corporate Sign In</h2>
          
          {/* Aviso de Demo Aberta */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <strong className="text-blue-100">Interactive Demo Mode</strong><br/>
              As credenciais de demonstração já estão preenchidas. Clique em Sign In para acessar os ambientes.
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-text-muted" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@maersk.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-border-default rounded-lg leading-5 bg-bg-surface text-text-base placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
                Password / SSO Token
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-4 w-4 text-text-muted" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 border border-border-default rounded-lg leading-5 bg-bg-surface text-text-base placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-bg-surface bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all disabled:opacity-70 mt-6"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-bg-surface border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In to Enterprise Workspace
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-border-subtle pt-6">
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-400/80 bg-emerald-400/10 py-2 px-3 rounded-md">
              <ShieldCheck className="h-4 w-4" />
              <span>Protected by Meridian Tenant Isolation (SSO)</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted">
          &copy; 2026 Meridian MRV Ltd. All rights reserved. <br/>
          SOC 2 Type II Certified | ISO 27001
        </p>
      </div>
    </div>
  );
}

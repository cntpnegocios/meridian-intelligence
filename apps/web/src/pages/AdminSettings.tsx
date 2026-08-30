import React, { useState, useEffect } from 'react';
import { Shield, Key, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // @ts-ignore
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const response = await fetch(API_URL + '/api/v1/admin/integrations');
      const data = await response.json();
      if (data.integrations) {
        setIntegrations(data.integrations);
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar integrações da plataforma.');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGreensee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(API_URL + '/api/v1/admin/integrations/greensee/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ api_key: apiKey })
      });
      
      if (!response.ok) throw new Error('Falha');
      
      setSuccess('Integração com a Greensee AI estabelecida com sucesso!');
      setApiKey('');
      fetchIntegrations();
    } catch (err) {
      setError('Falha ao validar credenciais da Greensee.');
    } finally {
      setLoading(false);
    }
  };

  const greenseeStatus = integrations.find(i => i.provider === 'GREENSEE')?.is_active;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-blue-400" />
        <h1 className="text-3xl font-bold text-white">Configurações Administrativas</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-3 text-red-200">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-900/50 border border-emerald-500 rounded-lg flex items-center gap-3 text-emerald-200">
          <CheckCircle2 className="h-5 w-5" />
          <p>{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-bg-panel border border-border-default rounded-xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-border-subtle flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-text-base flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-emerald-400" />
                Integração Greensee AI
              </h3>
              <p className="text-text-muted text-sm mt-1">
                Motor de Roteamento Preditivo e Machine Learning Climático
              </p>
            </div>
            <span className={greenseeStatus ? 'px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30'}>
              {greenseeStatus ? 'CONECTADO' : 'AGUARDANDO CHAVE'}
            </span>
          </div>
          <div className="p-6">
            {greenseeStatus ? (
              <div className="space-y-4">
                <p className="text-text-base">
                  O Meridian agora está delegando os cálculos preditivos, previsão de combustível e o impacto de ondas/ventos para a API da Greensee.
                </p>
                <div className="p-3 bg-bg-surface rounded border border-border-default text-sm font-mono text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Sincronização Ativa
                </div>
              </div>
            ) : (
              <form onSubmit={handleConnectGreensee} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-base flex items-center gap-2">
                    <Key className="h-4 w-4 text-text-muted" />
                    Chave de API (Greensee)
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk_greensee_..."
                    className="w-full bg-bg-surface border border-border-default rounded-md px-4 py-2 text-text-base placeholder:text-text-muted focus:outline-none focus:border-brand-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-bg-surface font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                >
                  {loading ? 'Conectando...' : 'Autenticar e Desbloquear Motor'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

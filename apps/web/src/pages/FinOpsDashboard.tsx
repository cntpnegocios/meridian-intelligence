import { useState, useEffect } from 'react';
import { DollarSign, FileText, TrendingUp, Download, AlertCircle, Building2 } from 'lucide-react';

export default function FinOpsDashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // @ts-ignore
  const API_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:8000');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/finops/invoices`);
        const data = await response.json();
        if (data.invoices) {
          setInvoices(data.invoices);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [API_URL]);

  const totalLiability = invoices.reduce((acc, inv) => acc + inv.total_eur, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-base flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-emerald-400" />
          FinOps & ERP Integration
        </h1>
        <p className="text-text-muted mt-2">
          Conversão de emissões MRV em passivos tributários financeiros (EU ETS & FuelEU).
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-bg-panel border border-border-default rounded-xl p-6 shadow-sm">
          <div className="text-text-muted text-sm font-medium mb-2 flex justify-between">
            Passivo ETS Total Acumulado
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            € {totalLiability.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-text-muted mt-2">Baseado na cotação EUA atual</div>
        </div>
        
        <div className="bg-bg-panel border border-border-default rounded-xl p-6 shadow-sm">
          <div className="text-text-muted text-sm font-medium mb-2 flex justify-between">
            Faturas Abertas (ERP)
            <FileText className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="text-3xl font-bold text-white">{invoices.length}</div>
          <div className="text-xs text-text-muted mt-2">Aguardando liquidação / Hedging</div>
        </div>

        <div className="bg-bg-panel border border-border-default rounded-xl p-6 shadow-sm">
          <div className="text-text-muted text-sm font-medium mb-2 flex justify-between">
            Custo Global de Carbono (EUA)
            <Building2 className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">€ 85,50 <span className="text-sm font-normal text-text-muted">/ Ton</span></div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            Mercado Europeu (Spot)
          </div>
        </div>
      </div>

      {/* Tabela de Invoices */}
      <div className="bg-bg-panel border border-border-default rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-bg-surface">
          <h2 className="text-xl font-semibold text-text-base">Faturas de Carbono (Integração Contábil)</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-lg text-sm font-medium hover:bg-brand-primary/20 transition-colors">
            <Download className="h-4 w-4" />
            Exportar Lote ERP (SAP)
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase bg-bg-sidebar border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4 font-medium">Data (Invoice)</th>
                <th className="px-6 py-4 font-medium">Navio</th>
                <th className="px-6 py-4 font-medium text-right">Emissão (Ton CO₂)</th>
                <th className="px-6 py-4 font-medium text-right">Passivo Total (EUR)</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-text-muted">Carregando faturas...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-text-muted">Nenhuma fatura gerada no período.</td></tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-bg-surface transition-colors">
                    <td className="px-6 py-4 font-mono text-text-muted">{inv.date}</td>
                    <td className="px-6 py-4 font-medium text-white">{inv.vessel_name}</td>
                    <td className="px-6 py-4 text-right font-mono text-amber-400">
                      {inv.co2_mt.toLocaleString('pt-BR')} T
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-emerald-400">
                      € {inv.total_eur.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold tracking-wider">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-400 hover:text-blue-300 font-medium text-xs">Baixar PDF</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-amber-900/20 border-t border-border-subtle text-amber-200/80 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          A liquidação do ETS deve ocorrer até 30 de Setembro do ano subsequente às emissões para evitar penalidades severas da Comissão Europeia.
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ScanText, UploadCloud, FileCheck, AlertCircle, FileSearch, CheckCircle2 } from 'lucide-react';

export default function AiDocumentScanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // @ts-ignore
  const API_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:8000');

  // Simulando o conteúdo cru do OCR de um papel amassado para a demonstração comercial
  const DEMO_OCR_TEXT = `MERIDIAN PORT AUTHORITY
BUNKER DELIVERY NOTE No. 98124
Vessel: EMMA MAERSK
Port: SGSIN
Date: 2026-08-30
--------------------
Fuel Delivered: VLSFO
Total Qty: 4,500.50 MT
Density at 15C: 991.0 kg/m3
Sulfur Content: 0.49 %
Supplier: Shell Marine Products
Signature: __________`;

  const handleSimulateScan = async () => {
    setLoading(true);
    setResult(null);

    // Mocking an upload delay for UX dramatic effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Sending to our Phase 15 Python Backend
      const response = await fetch(`${API_URL}/api/v1/documents/extract-bdn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          vessel_id: "7769936f-e3c3-4d69-be5a-194129997193", // Emma Maersk Demo UUID (doesn't matter strictly for this UI)
          ocr_raw_text: DEMO_OCR_TEXT 
        })
      });
      
      const data = await response.json();
      setResult(data.extracted_data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-base flex items-center gap-3">
          <ScanText className="h-8 w-8 text-blue-400" />
          Document Intelligence (OCR)
        </h1>
        <p className="text-text-muted mt-2">
          Auditoria de recibos de combustível (Bunker Delivery Notes) contra fraudes usando IA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lado Esquerdo: Área de Upload */}
        <div className="bg-bg-panel border border-border-default rounded-xl p-8 shadow-xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
            <UploadCloud className="h-10 w-10 text-blue-400" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-ink-black mb-2">Faça o Upload do BDN</h3>
            <p className="text-sm text-text-muted max-w-sm">
              Arraste o PDF escaneado ou a foto do papel físico do porto. Nossa IA extrairá a matemática e auditará as emissões.
            </p>
          </div>

          <button 
            onClick={handleSimulateScan}
            disabled={loading}
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-500 text-ink-black font-medium py-3 px-6 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2 animate-pulse">
                <ScanText className="h-5 w-5 animate-spin" />
                Lendo documento...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileSearch className="h-5 w-5" />
                Testar Demo IA
              </span>
            )}
          </button>

          <div className="mt-4 p-4 bg-mist-gray border border-ink-black/10 rounded-lg text-left w-full">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2 block">Texto Sujo Simulado (Câmera)</span>
            <pre className="text-xs text-slate-mid font-mono overflow-hidden whitespace-pre-wrap">
              {DEMO_OCR_TEXT}
            </pre>
          </div>
        </div>

        {/* Lado Direito: Resultado da IA */}
        <div className="bg-bg-panel border border-border-default rounded-xl overflow-hidden shadow-xl flex flex-col">
          <div className="p-6 border-b border-border-subtle bg-bg-surface flex justify-between items-center">
            <h3 className="font-semibold text-text-base flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-forest-grove" />
              Resultado Estruturado (JSON)
            </h3>
            {result && (
              <span className="px-3 py-1 bg-forest-grove/20 text-forest-grove border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                VERIFICADO
              </span>
            )}
          </div>
          
          <div className="p-6 flex-1 bg-pure-white">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                <ScanText className="h-12 w-12 opacity-20" />
                <p className="text-sm">Aguardando arquivo para processamento...</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-blue-400 space-y-4">
                <ScanText className="h-12 w-12 animate-pulse" />
                <p className="text-sm animate-pulse">Aplicando Modelos de Visão Computacional...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                <div className="flex justify-between items-center pb-4 border-b border-ink-black/10">
                  <div className="text-sm text-slate-mid">Nível de Confiança da IA</div>
                  <div className={`text-xl font-bold font-mono ${result.ocr_confidence > 90 ? 'text-forest-grove' : 'text-amber-400'}`}>
                    {result.ocr_confidence}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-mist-gray rounded-lg border border-ink-black/10">
                    <div className="text-xs text-slate-500 mb-1">Combustível Detectado</div>
                    <div className="font-mono text-ink-black text-lg">{result.fuel_type}</div>
                  </div>
                  <div className="p-4 bg-mist-gray rounded-lg border border-ink-black/10">
                    <div className="text-xs text-slate-500 mb-1">Quantidade Entregue</div>
                    <div className="font-mono text-amber-400 text-lg font-bold">{result.quantity_mt.toLocaleString('pt-BR')} MT</div>
                  </div>
                  <div className="p-4 bg-mist-gray rounded-lg border border-ink-black/10">
                    <div className="text-xs text-slate-500 mb-1">Enxofre (Sulfur)</div>
                    <div className="font-mono text-ink-black text-lg">{result.sulfur_content_pct} %</div>
                  </div>
                  <div className="p-4 bg-mist-gray rounded-lg border border-ink-black/10">
                    <div className="text-xs text-slate-500 mb-1">Porto de Origem</div>
                    <div className="font-mono text-ink-black text-lg">{result.bunker_port}</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg flex items-start gap-3 text-blue-200 text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>
                    Dados matemáticos extraídos com sucesso. As {result.quantity_mt} toneladas de {result.fuel_type} foram automaticamente injetadas no banco de dados para a prova criptográfica do EU MRV.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


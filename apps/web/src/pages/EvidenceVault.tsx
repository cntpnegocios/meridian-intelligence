import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';

export function EvidenceVault() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader 
        title="Evidence Vault" 
        subtitle="MARITIME & REGULATORY INTELLIGENCE" 
        status="unavailable"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <div className="border border-border-default rounded-xl bg-bg-panel overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-sidebar border-b border-border-subtle text-text-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Evidence ID</th>
                <th className="px-6 py-4 font-medium">Authority</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Capture Date</th>
                <th className="px-6 py-4 font-medium">SHA-256</th>
                <th className="px-6 py-4 font-medium">Parser</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-text-muted italic">
                  No evidence records available yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

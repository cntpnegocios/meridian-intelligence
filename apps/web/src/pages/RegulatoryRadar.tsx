import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';

export function RegulatoryRadar() {
  const sources = [
    { name: 'EUR-Lex', status: 'unavailable' as const },
    { name: 'European Commission', status: 'unavailable' as const },
    { name: 'DG CLIMA', status: 'unavailable' as const },
    { name: 'DG MOVE', status: 'unavailable' as const },
    { name: 'EMSA', status: 'unavailable' as const },
    { name: 'IMO', status: 'unavailable' as const },
    { name: 'EEA', status: 'unavailable' as const },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader 
        title="Regulatory Radar" 
        subtitle="MARITIME & REGULATORY INTELLIGENCE" 
        status="unavailable"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <h3 className="text-xl font-bold mb-2">Monitored Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map(source => (
            <div key={source.name} className="border border-border-default rounded-lg p-5 bg-bg-panel flex justify-between items-center">
              <span className="font-medium text-text-base">{source.name}</span>
              <Badge variant={source.status}>{source.status.toUpperCase()}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

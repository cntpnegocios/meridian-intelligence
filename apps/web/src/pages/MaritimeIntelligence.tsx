import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';

export function MaritimeIntelligence() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader 
        title="Maritime Intelligence" 
        subtitle="MARITIME & REGULATORY INTELLIGENCE" 
        status="unavailable"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <p className="text-text-muted">Vessel Search, Fleet View, Vessel Profile, Voyage History, Port Calls, AIS Status, Fleet Risk, Anomalies.</p>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Monitored Fleet" value="—" status="unavailable" />
          <MetricCard title="Anomalies detected" value="—" status="unavailable" />
          <MetricCard title="Global Port Calls" value="—" status="unavailable" />
        </section>
      </div>
    </div>
  );
}

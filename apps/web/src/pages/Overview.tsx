import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { checkHealth } from '../api/client';

export function Overview() {
  const [apiStatus, setApiStatus] = useState<'API UNAVAILABLE' | 'LIVE' | 'LOADING'>('LOADING');

  useEffect(() => {
    checkHealth().then(setApiStatus);
  }, []);

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader 
        title="Intelligence Overview" 
        subtitle="MARITIME & REGULATORY INTELLIGENCE" 
        status="demo"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Active Voyages" value="—" status="demo" subtitle="DEMO DATA" />
          <MetricCard title="Tracked Vessels" value="—" status="demo" subtitle="DEMO DATA" />
          <MetricCard title="Regulatory Alerts" value="—" status="demo" subtitle="DEMO DATA" />
          <MetricCard title="Data Sources" value="—" status="demo" subtitle="DEMO DATA" />
          
          <MetricCard title="EU ETS Exposure" value="—" status="unavailable" subtitle="NOT CALCULATED" />
          <MetricCard title="FuelEU Compliance" value="—" status="unavailable" subtitle="NOT CALCULATED" />
          <MetricCard title="Evidence Objects" value="—" status="unavailable" subtitle="NO DATA" />
          <MetricCard 
            title="System Status" 
            value={apiStatus} 
            status={apiStatus === 'LIVE' ? 'live' : apiStatus === 'LOADING' ? 'loading' : 'error'} 
            subtitle={apiStatus === 'API UNAVAILABLE' ? 'BACKEND DISCONNECTED' : 'BACKEND CONNECTED'} 
          />
        </section>
      </div>
    </div>
  );
}

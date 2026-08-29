import { PageHeader } from '../components/ui/PageHeader';

export function EuEts() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader title="EU ETS" subtitle="MARITIME & REGULATORY INTELLIGENCE" status="unavailable" />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <p className="text-text-muted">EU ETS intelligence and scope engine. Coming soon.</p>
      </div>
    </div>
  );
}

export function FuelEu() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader title="FuelEU Maritime" subtitle="MARITIME & REGULATORY INTELLIGENCE" status="unavailable" />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <p className="text-text-muted">FuelEU Maritime assessments. Coming soon.</p>
      </div>
    </div>
  );
}

export function GreenCorridors() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader title="Green Corridors" subtitle="MARITIME & REGULATORY INTELLIGENCE" status="unavailable" />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <p className="text-text-muted">Green Corridors intelligence. Coming soon.</p>
      </div>
    </div>
  );
}

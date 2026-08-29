import { PageHeader } from '../components/ui/PageHeader';

export function SourceRegistry() {
  return (
    <div className="flex flex-col h-full bg-bg-base">
      <PageHeader 
        title="Source Registry" 
        subtitle="MARITIME & REGULATORY INTELLIGENCE" 
        status="unavailable"
      />
      <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
        <div className="border border-border-default rounded-xl bg-bg-panel overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-sidebar border-b border-border-subtle text-text-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Source ID</th>
                <th className="px-6 py-4 font-medium">Authority</th>
                <th className="px-6 py-4 font-medium">Jurisdiction</th>
                <th className="px-6 py-4 font-medium">Base URL</th>
                <th className="px-6 py-4 font-medium">Access Method</th>
                <th className="px-6 py-4 font-medium">License</th>
                <th className="px-6 py-4 font-medium">Freq.</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-text-muted italic">
                  No sources registered yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

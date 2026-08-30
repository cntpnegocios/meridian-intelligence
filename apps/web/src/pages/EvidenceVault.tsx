import { Shield, Hash, CheckCircle, Clock, FileText, Anchor, MapPin } from 'lucide-react';
import { useState } from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from '../components/ui/PageHeader';

interface EvidenceRecord {
  id: string;
  voyage: string;
  vessel: string;
  route: string;
  captureDate: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  hash: string;
  parserVersion: string;
  aiConfidence: number;
  aisFixesCount: number;
  sarValidationCount: number;
}

const EVIDENCE_RECORDS: EvidenceRecord[] = [
  {
    id: 'EVD-2024-001',
    voyage: 'VOY-SG-HK-447',
    vessel: 'MSC GULSUN',
    route: 'Singapore → Hong Kong',
    captureDate: '2024-01-15 14:23:17 UTC',
    status: 'Verified',
    hash: 'a3f5d8c2e1b4f6a9d2c5e8b1f4a7d0c3e6b9f2a5d8c1e4b7f0a3d6c9e2b5f8a1',
    parserVersion: 'meridian-parser-v2.1.0',
    aiConfidence: 98.4,
    aisFixesCount: 1247,
    sarValidationCount: 34
  },
  {
    id: 'EVD-2024-002',
    voyage: 'VOY-RTM-NYC-892',
    vessel: 'EVER GIVEN',
    route: 'Rotterdam → New York',
    captureDate: '2024-01-16 09:45:33 UTC',
    status: 'Verified',
    hash: 'b7e2f9a4c6d1e8b3f5a2d7c0e9b4f1a6d3c8e5b2f9a7d4c1e6b0f3a8d5c2e9b6',
    parserVersion: 'meridian-parser-v2.1.0',
    aiConfidence: 96.7,
    aisFixesCount: 2103,
    sarValidationCount: 47
  },
  {
    id: 'EVD-2024-003',
    voyage: 'VOY-DXB-MUM-223',
    vessel: 'MAERSK ESSEX',
    route: 'Dubai → Mumbai',
    captureDate: '2024-01-17 18:12:09 UTC',
    status: 'Pending',
    hash: 'c9d4e7b2f5a8c1e6b9f3a7d0c4e8b1f6a9d2c5e0b3f7a4d8c1e5b9f2a6d3c7e0',
    parserVersion: 'meridian-parser-v2.1.0',
    aiConfidence: 94.2,
    aisFixesCount: 876,
    sarValidationCount: 19
  },
  {
    id: 'EVD-2024-004',
    voyage: 'VOY-SHA-LAX-556',
    vessel: 'CMA CGM ANTOINE DE SAINT EXUPERY',
    route: 'Shanghai → Los Angeles',
    captureDate: '2024-01-18 22:37:51 UTC',
    status: 'Rejected',
    hash: 'd1e6b9f4a7c2e5b8f1a4d7c0e3b6f9a2d5c8e1b4f7a0d3c6e9b2f5a8d1c4e7b0',
    parserVersion: 'meridian-parser-v2.0.8',
    aiConfidence: 87.1,
    aisFixesCount: 543,
    sarValidationCount: 12
  }
];

export function EvidenceVault() {
  const [selectedRecord, setSelectedRecord] = useState<EvidenceRecord>(EVIDENCE_RECORDS[0]);

  const verifiedCount = EVIDENCE_RECORDS.filter(r => r.status === 'Verified').length;
  const pendingCount = EVIDENCE_RECORDS.filter(r => r.status === 'Pending').length;

  const getStatusBadge = (status: EvidenceRecord['status']) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="live">Verified</Badge>;
      case 'Pending':
        return <Badge variant="demo">Pending</Badge>;
      case 'Rejected':
        return <Badge variant="error">Rejected</Badge>;
    }
  };

  const getStatusIcon = (status: EvidenceRecord['status']) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className="w-4 h-4 text-[#59bdb8]" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-[#d7b76c]" />;
      case 'Rejected':
        return <span className="w-4 h-4 text-red-400">✕</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#07131f] text-[#eaf1f6] p-8">
      <PageHeader
        title="Evidence Vault"
        subtitle="Immutable SHA-256 Records & Audit Trail"
        status="demo"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <MetricCard
          title="Total Records"
          value={EVIDENCE_RECORDS.length.toString()}
          subtitle="Cryptographic evidence entries"
          status="demo"
          icon={<FileText className="w-5 h-5" />}
        />
        <MetricCard
          title="Verified Hashes"
          value={verifiedCount.toString()}
          subtitle="Blockchain-anchored records"
          status="demo"
          icon={<Shield className="w-5 h-5" />}
          trend={{ value: '12.5', direction: 'up' }}
        />
        <MetricCard
          title="Pending Audit"
          value={pendingCount.toString()}
          subtitle="Awaiting cryptographic validation"
          status="demo"
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-[#091923] border border-[#1b2b39] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1b2b39] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-[#59bdb8]" />
                <h2 className="text-lg font-semibold text-[#eaf1f6]">Evidence Records</h2>
              </div>
              <Badge variant="demo">Demo Data</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1b2b39]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                      Voyage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                      Vessel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                      Capture Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                      SHA-256 Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b2b39]">
                  {EVIDENCE_RECORDS.map((record) => (
                    <tr
                      key={record.id}
                      onClick={() => setSelectedRecord(record)}
                      className={`cursor-pointer transition-colors ${
                        selectedRecord.id === record.id
                          ? 'bg-[#0a1a26]'
                          : 'hover:bg-[#0a1a26]'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <span className="text-sm font-mono text-[#eaf1f6]">{record.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-[#8da2b1]">{record.voyage}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Anchor className="w-4 h-4 text-[#59bdb8]" />
                          <span className="text-sm text-[#eaf1f6]">{record.vessel}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-[#8da2b1]" />
                          <span className="text-sm text-[#8da2b1]">{record.route}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-[#8da2b1]">{record.captureDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(record.status)}
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs font-mono text-[#59bdb8] bg-[#08111a] px-2 py-1 rounded">
                          {record.hash.substring(0, 10)}...
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#091923] border border-[#1b2b39] rounded-lg overflow-hidden sticky top-8">
            <div className="px-6 py-4 border-b border-[#1b2b39] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#59bdb8]" />
                <h2 className="text-lg font-semibold text-[#eaf1f6]">Audit Detail</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#8da2b1] uppercase tracking-wider">
                    Record ID
                  </span>
                  {getStatusBadge(selectedRecord.status)}
                </div>
                <p className="text-sm font-mono text-[#eaf1f6]">{selectedRecord.id}</p>
              </div>

              <div>
                <span className="text-xs font-medium text-[#8da2b1] uppercase tracking-wider block mb-2">
                  Voyage Reference
                </span>
                <p className="text-sm font-mono text-[#eaf1f6]">{selectedRecord.voyage}</p>
              </div>

              <div>
                <span className="text-xs font-medium text-[#8da2b1] uppercase tracking-wider block mb-2">
                  Full SHA-256 Hash
                </span>
                <div className="bg-[#08111a] border border-[#1d3341] rounded p-3">
                  <code className="text-xs font-mono text-[#59bdb8] break-all leading-relaxed">
                    {selectedRecord.hash}
                  </code>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1b2b39]">
                <span className="text-xs font-medium text-[#8da2b1] uppercase tracking-wider block mb-3">
                  Validation Metrics
                </span>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8da2b1]">Parser Version</span>
                    <code className="text-xs font-mono text-[#eaf1f6] bg-[#08111a] px-2 py-1 rounded">
                      {selectedRecord.parserVersion}
                    </code>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8da2b1]">AI Confidence</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#08111a] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#59bdb8] rounded-full transition-all"
                          style={{ width: `${selectedRecord.aiConfidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#59bdb8] min-w-[3rem] text-right">
                        {selectedRecord.aiConfidence}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8da2b1]">AIS Fixes</span>
                    <span className="text-sm font-semibold text-[#eaf1f6]">
                      {selectedRecord.aisFixesCount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8da2b1]">SAR Validations</span>
                    <span className="text-sm font-semibold text-[#eaf1f6]">
                      {selectedRecord.sarValidationCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



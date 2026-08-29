import { FileText, AlertTriangle, Calendar, Scale } from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { PageHeader } from '../components/ui/PageHeader';

interface Regulation {
  name: string;
  reference: string;
  scope: string;
  appliesFrom: string;
  phaseIn2026: string;
  status: 'ACTIVE' | 'MONITORING' | 'STRATEGIC';
  impact: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'STRATEGIC';
}

interface Deadline {
  title: string;
  date: string;
  daysRemaining: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

const regulations: Regulation[] = [
  {
    name: 'EU MRV',
    reference: 'Reg. (EU) 2015/757',
    scope: 'Ships >5000 GT EU voyages',
    appliesFrom: '2015',
    phaseIn2026: '100%',
    status: 'ACTIVE',
    impact: 'HIGH'
  },
  {
    name: 'EU ETS Maritime',
    reference: 'Reg. (EU) 2023/957',
    scope: 'Ships >5000 GT',
    appliesFrom: 'Jan 2024',
    phaseIn2026: '70% (2025), 100% (2026)',
    status: 'ACTIVE',
    impact: 'CRITICAL'
  },
  {
    name: 'FuelEU Maritime',
    reference: 'Reg. (EU) 2023/1805',
    scope: 'Ships >5000 GT EU ports',
    appliesFrom: 'Jan 2025',
    phaseIn2026: '-2% GHG vs baseline',
    status: 'ACTIVE',
    impact: 'HIGH'
  },
  {
    name: 'IMO CII Rating',
    reference: 'MARPOL Annex VI',
    scope: 'All ships >5000 GT',
    appliesFrom: 'Jan 2023',
    phaseIn2026: 'Annual rating A-E',
    status: 'ACTIVE',
    impact: 'HIGH'
  },
  {
    name: 'Carbon Border Adjustment',
    reference: 'Freight indirect exposure',
    scope: '',
    appliesFrom: '2026',
    phaseIn2026: 'Monitoring phase',
    status: 'MONITORING',
    impact: 'MEDIUM'
  },
  {
    name: 'IMO GHG Strategy 2050',
    reference: 'Global fleet',
    scope: '',
    appliesFrom: '2023-2050',
    phaseIn2026: 'Net-zero by 2050 pathway',
    status: 'ACTIVE',
    impact: 'STRATEGIC'
  }
];

const deadlines: Deadline[] = [
  {
    title: 'EU ETS 100% phase-in',
    date: 'Jan 1 2026',
    daysRemaining: 0,
    severity: 'CRITICAL'
  },
  {
    title: 'FuelEU Annual Report',
    date: 'Mar 31 2027',
    daysRemaining: 214,
    severity: 'HIGH'
  },
  {
    title: 'CII Rating Submission',
    date: 'Jan 31 2027',
    daysRemaining: 155,
    severity: 'HIGH'
  },
  {
    title: 'IMO Stocktake Review',
    date: 'Sep 2028',
    daysRemaining: 759,
    severity: 'MEDIUM'
  }
];

function getStatusBadgeVariant(status: string): 'live' | 'demo' | 'stale' | 'error' | 'unavailable' {
  switch (status) {
    case 'ACTIVE':
      return 'live';
    case 'MONITORING':
      return 'stale';
    case 'STRATEGIC':
      return 'demo';
    default:
      return 'unavailable';
  }
}

function getImpactColor(impact: string): string {
  switch (impact) {
    case 'CRITICAL':
      return 'text-red-400';
    case 'HIGH':
      return 'text-orange-400';
    case 'MEDIUM':
      return 'text-yellow-400';
    case 'STRATEGIC':
      return 'text-brand-primary';
    default:
      return 'text-text-muted';
  }
}

function getSeverityBorderColor(severity: string): string {
  switch (severity) {
    case 'CRITICAL':
      return 'border-red-500';
    case 'HIGH':
      return 'border-orange-500';
    case 'MEDIUM':
      return 'border-yellow-500';
    default:
      return 'border-border-default';
  }
}

export function RegulatoryRadar() {
  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <PageHeader
          title="Regulatory Radar"
          subtitle="MARITIME REGULATORY INTELLIGENCE"
          status="demo"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Regulations Monitored"
            value="6"
            subtitle="Active tracking"
            status="live"
            icon={<Scale size={16} />}
          />
          <MetricCard
            title="Critical Deadlines"
            value="2"
            subtitle="Immediate action required"
            status="error"
            icon={<AlertTriangle size={16} />}
          />
          <MetricCard
            title="Pending Compliance"
            value="FuelEU 2025"
            subtitle="Implementation phase"
            status="stale"
            icon={<FileText size={16} />}
          />
          <MetricCard
            title="Next Review"
            value="155 days"
            subtitle="CII Rating Submission"
            status="demo"
            icon={<Calendar size={16} />}
          />
        </div>

        <div className="bg-bg-panel border border-border-default rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-brand-primary" />
              <h2 className="text-lg font-semibold text-text-base">Active Regulations</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Regulation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Scope
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Applies From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Phase-in 2026
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {regulations.map((reg, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-bg-base/50 transition-colors ${
                      reg.impact === 'CRITICAL' ? 'border-l-2 border-l-red-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-base">{reg.name}</span>
                        <span className="text-xs text-text-muted mt-0.5">{reg.reference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-base">{reg.scope}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-base">{reg.appliesFrom}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-base">{reg.phaseIn2026}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadgeVariant(reg.status)}>
                        {reg.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getImpactColor(reg.impact)}`}>
                        {reg.impact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-semibold text-text-base">Upcoming Deadlines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deadlines.map((deadline, index) => (
              <div
                key={index}
                className={`bg-bg-panel border border-border-default rounded-lg p-6 border-l-4 ${getSeverityBorderColor(
                  deadline.severity
                )}`}
              >
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-text-base leading-tight">
                      {deadline.title}
                    </h3>
                    <Badge
                      variant={
                        deadline.severity === 'CRITICAL'
                          ? 'error'
                          : deadline.severity === 'HIGH'
                          ? 'stale'
                          : 'demo'
                      }
                    >
                      {deadline.severity}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-text-base">
                      {deadline.daysRemaining === 0 ? 'TODAY' : deadline.daysRemaining}
                    </span>
                    {deadline.daysRemaining > 0 && (
                      <span className="text-sm text-text-muted">days</span>
                    )}
                  </div>
                  <div className="text-xs text-text-muted">{deadline.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bg-panel border border-border-subtle rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
            <div className="text-sm text-text-muted leading-relaxed">
              Regulatory data sourced from EUR-Lex, IMO MEPC and European Maritime Safety Agency
              (EMSA). This page does not constitute legal advice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
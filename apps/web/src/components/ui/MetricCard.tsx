import { cn } from '../../lib/utils';
import { Badge } from './Badge';
import type { ReactNode } from 'react';

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: ReactNode;
  subtitle?: string;
  status?: 'live' | 'demo' | 'stale' | 'error' | 'unavailable' | 'loading';
  icon?: ReactNode;
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' };
}

export function MetricCard({ title, value, subtitle, status, icon, trend, className, ...props }: MetricCardProps) {
  return (
    <article className={cn("border border-border-default rounded-xl p-5 bg-bg-panel flex flex-col gap-2 relative overflow-hidden", className)} {...props}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon && <span className="opacity-80">{icon}</span>}
          <small className="text-text-muted font-medium tracking-wider text-xs uppercase">{title}</small>
        </div>
        {status && <Badge variant={status}>{status.toUpperCase()}</Badge>}
      </div>
      <h3 className="text-2xl font-semibold text-text-base m-0">{value}</h3>
      <div className="flex justify-between items-center mt-auto">
        {subtitle && <p className="text-xs text-text-muted m-0">{subtitle}</p>}
        {trend && (
          <span className={cn(
            "text-xs font-medium",
            trend.direction === 'up' ? 'text-red-400' : trend.direction === 'down' ? 'text-emerald-400' : 'text-text-muted'
          )}>
            {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'} {trend.value}
          </span>
        )}
      </div>
    </article>
  );
}

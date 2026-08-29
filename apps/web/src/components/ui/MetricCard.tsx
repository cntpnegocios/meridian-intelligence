import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  status?: 'live' | 'demo' | 'stale' | 'error' | 'unavailable' | 'loading';
}

export function MetricCard({ title, value, subtitle, status, className, ...props }: MetricCardProps) {
  return (
    <article className={cn("border border-border-default rounded-xl p-5 bg-bg-panel flex flex-col gap-2", className)} {...props}>
      <div className="flex justify-between items-start">
        <small className="text-text-muted font-medium tracking-wider text-xs uppercase">{title}</small>
        {status && <Badge variant={status}>{status.toUpperCase()}</Badge>}
      </div>
      <h3 className="text-2xl font-semibold text-text-base m-0">{value}</h3>
      {subtitle && <p className="text-xs text-text-muted m-0 mt-auto">{subtitle}</p>}
    </article>
  );
}

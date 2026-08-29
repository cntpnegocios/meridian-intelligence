import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  status?: 'live' | 'demo' | 'unavailable' | 'stale' | 'error' | 'loading';
}

export function PageHeader({ title, subtitle, status, className, ...props }: PageHeaderProps) {
  return (
    <header className={cn("px-8 py-6 border-b border-border-subtle flex justify-between items-center bg-bg-sidebar", className)} {...props}>
      <div className="flex flex-col">
        {subtitle && <small className="text-[10px] tracking-widest text-brand-primary font-bold mb-1">{subtitle.toUpperCase()}</small>}
        <h1 className="text-2xl font-bold text-text-base m-0">{title}</h1>
      </div>
      {status && (
        <Badge variant={status} className="px-3 py-1.5 text-xs">
          {status === 'demo' ? 'DEMO ENVIRONMENT' : status.toUpperCase()}
        </Badge>
      )}
    </header>
  );
}

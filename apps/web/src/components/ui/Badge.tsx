import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'live' | 'demo' | 'stale' | 'error' | 'unavailable' | 'loading' | 'high' | 'medium' | 'low';
  children: React.ReactNode;
}

export function Badge({ variant = 'unavailable', className, children, ...props }: BadgeProps) {
  const variantStyles = {
    live: 'bg-green-950 text-green-400 border-green-800',
    demo: 'bg-accent-demo-bg text-accent-demo border-accent-demo-bg',
    stale: 'bg-yellow-950 text-yellow-500 border-yellow-800',
    error: 'bg-red-950 text-red-400 border-red-800',
    unavailable: 'bg-gray-800 text-gray-400 border-gray-700',
    loading: 'bg-blue-950 text-blue-400 border-blue-800 animate-pulse',
    high: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    medium: 'bg-amber-950 text-amber-400 border-amber-800',
    low: 'bg-orange-950 text-orange-400 border-orange-800',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

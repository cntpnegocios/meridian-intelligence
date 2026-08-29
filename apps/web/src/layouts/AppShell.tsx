import React from 'react';
import { cn } from '../lib/utils';
import { Anchor, Archive, Gauge, Globe2, Radar, Route, Scale, Ship, Waves } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Overview', icon: Gauge, path: '/' },
  { name: 'Voyage Intelligence', icon: Route, path: '/voyage-intelligence' },
  { name: 'Maritime Intelligence', icon: Ship, path: '/maritime-intelligence' },
  { name: 'Regulatory Radar', icon: Radar, path: '/regulatory-radar' },
  { name: 'EU ETS', icon: Scale, path: '/eu-ets' },
  { name: 'FuelEU', icon: Waves, path: '/fueleu' },
  { name: 'Green Corridors', icon: Globe2, path: '/green-corridors' },
  { name: 'Evidence Vault', icon: Archive, path: '/evidence-vault' },
  { name: 'Source Registry', icon: Archive, path: '/source-registry' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="w-[260px] bg-bg-sidebar border-r border-border-subtle flex flex-col p-6 shrink-0">
        <div className="flex items-center gap-3 pb-6 border-b border-border-subtle mb-6">
          <Anchor size={20} className="text-brand-primary" />
          <div className="flex flex-col">
            <strong className="text-sm tracking-widest text-text-base">MERIDIAN</strong>
            <span className="text-[10px] tracking-widest text-brand-primary mt-0.5 font-semibold">INTELLIGENCE</span>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-cyan-950/40 text-brand-secondary shadow-[inset_2px_0_0_0_var(--color-brand-primary)]" 
                    : "text-text-muted hover:text-text-base hover:bg-white/5"
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto border border-border-subtle rounded-lg p-3 text-[10px] tracking-wider text-brand-primary text-center font-medium bg-black/20">
          CONNECTED TO MERIDIANMRV CORE
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

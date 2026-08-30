import { cn } from '../lib/utils';
import { Anchor, Route, Ship, Radar, Scale, Waves, Globe2, Archive, Database, Building2, Eye, ChevronDown, FileText, ScanText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePortal, PORTAL_CONFIGS, type PortalRole } from '../lib/portalContext';
import { useState, type ReactNode } from 'react';

// ── Navigation per role ───────────────────────────────────────
type NavItem = { name: string; icon: ReactNode; path: string; roles: PortalRole[] };

const NAV_ITEMS: NavItem[] = [
  { name: 'Overview',            icon: <Scale size={18} />,     path: '/app/',                   roles: ['OPERATOR','SHIPPER','PORT','REGULATOR'] },
  { name: 'Voyage Intelligence', icon: <Route size={18} />,    path: '/app/voyage-intelligence', roles: ['OPERATOR','PORT'] },
  { name: 'Maritime Intelligence',icon: <Ship size={18} />,    path: '/app/maritime-intelligence',roles: ['OPERATOR'] },
  { name: 'Regulatory Radar',    icon: <Radar size={18} />,    path: '/app/regulatory-radar',   roles: ['OPERATOR','REGULATOR'] },
  { name: 'EU ETS',              icon: <Scale size={18} />,    path: '/app/eu-ets',              roles: ['OPERATOR','SHIPPER','REGULATOR'] },
  { name: 'FuelEU',              icon: <Waves size={18} />,    path: '/app/fueleu',              roles: ['OPERATOR','REGULATOR'] },
  { name: 'FinOps (ETS Faturamento)',icon: <FileText size={18} />,path: '/app/finops',           roles: ['OPERATOR'] },
  { name: 'Green Corridors',     icon: <Globe2 size={18} />,   path: '/app/green-corridors',    roles: ['OPERATOR','PORT'] },
  { name: 'Shipper Portal',      icon: <Building2 size={18} />,path: '/app/shipper',             roles: ['SHIPPER'] },
  { name: 'Port Dashboard',      icon: <Anchor size={18} />,   path: '/app/port',                roles: ['PORT'] },
  { name: 'AI Document Scanner', icon: <ScanText size={18} />, path: '/app/document-intelligence',roles: ['OPERATOR', 'PORT'] },
  { name: 'Evidence Vault',      icon: <Archive size={18} />,  path: '/app/evidence-vault',      roles: ['OPERATOR','REGULATOR'] },
  { name: 'Source Registry',     icon: <Database size={18} />, path: '/app/source-registry',     roles: ['OPERATOR','REGULATOR'] },
  { name: 'Settings',       icon: <Anchor size={18} />,   path: '/app/admin',               roles: ['OPERATOR','REGULATOR'] },
  { name: 'Public Voyage',       icon: <Eye size={18} />,      path: '/public/voyage/demo-001',  roles: ['PUBLIC'] },
];

// ── Role Switcher ─────────────────────────────────────────────
function RoleSwitcher() {
  const { role, config, setRole } = usePortal();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all",
          config.accent, config.color
        )}
      >
        <span className="truncate">{config.label}</span>
        <ChevronDown size={12} className={cn("shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border border-border-default bg-bg-panel shadow-xl overflow-hidden">
          {(Object.keys(PORTAL_CONFIGS) as PortalRole[]).map(r => {
            const cfg = PORTAL_CONFIGS[r];
            return (
              <button
                key={r}
                onClick={() => { setRole(r); setOpen(false); }}
                className={cn(
                  "w-full text-left px-4 py-3 text-xs transition-colors hover:bg-white/5 border-b border-border-subtle last:border-0",
                  r === role ? cn(cfg.color, 'font-semibold') : 'text-text-muted'
                )}
              >
                <div className="font-medium mb-0.5">{cfg.label}</div>
                <div className="text-[10px] text-text-muted leading-relaxed">{cfg.description}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── AppShell ──────────────────────────────────────────────────
export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { role, config } = usePortal();

  const visibleNav = NAV_ITEMS.filter(item => item.roles.includes(role));

  return (
    <div className="flex min-h-screen">
      <aside className="w-[260px] bg-bg-sidebar border-r border-border-subtle flex flex-col p-5 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 pb-5 border-b border-border-subtle mb-5">
          <Anchor size={20} className="text-brand-primary" />
          <div className="flex flex-col">
            <strong className="text-sm tracking-widest text-text-base">MERIDIAN</strong>
            <span className="text-[10px] tracking-widest text-brand-primary mt-0.5 font-semibold">INTELLIGENCE</span>
          </div>
        </div>

        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {visibleNav.map((item) => {
            const isActive = item.path === '/app/'
              ? location.pathname === '/app/' || location.pathname === '/app'
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? cn("bg-cyan-950/40 shadow-[inset_2px_0_0_0_var(--color-brand-primary)]", config.color)
                    : "text-text-muted hover:text-text-base hover:bg-white/5"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-2 pt-4 border-t border-border-subtle">
          <div className={cn(
            "rounded-lg p-2.5 text-[10px] tracking-wider text-center font-medium border",
            config.accent, config.color
          )}>
            {config.label.toUpperCase()}
          </div>
          <div className="rounded-lg p-2.5 text-[10px] tracking-wider text-brand-primary text-center font-medium bg-black/20 border border-border-subtle">
            CONNECTED TO MERIDIANMRV CORE
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}




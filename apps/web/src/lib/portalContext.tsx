/**
 * Portal Context — Multi-stakeholder role system
 * Personas: OPERATOR | SHIPPER | PORT | REGULATOR | PUBLIC
 */
import { createContext, useContext, useState, type ReactNode } from 'react';

export type PortalRole = 'OPERATOR' | 'SHIPPER' | 'PORT' | 'REGULATOR' | 'PUBLIC';

export interface PortalConfig {
  role: PortalRole;
  label: string;
  description: string;
  color: string;
  accent: string;
}

export const PORTAL_CONFIGS: Record<PortalRole, PortalConfig> = {
  OPERATOR: {
    role: 'OPERATOR',
    label: 'Operator Control Tower',
    description: 'Fleet management · EU ETS · FuelEU compliance · Emissions',
    color: 'text-cyan-400',
    accent: 'border-cyan-500/40 bg-cyan-500/10',
  },
  SHIPPER: {
    role: 'SHIPPER',
    label: 'Shipper Intelligence',
    description: 'CO2 per cargo · Scope 3 · ESG certificates · Booking tracking',
    color: 'text-emerald-400',
    accent: 'border-emerald-500/40 bg-emerald-500/10',
  },
  PORT: {
    role: 'PORT',
    label: 'Port Authority Dashboard',
    description: 'Vessel arrivals · Port emissions · Green berth ranking',
    color: 'text-blue-400',
    accent: 'border-blue-500/40 bg-blue-500/10',
  },
  REGULATOR: {
    role: 'REGULATOR',
    label: 'Regulatory Verification',
    description: 'MRV audit trail · SHA-256 verification · EU MRV export',
    color: 'text-violet-400',
    accent: 'border-violet-500/40 bg-violet-500/10',
  },
  PUBLIC: {
    role: 'PUBLIC',
    label: 'Public Transparency',
    description: 'Verified voyage data · Anti-greenwashing · Open access',
    color: 'text-amber-400',
    accent: 'border-amber-500/40 bg-amber-500/10',
  },
};

interface PortalContextType {
  role: PortalRole;
  config: PortalConfig;
  setRole: (role: PortalRole) => void;
}

const PortalContext = createContext<PortalContextType>({
  role: 'OPERATOR',
  config: PORTAL_CONFIGS.OPERATOR,
  setRole: () => {},
});

export function PortalProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<PortalRole>('OPERATOR');
  return (
    <PortalContext.Provider value={{ role, config: PORTAL_CONFIGS[role], setRole }}>
      {children}
    </PortalContext.Provider>
  );
}

export const usePortal = () => useContext(PortalContext);

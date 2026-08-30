import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { PortalProvider } from './lib/portalContext';
import './i18n';

// ── Landing & Public ──────────────────────────────────────────
import Onboarding from './pages/Onboarding';
import { PublicVoyagePage } from './pages/PublicVoyagePage';

// ── App Pages ─────────────────────────────────────────────────
import { Overview } from './pages/Overview';
import { VoyageIntelligence } from './pages/VoyageIntelligence';
import { MaritimeIntelligence } from './pages/MaritimeIntelligence';
import { RegulatoryRadar } from './pages/RegulatoryRadar';
import { EuEtsCalculator }  from './pages/EuEtsCalculator';
import { FuelEuScore } from './pages/FuelEuScore';
import GreenCorridorsDashboard from './pages/GreenCorridorsDashboard';
import { ShipperPortal } from './pages/ShipperPortal';
import { PortDashboard } from './pages/PortDashboard';
import { EvidenceVault } from './pages/EvidenceVault';
import { SourceRegistry } from './pages/SourceRegistry';
import AdminSettings from './pages/AdminSettings';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PortalProvider>
      <BrowserRouter>
        <Routes>
          {/* ── ROOT → Landing Page (always first) ── */}
          <Route path="/" element={<Onboarding />} />

          {/* ── Public voyage — no auth, no shell ── */}
          <Route path="/public/voyage/:id" element={<PublicVoyagePage />} />

          {/* ── App shell — all authenticated routes ── */}
          <Route path="/app/*" element={
            <AppShell>
              <Routes>
                <Route index                          element={<Overview />} />
                <Route path="voyage-intelligence"    element={<VoyageIntelligence />} />
                <Route path="maritime-intelligence"  element={<MaritimeIntelligence />} />
                <Route path="regulatory-radar"       element={<RegulatoryRadar />} />
                <Route path="eu-ets"                 element={<EuEtsCalculator />} />
                <Route path="fueleu"                 element={<FuelEuScore />} />
                <Route path="green-corridors"        element={<GreenCorridorsDashboard />} />
                <Route path="shipper"                element={<ShipperPortal />} />
                <Route path="port"                   element={<PortDashboard />} />
                <Route path="evidence-vault"         element={<EvidenceVault />} />
                <Route path="source-registry"        element={<SourceRegistry />} />
                <Route path="admin"                  element={<AdminSettings />} />
              </Routes>
            </AppShell>
          } />
        </Routes>
      </BrowserRouter>
    </PortalProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { PortalProvider } from './lib/portalContext';

// ── Landing & Public ──────────────────────────────────────────
import { LandingPage } from './pages/LandingPage';
import { PublicVoyagePage } from './pages/PublicVoyagePage';

// ── App Pages ─────────────────────────────────────────────────
import { Overview } from './pages/Overview';
import { VoyageIntelligence } from './pages/VoyageIntelligence';
import { MaritimeIntelligence } from './pages/MaritimeIntelligence';
import { RegulatoryRadar } from './pages/RegulatoryRadar';
import { EuEts }  from './pages/EuEtsPage';
import { FuelEuPage } from './pages/FuelEuPage';
import GreenCorridorsDashboard from './pages/GreenCorridorsDashboard';
import { ShipperPortal } from './pages/ShipperPortal';
import { PortDashboard } from './pages/PortDashboard';
import { EvidenceVault } from './pages/EvidenceVault';
import { SourceRegistry } from './pages/SourceRegistry';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PortalProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Landing — public, no shell ── */}
          <Route path="/landing" element={<LandingPage />} />

          {/* ── Public voyage page — no auth, no shell ── */}
          <Route path="/public/voyage/:id" element={<PublicVoyagePage />} />

          {/* ── App shell — all authenticated routes ── */}
          <Route path="/*" element={
            <AppShell>
              <Routes>
                <Route path="/"                      element={<Overview />} />
                <Route path="/voyage-intelligence"   element={<VoyageIntelligence />} />
                <Route path="/maritime-intelligence" element={<MaritimeIntelligence />} />
                <Route path="/regulatory-radar"      element={<RegulatoryRadar />} />
                <Route path="/eu-ets"                element={<EuEts />} />
                <Route path="/fueleu"                element={<FuelEuPage />} />
                <Route path="/green-corridors"       element={<GreenCorridorsDashboard />} />
                <Route path="/shipper"               element={<ShipperPortal />} />
                <Route path="/port"                  element={<PortDashboard />} />
                <Route path="/evidence-vault"        element={<EvidenceVault />} />
                <Route path="/source-registry"       element={<SourceRegistry />} />
              </Routes>
            </AppShell>
          } />
        </Routes>
      </BrowserRouter>
    </PortalProvider>
  </React.StrictMode>
);

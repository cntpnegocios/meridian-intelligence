import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { PortalProvider } from './lib/portalContext';
import './i18n';

// ── Landing & Public ──────────────────────────────────────────
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import PortalHub from './pages/PortalHub';
import RegulatoryFramework from './pages/RegulatoryFramework';
import LegalPage from './pages/LegalPage';
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
import FinOpsDashboard from './pages/FinOpsDashboard';
import AiDocumentScanner from './pages/AiDocumentScanner';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PortalProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Fluxo Público e Funil de Vendas ── */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Onboarding />} />
          <Route path="/hub" element={<PortalHub />} />
          <Route path="/regulatory" element={<RegulatoryFramework />} />
          <Route path="/legal/:document" element={<LegalPage />} />

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
                <Route path="finops"                 element={<FinOpsDashboard />} />
                <Route path="green-corridors"        element={<GreenCorridorsDashboard />} />
                <Route path="shipper"                element={<ShipperPortal />} />
                <Route path="port"                   element={<PortDashboard />} />
                <Route path="document-intelligence"  element={<AiDocumentScanner />} />
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




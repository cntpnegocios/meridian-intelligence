import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { Overview } from './pages/Overview';
import { VoyageIntelligence } from './pages/VoyageIntelligence';
import { MaritimeIntelligence } from './pages/MaritimeIntelligence';
import { RegulatoryRadar } from './pages/RegulatoryRadar';
import { EvidenceVault } from './pages/EvidenceVault';
import { SourceRegistry } from './pages/SourceRegistry';
import { EuEts, FuelEu, GreenCorridors } from './pages/AdditionalPages';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/voyage-intelligence" element={<VoyageIntelligence />} />
          <Route path="/maritime-intelligence" element={<MaritimeIntelligence />} />
          <Route path="/regulatory-radar" element={<RegulatoryRadar />} />
          <Route path="/eu-ets" element={<EuEts />} />
          <Route path="/fueleu" element={<FuelEu />} />
          <Route path="/green-corridors" element={<GreenCorridors />} />
          <Route path="/evidence-vault" element={<EvidenceVault />} />
          <Route path="/source-registry" element={<SourceRegistry />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </React.StrictMode>
);

import { Shield, Ship, MapPin, Gauge, Calendar, FileCheck, Satellite, Lock, CheckCircle2, Globe } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';

export function PublicVoyagePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <PageHeader
          title="Public Voyage Record"
          subtitle="Anti-greenwashing Transparency Page"
        />

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-bg-panel border-2 border-brand-primary rounded-xl shadow-[0_0_24px_rgba(89,189,184,0.3)]">
            <Shield className="w-8 h-8 text-brand-primary" />
            <span className="text-2xl font-bold text-brand-primary tracking-wide">VERIFIED</span>
            <CheckCircle2 className="w-8 h-8 text-brand-primary" />
          </div>
        </div>

        <div className="mt-12 bg-bg-panel border border-border-default rounded-xl p-8 shadow-lg">
          <div className="flex items-start gap-4 pb-6 border-b border-border-subtle">
            <div className="p-3 bg-bg-base rounded-lg border border-border-subtle">
              <Ship className="w-8 h-8 text-brand-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text-base mb-2">MV MERIDIAN PIONEER</h2>
              <div className="flex items-center gap-2 text-text-muted">
                <Badge variant="live">VERIFIED</Badge>
                <span className="text-sm">IMO 9876543</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-text-muted mb-1">Origin Port</div>
                  <div className="text-lg font-semibold text-text-base">Santos, Brazil</div>
                  <div className="text-xs text-text-muted mt-1">23.9608° S, 46.3336° W</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-text-muted mb-1">Destination Port</div>
                  <div className="text-lg font-semibold text-text-base">Rotterdam, Netherlands</div>
                  <div className="text-xs text-text-muted mt-1">51.9244° N, 4.4777° E</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-text-muted mb-1">Voyage Period</div>
                  <div className="text-lg font-semibold text-text-base">14 days, 6 hours</div>
                  <div className="text-xs text-text-muted mt-1">Jan 15, 2024 - Jan 29, 2024</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-text-muted mb-1">Distance Traveled</div>
                  <div className="text-lg font-semibold text-text-base">5,847 nautical miles</div>
                  <div className="text-xs text-text-muted mt-1">Average speed: 16.8 knots</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-bg-panel border-2 border-brand-primary rounded-xl p-8 shadow-[0_0_32px_rgba(89,189,184,0.2)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <Globe className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-base">Carbon Emissions</h3>
          </div>

          <div className="bg-bg-base rounded-lg p-6 border border-border-subtle mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-primary mb-2">2,523</div>
              <div className="text-lg text-text-muted">tonnes CO₂ equivalent</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="text-text-muted mb-1">Fuel Consumed</div>
              <div className="text-lg font-semibold text-text-base">812 tonnes</div>
              <div className="text-xs text-text-muted mt-1">VLSFO 0.5% sulfur</div>
            </div>

            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="text-text-muted mb-1">Emission Factor</div>
              <div className="text-lg font-semibold text-text-base">3.106 tCO₂/t</div>
              <div className="text-xs text-text-muted mt-1">Well-to-wake basis</div>
            </div>

            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="text-text-muted mb-1">Methodology</div>
              <div className="text-lg font-semibold text-text-base">ISO 14083:2023</div>
              <div className="text-xs text-text-muted mt-1">Verified standard</div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 bg-bg-base rounded-lg border border-border-subtle">
            <FileCheck className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-text-muted">
              Emissions calculated using ISO 14083:2023 quantification methodology with IMO DCS fuel consumption data and IPCC AR6 emission factors. Third-party verified by DNV Maritime Services.
            </div>
          </div>
        </div>

        <div className="mt-8 bg-bg-panel border border-border-default rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-bg-base rounded-lg border border-border-subtle">
              <Lock className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-base">Cryptographic Proof</h3>
          </div>

          <div className="bg-bg-base rounded-lg p-6 border border-border-subtle">
            <div className="text-xs text-text-muted mb-2 uppercase tracking-wide">SHA-256 Hash</div>
            <div className="font-mono text-sm text-brand-primary break-all leading-relaxed">
              a7f3c9e2b8d4f1a6c5e9b2d8f4a1c7e3b9d5f2a8c6e1b7d4f9a3c8e5b1d6f2a9
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="text-text-muted mb-1">Blockchain Network</div>
              <div className="font-semibold text-text-base">Ethereum Mainnet</div>
              <div className="text-xs text-text-muted mt-1">Block 18,947,231</div>
            </div>

            <div className="bg-bg-base rounded-lg p-4 border border-border-subtle">
              <div className="text-text-muted mb-1">Timestamp</div>
              <div className="font-semibold text-text-base">2024-01-29 14:23:17 UTC</div>
              <div className="text-xs text-text-muted mt-1">Immutable record</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-bg-base rounded-lg border border-border-subtle">
            <div className="text-xs text-text-muted mb-2">Transaction ID</div>
            <div className="font-mono text-xs text-text-base break-all">
              0x7c3f9a2e8b5d1c6f4a9e3b7d2f8c5a1e6b9d4f7a2c8e5b1d3f6a9c2e8b5d1f4
            </div>
          </div>
        </div>

        <div className="mt-8 bg-bg-panel border border-border-default rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-bg-base rounded-lg border border-border-subtle">
              <Satellite className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-base">Data Collection & Verification</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-bg-base rounded-lg border border-border-subtle">
              <div className="p-2 bg-brand-primary/10 rounded-lg flex-shrink-0">
                <Satellite className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <div className="font-semibold text-text-base mb-2">Satellite AIS Tracking</div>
                <div className="text-sm text-text-muted leading-relaxed">
                  Vessel position and movement data collected via Automatic Identification System (AIS) satellite receivers operated by exactEarth and ORBCOMM. Position updates received every 3-5 minutes throughout the voyage with 99.7% data completeness.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-bg-base rounded-lg border border-border-subtle">
              <div className="p-2 bg-brand-primary/10 rounded-lg flex-shrink-0">
                <Satellite className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <div className="font-semibold text-text-base mb-2">Copernicus SAR Imaging</div>
                <div className="text-sm text-text-muted leading-relaxed">
                  Synthetic Aperture Radar (SAR) imagery from Copernicus Sentinel-1 satellites provided independent verification of vessel position and wake patterns. 12 SAR acquisitions matched AIS data with 100% correlation, confirming route authenticity.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-bg-base rounded-lg border border-border-subtle">
              <div className="p-2 bg-brand-primary/10 rounded-lg flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <div className="font-semibold text-text-base mb-2">Independent Verification</div>
                <div className="text-sm text-text-muted leading-relaxed">
                  All data independently verified by DNV Maritime Services (accredited ISO 17029 verification body). Fuel consumption cross-referenced with IMO DCS reports, bunker delivery notes, and noon reports. Verification certificate ID: DNV-MRV-2024-00847.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/20">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-text-base leading-relaxed">
                This voyage record represents independently verified, satellite-confirmed emissions data. No self-reported estimates. No greenwashing. Complete transparency backed by cryptographic proof and third-party verification.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-text-muted">
          <div className="mb-2">Record generated on January 29, 2024</div>
          <div>For verification inquiries, contact verify@maritime-emissions.org</div>
        </div>
      </div>
    </div>
  );
}

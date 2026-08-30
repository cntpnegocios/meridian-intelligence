import { useState, useMemo, useEffect, useCallback } from 'react';

import { AlertTriangle, Info, Ship, Fuel, DollarSign, Calendar, Calculator, Anchor, Navigation } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';

interface FuelType {
  name: string;
  factor: number;
}

const FUEL_TYPES: Record<string, FuelType> = {
  HFO: { name: 'Heavy Fuel Oil (HFO)', factor: 3.114 },
  VLSFO: { name: 'Very Low Sulphur Fuel Oil (VLSFO)', factor: 3.151 },
  LNG: { name: 'Liquefied Natural Gas (LNG)', factor: 2.750 },
  METHANOL: { name: 'Methanol', factor: 1.375 },
};

const PHASE_IN_SCHEDULE = [
  { year: 2024, percentage: 40 },
  { year: 2025, percentage: 70 },
  { year: 2026, percentage: 100 },
];

const EUA_PRICE = 65;

// ── Route response type ────────────────────────────────────────────────────
interface RouteCalcResponse {
  distance_nm: number;
  duration_hours: number;
  route_type: string;
}

const MAJOR_PORTS = [
  { code: 'BRSSZ', name: 'Santos, Brazil' },
  { code: 'BRRIO', name: 'Rio de Janeiro, Brazil' },
  { code: 'BRPNG', name: 'Paranaguá, Brazil' },
  { code: 'BRSUA', name: 'Suape, Brazil' },
  { code: 'BRSSO', name: 'São Sebastião, Brazil' },
  { code: 'NLRTM', name: 'Rotterdam, Netherlands' },
  { code: 'GBLGP', name: 'London Gateway, UK' },
  { code: 'GBSOU', name: 'Southampton, UK' },
  { code: 'DEHAM', name: 'Hamburg, Germany' },
  { code: 'BEANR', name: 'Antwerp, Belgium' },
  { code: 'ESPBC', name: 'Barcelona, Spain' },
  { code: 'FRLEH', name: 'Le Havre, France' },
  { code: 'AEJEA', name: 'Jebel Ali, UAE' },
  { code: 'SGSIN', name: 'Singapore' },
  { code: 'USNYC', name: 'New York, USA' }
];

const PortAutocomplete = ({ value, onChange, placeholder, label }: { value: string, onChange: (val: string) => void, placeholder: string, label: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const filtered = useMemo(() => {
    if (!value) return [];
    return MAJOR_PORTS.filter(p => 
      p.code.toLowerCase().includes(value.toLowerCase()) || 
      p.name.toLowerCase().includes(value.toLowerCase())
    );
  }, [value]);

  return (
    <div className="relative">
      <label className="mb-1 block text-xs font-medium text-text-muted">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value.toUpperCase());
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full rounded-lg border border-border-default bg-bg-base px-3 py-2 text-text-base placeholder-text-muted focus:border-brand-primary focus:outline-none text-sm uppercase"
        placeholder={placeholder}
      />
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto rounded-lg border border-border-default bg-bg-panel shadow-2xl">
          {filtered.map(port => (
            <li 
              key={port.code}
              onMouseDown={() => {
                onChange(port.code);
                setIsOpen(false);
              }}
              className="cursor-pointer px-3 py-2 text-sm text-text-base hover:bg-brand-primary/10 hover:text-brand-primary border-b border-border-default/50 last:border-0"
            >
              <div className="font-mono text-[11px] font-bold text-brand-primary mb-0.5">{port.code}</div>
              <div className="text-[12px] text-text-muted">{port.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export function EuEtsCalculator() {
  const [distance, setDistance] = useState<string>('4200');
  const [cargo, setCargo] = useState<string>('45000');
  const [fuelConsumption, setFuelConsumption] = useState<string>('180');
  const [fuelType, setFuelType] = useState<string>('VLSFO');
  const [euScope, setEuScope] = useState<string>('50');
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  // ── Port-pair route fetch ─────────────────────────────────────────────────
  const [originCode, setOriginCode] = useState<string>('');
  const [destCode, setDestCode] = useState<string>('');
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [routeDistanceNm, setRouteDistanceNm] = useState<number | null>(null);

  const fetchRouteDistance = useCallback(async () => {
    if (!originCode.trim() || !destCode.trim()) return;
    setRouteLoading(true);
    setRouteError(null);
    try {
      const res = await fetch('/api/v1/routes/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin_lon: 0, origin_lat: 0, // coords not required when codes provided
          dest_lon: 0, dest_lat: 0,
          route_type: 'MARITIME',
          origin_code: originCode.trim().toUpperCase(),
          dest_code: destCode.trim().toUpperCase(),
        }),
      });
      if (!res.ok) throw new Error(`Route API error: ${res.status}`);
      const data: RouteCalcResponse = await res.json();
      setRouteDistanceNm(data.distance_nm);
      setDistance(String(Math.round(data.distance_nm)));
    } catch (e) {
      setRouteError(e instanceof Error ? e.message : 'Route lookup failed');
    } finally {
      setRouteLoading(false);
    }
  }, [originCode, destCode]);

  // Auto-fetch when both codes are filled (debounced by blur)
  useEffect(() => {
    if (originCode.trim().length >= 4 && destCode.trim().length >= 4) {
      fetchRouteDistance();
    }
  }, [originCode, destCode, fetchRouteDistance]);


  const calculations = useMemo(() => {
    const fuelAmount = parseFloat(fuelConsumption) || 0;
    const scopePercent = parseFloat(euScope) || 0;
    const fuelFactor = FUEL_TYPES[fuelType]?.factor || 0;
    const phaseIn = PHASE_IN_SCHEDULE.find(p => p.year === selectedYear)?.percentage || 0;

    const totalCO2 = fuelAmount * fuelFactor;
    const euCO2 = totalCO2 * (scopePercent / 100);
    const allowancesRequired = euCO2 * (phaseIn / 100);
    const financialExposure = allowancesRequired * EUA_PRICE;

    return {
      totalCO2,
      euCO2,
      allowancesRequired,
      financialExposure,
      phaseInPercent: phaseIn,
    };
  }, [fuelConsumption, fuelType, euScope, selectedYear]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-EU', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <PageHeader
          title="EU ETS Calculator"
          subtitle="Financial exposure & compliance estimation"
          status="demo"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg border border-border-default bg-bg-panel p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                    <Ship className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-base">Voyage Parameters</h2>
                    <p className="text-sm text-text-muted">Enter voyage and fuel data</p>
                  </div>
                </div>
                <Badge variant="demo">Demo Data</Badge>
              </div>

              <div className="space-y-5">
              <div className="rounded-lg border border-brand-primary/20 bg-brand-primary/5 p-4 mb-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Navigation className="h-4 w-4 text-brand-primary" />
                    <span className="text-sm font-medium text-text-base">Auto-fill Distance from Route API</span>
                    {routeDistanceNm !== null && (
                      <Badge variant="live">Route Loaded</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                                        <PortAutocomplete 
                      label="Origin Port (UN/LOCODE)"
                      placeholder="e.g. BRSSZ"
                      value={originCode}
                      onChange={setOriginCode}
                    />
                    <PortAutocomplete 
                      label="Destination Port (UN/LOCODE)"
                      placeholder="e.g. NLRTM"
                      value={destCode}
                      onChange={setDestCode}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={fetchRouteDistance}
                      disabled={routeLoading || !originCode.trim() || !destCode.trim()}
                      className="text-xs font-bold text-brand-primary hover:text-white px-3 py-1.5 rounded border border-brand-primary/50 hover:bg-brand-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {routeLoading ? 'Calculating…' : 'Fetch Route Distance'}
                    </button>
                    {routeDistanceNm !== null && (
                      <span className="text-xs text-emerald-400 font-mono">
                        ✓ {routeDistanceNm.toLocaleString()} nm auto-filled
                      </span>
                    )}
                    {routeError && (
                      <span className="text-xs text-red-400">{routeError}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-base">
                    Distance (Nautical Miles)
                  </label>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full rounded-lg border border-border-default bg-bg-base px-4 py-2.5 text-text-base placeholder-text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    placeholder="4200"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm font-medium text-text-base">
                    Cargo (Metric Tons)
                  </label>
                  <input
                    type="number"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full rounded-lg border border-border-default bg-bg-base px-4 py-2.5 text-text-base placeholder-text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    placeholder="45000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-base">
                    Fuel Consumption (Metric Tons)
                  </label>
                  <input
                    type="number"
                    value={fuelConsumption}
                    onChange={(e) => setFuelConsumption(e.target.value)}
                    className="w-full rounded-lg border border-border-default bg-bg-base px-4 py-2.5 text-text-base placeholder-text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    placeholder="180"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-base">
                    Fuel Type
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full rounded-lg border border-border-default bg-bg-base px-4 py-2.5 text-text-base focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  >
                    {Object.entries(FUEL_TYPES).map(([key, fuel]) => (
                      <option key={key} value={key}>
                        {fuel.name} ({fuel.factor} tCO₂/t)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center justify-between text-sm font-medium text-text-base">
                    <span>EU Scope Percentage</span>
                    <span className="text-brand-primary">{euScope}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={euScope}
                    onChange={(e) => setEuScope(e.target.value)}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-bg-base accent-brand-primary"
                  />
                  <div className="mt-2 flex justify-between text-xs text-text-muted">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-base">
                    Compliance Year
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PHASE_IN_SCHEDULE.map((phase) => (
                      <button
                        key={phase.year}
                        onClick={() => setSelectedYear(phase.year)}
                        className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                          selectedYear === phase.year
                            ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                            : 'border-border-default bg-bg-base text-text-muted hover:border-border-default hover:text-text-base'
                        }`}
                      >
                        <div className="text-base font-semibold">{phase.year}</div>
                        <div className="mt-1 text-xs">{phase.percentage}% Phase-in</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border-default bg-bg-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                  <Info className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-base">Calculation Methodology</h3>
                </div>
              </div>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-primary"></div>
                  <p>CO₂ Emissions = Fuel Consumption × Fuel Factor</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-primary"></div>
                  <p>EU Scope Emissions = Total CO₂ × (EU Scope % / 100)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-primary"></div>
                  <p>Allowances Required = EU Scope CO₂ × Phase-in %</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-primary"></div>
                  <p>Financial Exposure = Allowances × €{EUA_PRICE}/tCO₂</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-border-default bg-bg-panel p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                    <DollarSign className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-base">Financial Exposure</h2>
                    <p className="text-sm text-text-muted">EU ETS compliance cost for {selectedYear}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg border border-brand-primary/20 bg-brand-primary/5 p-6">
                <div className="mb-2 text-sm font-medium text-text-muted">Total EU ETS Cost</div>
                <div className="mb-1 text-4xl font-bold text-brand-primary">
                  {formatCurrency(calculations.financialExposure)}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {selectedYear} ({calculations.phaseInPercent}% phase-in) @ €{EUA_PRICE}/tCO₂
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  title="Total CO₂"
                  value={`${formatNumber(calculations.totalCO2, 1)} t`}
                  subtitle="Voyage emissions"
                  icon={<Fuel size={16} />}
                  status="demo"
                />
                <MetricCard
                  title="EU Scope CO₂"
                  value={`${formatNumber(calculations.euCO2, 1)} t`}
                  subtitle={`${euScope}% of total`}
                  icon={<Ship size={16} />}
                  status="demo"
                />
                <MetricCard
                  title="Allowances Required"
                  value={`${formatNumber(calculations.allowancesRequired, 1)} t`}
                  subtitle={`${calculations.phaseInPercent}% of EU scope`}
                  icon={<Calculator size={16} />}
                  status="demo"
                />
                <MetricCard
                  title="Cost per Ton Cargo"
                  value={formatCurrency(
                    calculations.financialExposure / (parseFloat(cargo) || 1)
                  )}
                  subtitle="ETS cost allocation"
                  icon={<Anchor size={16} />}
                  status="demo"
                />
              </div>
            </div>

            <div className="rounded-lg border border-border-default bg-bg-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-base">Compliance Warnings</h3>
                </div>
              </div>
              <div className="space-y-3">
                {calculations.financialExposure > 50000 && (
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm font-medium text-amber-500">
                      <AlertTriangle className="h-4 w-4" />
                      High Financial Exposure
                    </div>
                    <p className="text-sm text-text-muted">
                      ETS cost exceeds €50,000. Consider route optimization or fuel switching.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



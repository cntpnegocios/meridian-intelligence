// @ts-nocheck
const isProd = import.meta.env.PROD;
const API_BASE = isProd ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:8000');

export async function checkHealth(): Promise<'LIVE' | 'API UNAVAILABLE'> {
  try {
    const response = await fetch(API_BASE + '/api/health', { method: 'GET' });
    if (!response.ok) {
      return 'API UNAVAILABLE';
    }
    return 'LIVE';
  } catch (error) {
    return 'API UNAVAILABLE';
  }
}

export async function fetchVesselByImo(imo: string) {
  const response = await fetch(API_BASE + '/api/v1/assets/vessels/by-imo/' + imo);
  if (!response.ok) throw new Error('Vessel IMO ' + imo + ' not found');
  return response.json();
}

export async function simulateVoyage(payload: { vessel_id: string; distance_nm: number; target_speed_knots: number; regulatory_scope_percent: number }) {
  const response = await fetch(API_BASE + '/api/v1/engines/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Simulation failed');
  return response.json();
}

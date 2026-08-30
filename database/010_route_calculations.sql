-- Phase 2: Route Intelligence Engine — route_calculations table
-- Applied: 2026-08-30

CREATE TABLE IF NOT EXISTS route_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_unlocode VARCHAR(10) NOT NULL,
  destination_unlocode VARCHAR(10) NOT NULL,
  route_type VARCHAR(20) NOT NULL CHECK (route_type IN ('MARITIME','AVIATION','MULTIMODAL')),
  distance_nm NUMERIC(10,2),
  distance_km NUMERIC(10,2),
  duration_hours NUMERIC(8,2),
  geojson_route JSONB,
  waypoints JSONB,
  calculated_at TIMESTAMPTZ DEFAULT now(),
  source VARCHAR(50) DEFAULT 'searoute',
  confidence VARCHAR(20) DEFAULT 'HIGH'
);

CREATE INDEX IF NOT EXISTS idx_route_calc_pair
  ON route_calculations(origin_unlocode, destination_unlocode);

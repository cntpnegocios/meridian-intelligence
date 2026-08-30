-- Phase 3: Vessel & Aircraft Technical Registry (IMO GISIS / ICAO Standards)

-- 1. Expand vessels table to hold technical performance metrics
ALTER TABLE vessels 
ADD COLUMN IF NOT EXISTS mmsi text UNIQUE,
ADD COLUMN IF NOT EXISTS build_year integer,
ADD COLUMN IF NOT EXISTS gross_tonnage integer,
ADD COLUMN IF NOT EXISTS dwt integer, -- Deadweight tonnage (capacity)
ADD COLUMN IF NOT EXISTS length_m numeric,
ADD COLUMN IF NOT EXISTS beam_m numeric,
ADD COLUMN IF NOT EXISTS max_draft_m numeric,
ADD COLUMN IF NOT EXISTS engine_type text, -- e.g., '2-stroke slow speed', '4-stroke medium speed'
ADD COLUMN IF NOT EXISTS engine_power_kw numeric,
ADD COLUMN IF NOT EXISTS primary_fuel_type text, -- e.g., 'VLSFO', 'MGO', 'LNG', 'Methanol'
ADD COLUMN IF NOT EXISTS service_speed_knots numeric,
ADD COLUMN IF NOT EXISTS design_speed_knots numeric,
ADD COLUMN IF NOT EXISTS eexi numeric, -- Energy Efficiency Existing Ship Index
ADD COLUMN IF NOT EXISTS cii_rating text; -- A, B, C, D, E

-- 2. Create aircraft table
CREATE TABLE IF NOT EXISTS aircraft (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tail_number text UNIQUE NOT NULL,
    icao_type_code text NOT NULL, -- e.g., 'B77W', 'A359'
    manufacturer text,
    model text,
    build_year integer,
    mtow_kg integer, -- Maximum Takeoff Weight
    max_range_nm numeric,
    cruise_speed_knots numeric,
    fuel_capacity_liters numeric,
    primary_fuel_type text DEFAULT 'Jet A-1',
    engine_type text,
    engine_count integer,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE aircraft ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on aircraft" ON aircraft FOR SELECT USING (true);

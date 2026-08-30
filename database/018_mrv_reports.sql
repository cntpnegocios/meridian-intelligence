CREATE TABLE IF NOT EXISTS mrv_annual_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vessel_id UUID REFERENCES vessels(id) ON DELETE CASCADE,
    reporting_year INT NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, VERIFIED, SUBMITTED
    total_distance_nm NUMERIC(10,2),
    total_time_at_sea_hours NUMERIC(10,2),
    total_fuel_consumed_mt NUMERIC(10,2),
    total_co2_emitted_mt NUMERIC(10,2),
    report_data JSONB NOT NULL,
    hash_signature VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(vessel_id, reporting_year)
);

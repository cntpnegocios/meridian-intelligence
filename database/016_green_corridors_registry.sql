CREATE TABLE IF NOT EXISTS green_corridors_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    origin_unlocode VARCHAR(10) NOT NULL,
    destination_unlocode VARCHAR(10) NOT NULL,
    primary_fuel VARCHAR(50) DEFAULT 'Methanol',
    corridor_status VARCHAR(50) DEFAULT 'PILOT',
    compensation_partner VARCHAR(255),
    carbon_credits_available_tons NUMERIC(10,2) DEFAULT 0.0,
    credit_price_usd_per_ton NUMERIC(10,2) DEFAULT 0.0,
    established_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Initial Corridors for Demo
INSERT INTO green_corridors_registry (
    name, origin_unlocode, destination_unlocode, primary_fuel, corridor_status, compensation_partner, carbon_credits_available_tons, credit_price_usd_per_ton, established_date
) VALUES 
(
    'Santos-Rotterdam Bio-Methanol', 'BRSSZ', 'NLRTM', 'Bio-Methanol', 'ACTIVE', 'SouthPole Carbon Projects', 50000.0, 35.0, '2024-01-01'
),
(
    'Singapore-Los Angeles Green Ammonia', 'SGSIN', 'USLAX', 'Ammonia', 'PLANNING', 'Verra Registry Partners', 10000.0, 50.0, '2025-06-01'
) ON CONFLICT DO NOTHING;

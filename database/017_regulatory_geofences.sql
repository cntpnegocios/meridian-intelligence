CREATE TABLE IF NOT EXISTS regulatory_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    zone_type VARCHAR(50) NOT NULL, -- e.g., 'ECA_SOX', 'PIRACY', 'MPA'
    description TEXT,
    geom GEOMETRY(Polygon, 4326),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Spacial index for blazing fast coordinate lookups
CREATE INDEX IF NOT EXISTS idx_regulatory_zones_geom ON regulatory_zones USING GIST (geom);

CREATE TABLE IF NOT EXISTS geofence_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vessel_id UUID REFERENCES vessels(id) ON DELETE CASCADE,
    zone_id UUID REFERENCES regulatory_zones(id) ON DELETE CASCADE,
    event_type VARCHAR(20) CHECK (event_type IN ('ENTER', 'EXIT')),
    event_time TIMESTAMPTZ DEFAULT now(),
    latitude NUMERIC(10,6),
    longitude NUMERIC(10,6)
);

-- Insert the European North Sea & English Channel ECA (Simplified Bounding Box for Demo)
INSERT INTO regulatory_zones (name, zone_type, description, geom)
VALUES (
    'North Sea & English Channel ECA', 
    'ECA_SOX', 
    'IMO Emission Control Area. Ships must use 0.1% Sulfur fuel (MGO) or scrubbers.',
    ST_GeomFromText('POLYGON((-5.0 48.0, 10.0 48.0, 10.0 62.0, -5.0 62.0, -5.0 48.0))', 4326)
) ON CONFLICT DO NOTHING;

-- Insert a Piracy High Risk Area (HRA) off the Horn of Africa / Red Sea
INSERT INTO regulatory_zones (name, zone_type, description, geom)
VALUES (
    'Red Sea HRA (War/Piracy Risk)', 
    'WAR_RISK', 
    'High Risk Area. Requires military escort or routing deviation.',
    ST_GeomFromText('POLYGON((42.0 12.0, 45.0 12.0, 45.0 16.0, 42.0 16.0, 42.0 12.0))', 4326)
) ON CONFLICT DO NOTHING;

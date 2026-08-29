-- Sprint 3 (Part 2): Satellite Architecture & AIS Expansion

-- 1. Expansion of AIS Observations to support Satellite/Terrestrial distinction
CREATE TYPE ais_collection_type AS ENUM ('SATELLITE', 'TERRESTRIAL', 'UNAVAILABLE');

ALTER TABLE ais_observations 
    ADD COLUMN mmsi VARCHAR(20),
    ADD COLUMN heading DOUBLE PRECISION,
    ADD COLUMN navigation_status VARCHAR(50),
    ADD COLUMN collection_type ais_collection_type DEFAULT 'UNAVAILABLE',
    ADD COLUMN position_accuracy BOOLEAN DEFAULT FALSE,
    ADD COLUMN evidence_id UUID; -- Link to SAR or validation evidence if matched

-- 2. Add Copernicus/Satellite Imagery types to Evidence
ALTER TABLE evidence
    ADD COLUMN observation_type VARCHAR(50); -- e.g., 'AIS', 'SAR', 'OPTICAL', 'WEATHER'

-- 3. Create geofence table for green corridors / EU ETS boundaries
CREATE TABLE geofences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'GREEN_CORRIDOR', 'EU_ETS_ZONE', 'ECA_ZONE'
    geometry JSONB NOT NULL, -- GeoJSON representation of the polygon
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

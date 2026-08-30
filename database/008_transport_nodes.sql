-- Migration 008: Global Transport Node Registry
-- Sources: UN/LOCODE + NGA World Port Index + OurAirports
-- Builds on existing `ports` table — transport_nodes is the unified, richer registry

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS transport_nodes (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_type            TEXT NOT NULL CHECK (node_type IN ('PORT', 'AIRPORT', 'INLAND', 'MULTIMODAL', 'HELIPORT')),
  name                 TEXT NOT NULL,
  country              TEXT NOT NULL,
  country_iso          CHAR(2) NOT NULL,

  -- Identifiers
  unlocode             VARCHAR(5),           -- UN/LOCODE e.g. 'BRSSZ'
  iata                 VARCHAR(3),           -- IATA airport code e.g. 'GRU'
  icao                 VARCHAR(4),           -- ICAO airport code e.g. 'SBGR'
  wpi_id               TEXT,                 -- NGA World Port Index number

  -- Geography
  latitude             DOUBLE PRECISION NOT NULL,
  longitude            DOUBLE PRECISION NOT NULL,
  geom                 GEOMETRY(Point, 4326) GENERATED ALWAYS AS (
                         ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
                       ) STORED,

  -- Port-specific (from NGA WPI)
  harbour_type         TEXT,                 -- 'COASTAL', 'RIVER', 'LAKE', 'TIDAL', 'CANAL'
  harbour_size         TEXT,                 -- 'SMALL', 'MEDIUM', 'LARGE', 'VERY_LARGE'
  max_vessel_length_m  FLOAT,
  max_draft_m          FLOAT,
  channel_depth_m      FLOAT,
  anchorage_depth_m    FLOAT,
  has_containers       BOOLEAN DEFAULT false,
  has_lng              BOOLEAN DEFAULT false,
  has_bulk_liquid      BOOLEAN DEFAULT false,
  has_rail             BOOLEAN DEFAULT false,
  has_airport_nearby   BOOLEAN DEFAULT false,
  has_bunker           BOOLEAN DEFAULT false,
  has_drydock          BOOLEAN DEFAULT false,
  geofence_radius_m    INTEGER DEFAULT 10000,

  -- Airport-specific (from OurAirports)
  airport_type         TEXT,                 -- 'large_airport', 'medium_airport', 'small_airport', 'heliport', 'seaplane_base'
  elevation_ft         INTEGER,
  runway_count         INTEGER,
  has_scheduled_service BOOLEAN DEFAULT false,
  has_saf              BOOLEAN DEFAULT false,

  -- Regulatory flags (derived)
  in_eu_ets_scope      BOOLEAN DEFAULT false,
  in_fueleu_scope      BOOLEAN DEFAULT false,
  in_eca_seca          BOOLEAN DEFAULT false,
  in_eca_nox           BOOLEAN DEFAULT false,

  -- Data provenance
  source               TEXT NOT NULL DEFAULT 'MANUAL', -- 'UNLOCODE', 'NGA_WPI', 'OURAIRPORTS', 'MANUAL'
  source_updated_at    TIMESTAMPTZ,
  confidence           TEXT DEFAULT 'HIGH' CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW')),
  metadata             JSONB DEFAULT '{}',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Spatial index for bounding-box queries
CREATE INDEX IF NOT EXISTS idx_transport_nodes_geom    ON transport_nodes USING GIST (geom);
-- Lookup indexes
CREATE INDEX IF NOT EXISTS idx_transport_nodes_type    ON transport_nodes (node_type);
CREATE INDEX IF NOT EXISTS idx_transport_nodes_country ON transport_nodes (country_iso);
CREATE INDEX IF NOT EXISTS idx_transport_nodes_unlocode ON transport_nodes (unlocode) WHERE unlocode IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_transport_nodes_iata    ON transport_nodes (iata)     WHERE iata IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_transport_nodes_icao    ON transport_nodes (icao)     WHERE icao IS NOT NULL;
-- Full-text search on name
CREATE INDEX IF NOT EXISTS idx_transport_nodes_name_fts ON transport_nodes USING GIN (to_tsvector('english', name));

-- Seed from existing ports table (keeps backward compat)
INSERT INTO transport_nodes (
  node_type, name, country, country_iso, unlocode,
  latitude, longitude, geofence_radius_m,
  source, source_updated_at
)
SELECT
  'PORT' AS node_type,
  name,
  CASE country_code
    WHEN 'BR' THEN 'Brazil' WHEN 'NL' THEN 'Netherlands' WHEN 'ES' THEN 'Spain'
    WHEN 'DE' THEN 'Germany' WHEN 'BE' THEN 'Belgium' WHEN 'FR' THEN 'France'
    WHEN 'IT' THEN 'Italy'   WHEN 'PT' THEN 'Portugal'  ELSE country_code
  END AS country,
  country_code AS country_iso,
  unlocode,
  latitude, longitude, geofence_radius_meters,
  'UNLOCODE' AS source,
  now() AS source_updated_at
FROM ports
ON CONFLICT DO NOTHING;

-- Update EU ETS / FuelEU scope for EU ports
UPDATE transport_nodes
SET in_eu_ets_scope = true, in_fueleu_scope = true
WHERE country_iso IN ('NL','DE','BE','FR','IT','PT','ES','DK','SE','FI','PL','EE','LV','LT','IE','EL','MT','CY','HR','BG','RO','SI')
  AND node_type = 'PORT';

-- Seed key airports missing from current data
INSERT INTO transport_nodes (node_type, name, country, country_iso, iata, icao, latitude, longitude, airport_type, elevation_ft, has_scheduled_service, source, source_updated_at)
VALUES
  ('AIRPORT', 'São Paulo/Guarulhos International', 'Brazil',      'BR', 'GRU', 'SBGR', -23.4355, -46.4730, 'large_airport', 2459, true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Rotterdam The Hague',               'Netherlands', 'NL', 'RTM', 'EHRD', 51.9569, 4.43722, 'medium_airport', -15,  true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Frankfurt International',           'Germany',     'DE', 'FRA', 'EDDF', 50.0333, 8.57050, 'large_airport', 364,  true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Amsterdam Schiphol',                'Netherlands', 'NL', 'AMS', 'EHAM', 52.3086, 4.76389, 'large_airport', -11,  true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Antwerp International',             'Belgium',     'BE', 'ANR', 'EBAW', 51.1894, 4.46028, 'medium_airport', 39,   true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Marseille Provence',                'France',      'FR', 'MRS', 'LFML', 43.4393, 5.22142, 'large_airport', 74,   true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Genoa Cristoforo Colombo',          'Italy',       'IT', 'GOA', 'LIMJ', 44.4133, 8.83750, 'medium_airport', 13,   true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Lisbon Humberto Delgado',           'Portugal',    'PT', 'LIS', 'LPPT', 38.7813, -9.13592, 'large_airport', 374, true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Santos Dumont (Rio de Janeiro)',    'Brazil',      'BR', 'SDU', 'SBRJ', -22.9105, -43.1631, 'medium_airport', 11, true, 'OURAIRPORTS', now()),
  ('AIRPORT', 'Salgado Filho (Porto Alegre)',      'Brazil',      'BR', 'POA', 'SBPA', -29.9939, -51.1714, 'medium_airport', 9,  true, 'OURAIRPORTS', now())
ON CONFLICT DO NOTHING;

-- Update EU ETS scope for EU airports too
UPDATE transport_nodes SET in_eu_ets_scope = true
WHERE country_iso IN ('NL','DE','BE','FR','IT','PT','ES','DK','SE','FI','PL','EE','LV','LT','IE','EL','MT','CY','HR','BG','RO','SI')
  AND node_type = 'AIRPORT';

-- Sprint 2: Core Intelligence Entities and Data Governance Enhancements

-- 1. Data Governance Types
DO $$ BEGIN
    CREATE TYPE data_governance_status AS ENUM (
        'MEASURED',
        'REPORTED',
        'VERIFIED',
        'ESTIMATED',
        'INFERRED',
        'STALE',
        'UNAVAILABLE'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE confidence_level AS ENUM (
        'HIGH',
        'MEDIUM',
        'LOW',
        'UNAVAILABLE'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Port Calls
CREATE TABLE IF NOT EXISTS port_calls (
  id uuid PRIMARY KEY,
  vessel_id uuid REFERENCES vessels(id),
  voyage_id uuid REFERENCES voyages(id),
  port_unlocode text NOT NULL,
  arrival_at timestamptz,
  departure_at timestamptz,
  is_intermediate_stop boolean NOT NULL DEFAULT false,
  status data_governance_status NOT NULL DEFAULT 'UNAVAILABLE',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Voyage Legs
CREATE TABLE IF NOT EXISTS voyage_legs (
  id uuid PRIMARY KEY,
  voyage_id uuid REFERENCES voyages(id),
  start_port_call_id uuid REFERENCES port_calls(id),
  end_port_call_id uuid REFERENCES port_calls(id),
  distance_nm double precision,
  distance_status data_governance_status NOT NULL DEFAULT 'UNAVAILABLE',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Source Registry
CREATE TABLE IF NOT EXISTS source_registry (
  id uuid PRIMARY KEY,
  authority text NOT NULL,
  jurisdiction text,
  base_url text NOT NULL,
  access_method text NOT NULL, -- e.g. 'API', 'SCRAPER', 'PORTAL'
  license text,
  collection_frequency text NOT NULL, -- e.g. 'HOURLY', 'DAILY'
  parser_version text,
  last_success timestamptz,
  last_failure timestamptz,
  status text NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Expand Evidence (Alter table to match Data Governance spec)
ALTER TABLE evidence
ADD COLUMN IF NOT EXISTS authority text,
ADD COLUMN IF NOT EXISTS raw_object_key text,
ADD COLUMN IF NOT EXISTS extraction_method text,
ADD COLUMN IF NOT EXISTS human_validation_status text DEFAULT 'PENDING';

-- Convert confidence to ENUM
ALTER TABLE evidence 
  ALTER COLUMN confidence TYPE confidence_level 
  USING (CASE 
    WHEN confidence IN ('HIGH', 'MEDIUM', 'LOW', 'UNAVAILABLE') THEN confidence::confidence_level 
    ELSE 'UNAVAILABLE'::confidence_level 
  END);

-- 6. Expand AIS Observations
ALTER TABLE ais_observations
ADD COLUMN IF NOT EXISTS data_status data_governance_status DEFAULT 'MEASURED';

ALTER TABLE ais_observations 
  ALTER COLUMN confidence TYPE confidence_level 
  USING (CASE 
    WHEN confidence IN ('HIGH', 'MEDIUM', 'LOW', 'UNAVAILABLE') THEN confidence::confidence_level 
    ELSE 'UNAVAILABLE'::confidence_level 
  END);

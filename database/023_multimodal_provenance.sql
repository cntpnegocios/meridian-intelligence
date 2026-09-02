-- Phase 2/3 (Refactor): Multimodal Orchestration & Data Provenance
-- Applied: 2026-09-02

-- 1. Alter Route Calculations to segment emissions and track provenance
ALTER TABLE route_calculations
ADD COLUMN IF NOT EXISTS terrestrial_co2 NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS maritime_co2 NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS air_co2 NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS maritime_data_source VARCHAR(50) DEFAULT 'meridian_estimate';

-- 2. Alter Evidence to carry the Data Provenance and CPR Verde support
ALTER TABLE evidence
ADD COLUMN IF NOT EXISTS data_source VARCHAR(50) DEFAULT 'meridian_estimate',
ADD COLUMN IF NOT EXISTS cpr_verde_eligible BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS multimodal_total_co2e NUMERIC(10,2) DEFAULT 0;

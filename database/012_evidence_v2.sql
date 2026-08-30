-- Phase 8: Evidence Vault v2 — SHA-256 provenance + cryptographic verification chain
-- Applied: 2026-08-30

-- Add provenance columns to evidence table (safe: IF NOT EXISTS)
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS sha256_hash VARCHAR(64);
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS parser_version VARCHAR(20);
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS confidence VARCHAR(20) DEFAULT 'HIGH';
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS data_type VARCHAR(50);

-- Cryptographic verification chain
CREATE TABLE IF NOT EXISTS evidence_proofs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_id UUID REFERENCES evidence(id) ON DELETE CASCADE,
  proof_type VARCHAR(50) NOT NULL,   -- SHA256, TIMESTAMP, SIGNATURE
  proof_value TEXT NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT now(),
  verifier VARCHAR(100) DEFAULT 'meridian_engine'
);

CREATE INDEX IF NOT EXISTS idx_evidence_proofs_evidence_id
  ON evidence_proofs(evidence_id);

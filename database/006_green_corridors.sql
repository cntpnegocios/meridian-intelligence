-- Sprint 5: Green Corridors Domain Model

CREATE TABLE green_corridors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PLANNING', -- PLANNING, ACTIVE, SUSPENDED
    target_emissions_intensity DOUBLE PRECISION,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE corridor_endpoints (
    corridor_id UUID REFERENCES green_corridors(id),
    port_unlocode VARCHAR(5) REFERENCES ports(unlocode),
    endpoint_type VARCHAR(50) NOT NULL, -- ORIGIN, DESTINATION, HUB
    PRIMARY KEY (corridor_id, port_unlocode)
);

CREATE TABLE calculation_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    corridor_id UUID REFERENCES green_corridors(id),
    scenario_name TEXT NOT NULL,
    inputs JSONB NOT NULL,
    result JSONB NOT NULL,
    methodology_version VARCHAR(50),
    software_version VARCHAR(50),
    uncertainty VARCHAR(50),
    status VARCHAR(50) DEFAULT 'CALCULATED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE evidence_candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calculation_run_id UUID REFERENCES calculation_runs(id),
    status VARCHAR(50) DEFAULT 'PENDING_REVIEW', -- PENDING_REVIEW, APPROVED, REJECTED, PROMOTED
    human_reviewer_id TEXT,
    promoted_to_core_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

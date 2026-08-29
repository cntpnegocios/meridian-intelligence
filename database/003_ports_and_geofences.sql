-- Sprint 3: Ports and Geofences

CREATE TABLE IF NOT EXISTS ports (
    unlocode VARCHAR(5) PRIMARY KEY, -- e.g., 'BRSSZ' for Santos
    name TEXT NOT NULL,
    country_code VARCHAR(2) NOT NULL, -- e.g., 'BR', 'NL'
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geofence_radius_meters INTEGER DEFAULT 5000, -- Default 5km radius for arrival/departure detection
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Associate port_calls with the actual ports table
ALTER TABLE port_calls 
    ADD CONSTRAINT fk_port_calls_ports 
    FOREIGN KEY (port_unlocode) REFERENCES ports(unlocode);

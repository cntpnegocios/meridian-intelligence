-- Sprint 5: Seed Green Corridor Pilot Data

-- 1. Create the Corridor
INSERT INTO green_corridors (id, name, status, target_emissions_intensity) 
VALUES ('c3d5e2a1-b8d9-4f76-92c1-8b2c456a0001', 'Santos - Rotterdam (Green Ammonia / Methanol Pilot)', 'ACTIVE', 120.5)
ON CONFLICT DO NOTHING;

-- 2. Map Endpoints
INSERT INTO corridor_endpoints (corridor_id, port_unlocode, endpoint_type)
VALUES ('c3d5e2a1-b8d9-4f76-92c1-8b2c456a0001', 'BRSSZ', 'ORIGIN')
ON CONFLICT DO NOTHING;

INSERT INTO corridor_endpoints (corridor_id, port_unlocode, endpoint_type)
VALUES ('c3d5e2a1-b8d9-4f76-92c1-8b2c456a0001', 'NLRTM', 'DESTINATION')
ON CONFLICT DO NOTHING;

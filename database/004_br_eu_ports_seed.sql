-- Seed Data: Major Brazilian and European Ports for Meridian Intelligence

INSERT INTO ports (unlocode, name, country_code, latitude, longitude, geofence_radius_meters) VALUES
-- Brazil (BR)
('BRSSZ', 'Santos', 'BR', -23.9744, -46.2936, 10000),
('BRPNG', 'Paranagua', 'BR', -25.5056, -48.5133, 8000),
('BRRIO', 'Rio de Janeiro', 'BR', -22.8833, -43.1833, 8000),
('BRRIG', 'Rio Grande', 'BR', -32.1278, -52.1039, 6000),
('BRITJ', 'Itajai', 'BR', -26.9078, -48.6531, 5000),
('BRVIX', 'Vitoria', 'BR', -20.3194, -40.3378, 6000),
('BRPEC', 'Pecem', 'BR', -3.5414, -38.8028, 5000),
('BRSUA', 'Suape', 'BR', -8.3969, -34.9614, 6000),
('BRMAO', 'Manaus', 'BR', -3.1367, -59.9886, 5000),
('BRBEL', 'Belem', 'BR', -1.4558, -48.5039, 5000),
('BRITA', 'Itaqui', 'BR', -2.5714, -44.3644, 7000),

-- Netherlands (NL)
('NLRTM', 'Rotterdam', 'NL', 51.8850, 4.2867, 15000),
('NLAMS', 'Amsterdam', 'NL', 52.3783, 4.8872, 10000),
('NLFLS', 'Flushing (Vlissingen)', 'NL', 51.4447, 3.5939, 8000),

-- Spain (ES)
('ESALG', 'Algeciras', 'ES', 36.1281, -5.4386, 10000),
('ESVLC', 'Valencia', 'ES', 39.4447, -0.3161, 8000),
('ESBCN', 'Barcelona', 'ES', 41.3467, 2.1644, 8000),
('ESLPA', 'Las Palmas', 'ES', 28.1408, -15.4228, 6000),
('ESBIO', 'Bilbao', 'ES', 43.3444, -3.0569, 5000),

-- Germany (DE)
('DEHAM', 'Hamburg', 'DE', 53.5358, 9.9400, 12000),
('DEBRE', 'Bremen', 'DE', 53.1111, 8.7494, 8000),
('DEBRV', 'Bremerhaven', 'DE', 53.5653, 8.5564, 8000),

-- Belgium (BE)
('BEANR', 'Antwerp', 'BE', 51.2725, 4.3406, 15000),
('BEZEE', 'Zeebrugge', 'BE', 51.3417, 3.1978, 8000),

-- France (FR)
('FRLEH', 'Le Havre', 'FR', 49.4678, 0.1342, 8000),
('FRMRS', 'Marseille', 'FR', 43.3150, 5.3406, 10000),
('FRDKK', 'Dunkerque', 'FR', 51.0489, 2.3392, 6000),

-- Italy (IT)
('ITGOA', 'Genoa', 'IT', 44.4056, 8.8950, 8000),
('ITNAP', 'Naples', 'IT', 40.8353, 14.2742, 6000),
('ITSPE', 'La Spezia', 'IT', 44.1025, 9.8322, 5000),
('ITTRS', 'Trieste', 'IT', 45.6264, 13.7661, 6000),

-- Portugal (PT)
('PTSIN', 'Sines', 'PT', 37.9511, -8.8778, 8000),
('PTLEI', 'Leixoes', 'PT', 41.1856, -8.7003, 5000),
('PTLIS', 'Lisbon', 'PT', 38.6967, -9.1672, 6000)
ON CONFLICT (unlocode) DO UPDATE SET 
    latitude = EXCLUDED.latitude, 
    longitude = EXCLUDED.longitude, 
    geofence_radius_meters = EXCLUDED.geofence_radius_meters;

CREATE TABLE IF NOT EXISTS bunker_delivery_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vessel_id UUID REFERENCES vessels(id) ON DELETE CASCADE,
    bunker_port VARCHAR(10),
    delivery_date DATE,
    fuel_type VARCHAR(50),
    quantity_mt NUMERIC(10,2),
    sulfur_content_pct NUMERIC(5,2),
    density_kg_m3 NUMERIC(10,2),
    supplier_name VARCHAR(255),
    ocr_confidence NUMERIC(5,2), -- Confiança da Inteligência Artificial na leitura
    is_verified BOOLEAN DEFAULT FALSE,
    raw_extracted_text TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

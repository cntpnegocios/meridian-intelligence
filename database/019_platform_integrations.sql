CREATE TABLE IF NOT EXISTS platform_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_name VARCHAR(50) UNIQUE NOT NULL, -- 'GREENSEE', 'SPIRE', 'KPLER'
    api_key VARCHAR(255),
    is_active BOOLEAN DEFAULT FALSE,
    last_sync TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Injetar os slots vazios das parceiras (Inativas por padrão aguardando chave)
INSERT INTO platform_integrations (provider_name, is_active) VALUES ('GREENSEE', FALSE) ON CONFLICT DO NOTHING;
INSERT INTO platform_integrations (provider_name, is_active) VALUES ('SPIRE_AIS', FALSE) ON CONFLICT DO NOTHING;

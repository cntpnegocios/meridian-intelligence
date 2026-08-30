CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL, -- Ex: 'Maersk Line', 'Cargill', 'MSC'
    tenant_domain VARCHAR(255) UNIQUE,
    subscription_tier VARCHAR(50) DEFAULT 'ENTERPRISE',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed de Tenants para Demonstração (Isolamento Multi-Cliente)
INSERT INTO tenants (name, tenant_domain) VALUES ('Maersk Line A/S', 'maersk.com') ON CONFLICT DO NOTHING;
INSERT INTO tenants (name, tenant_domain) VALUES ('Mediterranean Shipping Company', 'msc.com') ON CONFLICT DO NOTHING;

-- Adicionando colunas de Tenant_id às tabelas críticas
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
ALTER TABLE voyages ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
ALTER TABLE mrv_annual_reports ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);

-- Atribuindo todos os dados atuais à Maersk (para não quebrar a plataforma demo atual)
UPDATE vessels SET tenant_id = (SELECT id FROM tenants WHERE tenant_domain = 'maersk.com') WHERE tenant_id IS NULL;

-- Ativando Row Level Security (RLS) no Supabase (Proteção Multi-SaaS)
ALTER TABLE vessels ENABLE ROW LEVEL SECURITY;

-- Exemplo de política restritiva (Apenas para demonstração estrutural)
-- "Você só vê o navio se o tenant_id do navio for o seu tenant_id no token JWT da sessão."
DROP POLICY IF EXISTS "tenant_isolation_vessels" ON vessels;
CREATE POLICY "tenant_isolation_vessels" ON vessels
    FOR ALL
    USING (tenant_id = auth.uid()::uuid); -- Supõe-se que auth.uid contém o tenant em uma modelagem custom claim, ou é resolvido no backend

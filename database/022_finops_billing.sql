CREATE TABLE IF NOT EXISTS finops_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    vessel_id UUID REFERENCES vessels(id) ON DELETE CASCADE,
    mrv_report_id UUID REFERENCES mrv_annual_reports(id) ON DELETE CASCADE,
    invoice_date DATE DEFAULT CURRENT_DATE,
    carbon_eua_price_eur NUMERIC(10,2) NOT NULL, -- Preço do mercado da tonelada de CO2
    total_co2_mt NUMERIC(10,2) NOT NULL,
    total_tax_liability_eur NUMERIC(15,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'UNPAID', -- UNPAID, PAID, HEDGED
    created_at TIMESTAMPTZ DEFAULT now()
);

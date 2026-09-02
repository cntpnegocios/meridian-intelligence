from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Dict, Any

class FinopsEngine:
    @staticmethod
    def generate_carbon_invoice(db: Session, mrv_report_id: str, eua_market_price_eur: float) -> Dict[str, Any]:
        """
        Receives an official EU MRV Report and generates the Financial Invoice (Liability) 
        based on the real-time or fixed EUA (European Union Allowance) carbon market price.
        """
        # Fetch the MRV Report details
        report = db.execute(text("""
            SELECT m.vessel_id, m.reporting_year, m.total_co2_emitted_mt, v.tenant_id, v.name
            FROM mrv_annual_reports m
            JOIN vessels v ON m.vessel_id = v.id
            WHERE m.id = :rid
        """), {"rid": mrv_report_id}).fetchone()
        
        if not report:
            raise ValueError(f"MRV Report ID {mrv_report_id} not found.")
            
        vessel_id = report[0]
        year = report[1]
        co2_mt = float(report[2])
        tenant_id = report[3]
        vessel_name = report[4]
        
        # Calculate Liability (1 ton of CO2 = 1 EUA allowance to be surrendered)
        tax_liability = co2_mt * eua_market_price_eur
        
        # Persist the invoice
        db.execute(text("""
            INSERT INTO finops_invoices 
            (tenant_id, vessel_id, mrv_report_id, carbon_eua_price_eur, total_co2_mt, total_tax_liability_eur, status)
            VALUES (:t_id, :v_id, :r_id, :price, :co2, :tax, 'UNPAID')
        """), {
            "t_id": tenant_id,
            "v_id": vessel_id,
            "r_id": mrv_report_id,
            "price": eua_market_price_eur,
            "co2": co2_mt,
            "tax": tax_liability
        })
        db.commit()
        
        return {
            "invoice_status": "GENERATED",
            "vessel_name": vessel_name,
            "reporting_year": year,
            "co2_emitted_metric_tons": co2_mt,
            "eua_market_price_eur": eua_market_price_eur,
            "total_liability_eur": round(tax_liability, 2),
            "currency": "EUR",
            "erp_integration_ready": True
        }

    @staticmethod
    def generate_cpr_verde(booking_ref: str, total_co2e: float) -> Dict[str, Any]:
        """
        Generates a CPR Verde (Cédula de Produto Rural Verde) instrument
        for agricultural multimodal transport compensation in Brazil.
        """
        import uuid
        import datetime
        
        # Baseline price for Brazilian CPR Verde carbon equivalent (e.g., 45 BRL per ton)
        cpr_price_brl = 45.0
        total_value_brl = total_co2e * cpr_price_brl
        
        cpr_token = {
            "token_id": f"CPR-BR-{str(uuid.uuid4())[:8].upper()}",
            "instrument": "CPR_VERDE",
            "issue_date": datetime.datetime.utcnow().isoformat(),
            "booking_reference": booking_ref,
            "underlying_asset": "Multimodal CO2e Abatement",
            "volume_mt": total_co2e,
            "unit_price_brl": cpr_price_brl,
            "total_value_brl": round(total_value_brl, 2),
            "status": "AVAILABLE_FOR_OFFSET"
        }
        return cpr_token


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db
from app.core.finops_engine import FinopsEngine
from pydantic import BaseModel

router = APIRouter()

class InvoiceRequest(BaseModel):
    mrv_report_id: str
    eua_market_price_eur: float = 85.50

@router.post("/generate-invoice")
def generate_carbon_invoice(request: InvoiceRequest, db: Session = Depends(get_db)):
    try:
        invoice = FinopsEngine.generate_carbon_invoice(db, request.mrv_report_id, request.eua_market_price_eur)
        return {"status": "success", "invoice": invoice}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/invoices")
def get_invoices(db: Session = Depends(get_db)):
    """
    Retorna o passivo ambiental (Faturas FinOps) para o Dashboard Comercial.
    """
    res = db.execute(text("""
        SELECT f.id, v.name as vessel_name, f.invoice_date, f.carbon_eua_price_eur, 
               f.total_co2_mt, f.total_tax_liability_eur, f.status
        FROM finops_invoices f
        JOIN vessels v ON f.vessel_id = v.id
        ORDER BY f.created_at DESC
        LIMIT 20
    """)).fetchall()
    
    invoices = []
    for r in res:
        invoices.append({
            "id": str(r[0]),
            "vessel_name": r[1],
            "date": str(r[2]),
            "eua_price": float(r[3]),
            "co2_mt": float(r[4]),
            "total_eur": float(r[5]),
            "status": r[6]
        })
        
    return {"status": "success", "invoices": invoices}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.finops_engine import FinopsEngine
from pydantic import BaseModel

router = APIRouter()

class InvoiceRequest(BaseModel):
    mrv_report_id: str
    eua_market_price_eur: float = 85.50 # Default current market price

@router.post("/generate-invoice")
def generate_carbon_invoice(request: InvoiceRequest, db: Session = Depends(get_db)):
    """
    Translates an environmental MRV report into a financial ledger liability.
    """
    try:
        invoice = FinopsEngine.generate_carbon_invoice(db, request.mrv_report_id, request.eua_market_price_eur)
        return {
            "status": "success",
            "invoice": invoice
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

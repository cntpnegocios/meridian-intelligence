from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.core.document_intelligence import DocumentIntelligenceEngine

router = APIRouter()

class BDNUploadRequest(BaseModel):
    vessel_id: str
    ocr_raw_text: str

@router.post("/extract-bdn")
def extract_bunker_note(request: BDNUploadRequest, db: Session = Depends(get_db)):
    """
    Receives raw OCR text from an uploaded Bunker Delivery Note (PDF/JPG),
    extracts key metrics (Quantity, Fuel Type, Sulfur), and archives it for MRV Auditing.
    """
    extraction_result = DocumentIntelligenceEngine.extract_bdn_data(
        db, 
        vessel_id=request.vessel_id, 
        raw_ocr_text=request.ocr_raw_text
    )
    
    return {
        "status": "success",
        "message": "BDN Processed and Archived",
        "extracted_data": extraction_result
    }

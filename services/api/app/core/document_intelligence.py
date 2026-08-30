import re
import json
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Dict, Any

class DocumentIntelligenceEngine:
    @staticmethod
    def extract_bdn_data(db: Session, vessel_id: str, raw_ocr_text: str) -> Dict[str, Any]:
        """
        Simula a extração de um LLM/OCR sobre um recibo físico de Bunker.
        Na vida real, a imagem do documento passaria pelo AWS Textract ou GPT-4 Vision,
        gerando este texto bruto que nós parseamos com expressões regulares/LLM.
        """
        # Extração simulada via Expressões Regulares em cima do texto sujo do OCR
        fuel_type_match = re.search(r'(VLSFO|HSFO|MGO|MDO|LNG|METHANOL)', raw_ocr_text, re.IGNORECASE)
        qty_match = re.search(r'(?i)(?:Quantity|Qty|Total)[\s:]*([0-9,.]+)\s*(?:MT|Tons)', raw_ocr_text)
        sulfur_match = re.search(r'(?i)Sulfur.*?([0-9.]+)\s*%', raw_ocr_text)
        density_match = re.search(r'(?i)Density.*?([0-9.]+)\s*(?:kg/m3|kg)', raw_ocr_text)
        port_match = re.search(r'(?i)Port[\s:]*([A-Z]{5})', raw_ocr_text)
        
        extracted_data = {
            "bunker_port": port_match.group(1).upper() if port_match else "UNKNOWN",
            "fuel_type": fuel_type_match.group(1).upper() if fuel_type_match else "UNKNOWN",
            "quantity_mt": float(qty_match.group(1).replace(',', '')) if qty_match else 0.0,
            "sulfur_content_pct": float(sulfur_match.group(1)) if sulfur_match else 0.0,
            "density_kg_m3": float(density_match.group(1)) if density_match else 0.0,
            "supplier_name": "OCR Extracted Supplier",
            "ocr_confidence": 92.5 if qty_match and fuel_type_match else 45.0, # Penaliza confiança se faltar dado crítico
            "raw_text": raw_ocr_text
        }
        
        # Salva o resultado auditável no Banco de Dados
        db.execute(text("""
            INSERT INTO bunker_delivery_notes 
            (vessel_id, bunker_port, fuel_type, quantity_mt, sulfur_content_pct, density_kg_m3, supplier_name, ocr_confidence, raw_extracted_text)
            VALUES (:vid, :port, :fuel, :qty, :sulfur, :density, :supplier, :conf, :raw)
        """), {
            "vid": vessel_id,
            "port": extracted_data["bunker_port"],
            "fuel": extracted_data["fuel_type"],
            "qty": extracted_data["quantity_mt"],
            "sulfur": extracted_data["sulfur_content_pct"],
            "density": extracted_data["density_kg_m3"],
            "supplier": extracted_data["supplier_name"],
            "conf": extracted_data["ocr_confidence"],
            "raw": extracted_data["raw_text"]
        })
        db.commit()
        
        return extracted_data

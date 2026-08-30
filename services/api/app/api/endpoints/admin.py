from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from app.db.session import get_db

router = APIRouter()

class IntegrationConfig(BaseModel):
    api_key: str

@router.get("/integrations")
def get_integrations(db: Session = Depends(get_db)):
    """Retorna o status de todas as integrações da plataforma."""
    result = db.execute(text("SELECT provider_name, is_active, updated_at FROM platform_integrations")).fetchall()
    return {
        "status": "success",
        "integrations": [
            {
                "provider": row[0],
                "is_active": row[1],
                "updated_at": row[2]
            } for row in result
        ]
    }

@router.post("/integrations/{provider}/connect")
def connect_integration(provider: str, config: IntegrationConfig, db: Session = Depends(get_db)):
    """Recebe a API Key da Greensee (ou outra) e desbloqueia o motor no Meridian."""
    provider = provider.upper()
    
    # Verifica se a parceira existe
    row = db.execute(text("SELECT id FROM platform_integrations WHERE provider_name = :p"), {"p": provider}).first()
    if not row:
        raise HTTPException(status_code=404, detail="Provider not found")
        
    # Salva a chave e ativa
    db.execute(text("""
        UPDATE platform_integrations 
        SET api_key = :key, is_active = TRUE, updated_at = now()
        WHERE provider_name = :p
    """), {"key": config.api_key, "p": provider})
    
    db.commit()
    
    return {
        "status": "success",
        "message": f"{provider} Integration unlocked successfully.",
        "is_active": True
    }

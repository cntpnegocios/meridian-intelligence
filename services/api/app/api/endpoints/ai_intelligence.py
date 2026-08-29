"""
AI Intelligence Endpoint
Server-side AI via Blink AI Gateway.
Key is NEVER returned to the client.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.adapters.blink_ai_provider import blink_ai

router = APIRouter()


class RegulationQuery(BaseModel):
    regulation_text: str
    question: str


class AnomalyQuery(BaseModel):
    vessel_name: str
    anomaly_context: str


class CorridorSummaryQuery(BaseModel):
    corridor_data: dict


@router.post("/interpret-regulation")
async def interpret_regulation(body: RegulationQuery):
    """
    Interpret a regulation excerpt.
    Response is tagged MODEL_OPINION — not authoritative.
    """
    try:
        result = await blink_ai.interpret_regulation(
            regulation_text=body.regulation_text,
            question=body.question,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Blink AI Gateway error: {str(e)}")


@router.post("/explain-anomaly")
async def explain_anomaly(body: AnomalyQuery):
    """Explain an emission anomaly. Response is MODEL_OPINION."""
    try:
        return await blink_ai.explain_emission_anomaly(
            vessel_name=body.vessel_name,
            anomaly_context=body.anomaly_context,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Blink AI Gateway error: {str(e)}")


@router.post("/corridor-summary")
async def corridor_summary(body: CorridorSummaryQuery):
    """Strategic AI summary of corridor performance. Response is MODEL_OPINION."""
    try:
        return await blink_ai.summarize_corridor_performance(
            corridor_data=body.corridor_data,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Blink AI Gateway error: {str(e)}")


@router.get("/health")
async def ai_health():
    """Check Blink AI Gateway connectivity without exposing the key."""
    try:
        result = await blink_ai.chat(
            user_message="Reply with exactly: MERIDIAN_AI_OK",
            max_tokens=20,
        )
        return {
            "status": "connected",
            "model": result["model"],
            "gateway": "Blink AI Gateway",
        }
    except Exception as e:
        return {"status": "degraded", "error": str(e)}

"""
Blink AI Gateway Adapter
========================
Server-side ONLY. The BLINK_AI_KEY must NEVER reach the frontend.

Blink AI Gateway provides access to 200+ AI models via an OpenAI-compatible API.
Confirmed Base URL: https://core.blink.new/api/v1
Auth: Bearer <BLINK_AI_KEY>
Chat endpoint: POST /ai/chat/completions
Model format: provider/model-id  (e.g. "anthropic/claude-haiku-4.5")

Available models (sample):
  anthropic/claude-sonnet-4.5   — best reasoning
  anthropic/claude-haiku-4.5    — fast + economical
  openai/gpt-5.1                — latest OpenAI
  google/gemini-3-flash         — Google fast
  google/gemini-2.5-flash-lite  — Google lite

Use this adapter for:
- Regulatory text interpretation
- Emission anomaly explanation
- Evidence narrative generation
- Port intelligence summarization
- Green corridor optimization suggestions
"""

from typing import Optional
import httpx
from app.core.config import settings


class BlinkAIProvider:
    """
    OpenAI-compatible client targeting the Blink AI Gateway.
    Base URL: https://core.blink.new/api/v1
    Chat: POST /ai/chat/completions

    All calls are server-side. The API key never leaves the backend.
    LLM outputs are tagged as MODEL_OPINION or INFERENCE,
    never as authoritative regulatory data.
    """

    def __init__(self):
        self.base_url = settings.BLINK_AI_BASE_URL.rstrip("/")
        self.model = settings.BLINK_AI_DEFAULT_MODEL
        self.headers = {
            "Authorization": f"Bearer {settings.BLINK_AI_KEY}",
            "Content-Type": "application/json",
        }

    async def chat(
        self,
        user_message: str,
        system_prompt: Optional[str] = None,
        model: Optional[str] = None,
        max_tokens: int = 512,
        temperature: float = 0.3,
    ) -> dict:
        """
        Send a chat completion request to Blink AI Gateway.

        Returns a dict with:
          - content: str — the model response
          - model: str — model used
          - source_type: "MODEL_OPINION" — always, to enforce provenance rules
          - warning: str — reminder that this is not an authoritative source
        """
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": user_message})

        payload = {
            "model": model or self.model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{self.base_url}/ai/chat/completions",
                json=payload,
                headers=self.headers,
            )
            response.raise_for_status()
            data = response.json()

        content = data["choices"][0]["message"]["content"]
        used_model = data.get("model", model or self.model)

        return {
            "content": content,
            "model": used_model,
            "source_type": "MODEL_OPINION",
            "warning": (
                "This response is a model inference and does not constitute "
                "authoritative regulatory, legal, or emissions data. "
                "Verify with the Evidence Vault before promoting to MeridianMRV Core."
            ),
        }

    async def interpret_regulation(self, regulation_text: str, question: str) -> dict:
        """Interpret a regulation excerpt in the context of a specific question."""
        system = (
            "You are a maritime regulatory assistant supporting the Meridian Intelligence platform. "
            "You interpret EU MRV, EU ETS, FuelEU Maritime, and IMO regulations. "
            "Always cite article numbers when possible. "
            "Clearly distinguish between what regulations REQUIRE and what you RECOMMEND. "
            "Never fabricate regulatory references."
        )
        return await self.chat(
            user_message=f"Regulation text:\n{regulation_text}\n\nQuestion: {question}",
            system_prompt=system,
            max_tokens=800,
        )

    async def explain_emission_anomaly(self, vessel_name: str, anomaly_context: str) -> dict:
        """Generate a human-readable explanation for a detected emission anomaly."""
        system = (
            "You are an emissions analysis assistant for Meridian Intelligence. "
            "Analyze AIS and emission data anomalies. "
            "Be concise, technical, and suggest verifiable next steps. "
            "Always flag if the anomaly could indicate data quality issues vs. real emission changes."
        )
        return await self.chat(
            user_message=f"Vessel: {vessel_name}\nAnomaly context: {anomaly_context}",
            system_prompt=system,
            max_tokens=400,
        )

    async def summarize_corridor_performance(self, corridor_data: dict) -> dict:
        """Generate a strategic summary of green corridor performance."""
        system = (
            "You are a Green Corridor intelligence analyst for Meridian Intelligence. "
            "Provide concise, actionable summaries of corridor performance data. "
            "Focus on decarbonization trends, fuel efficiency, and regulatory compliance."
        )
        import json
        return await self.chat(
            user_message=f"Corridor data:\n{json.dumps(corridor_data, indent=2)}",
            system_prompt=system,
            max_tokens=600,
        )


# Singleton instance — server-side only
blink_ai = BlinkAIProvider()

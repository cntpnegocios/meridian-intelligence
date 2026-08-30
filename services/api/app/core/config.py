from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Meridian Intelligence API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str = "postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres"

    # Provider Settings (To be overridden by ENV in production)
    AIS_PROVIDER_IMPL: str = "demo"  # "spire", "kpler", "demo"

    # ── Blink AI Gateway ──────────────────────────────────────
    # Base URL confirmed: https://core.blink.new/api/v1  (OpenAI-compatible)
    # Key format: blnk_ak_...  (Workspace API Key from Settings → API Keys)
    # NEVER expose this key to the frontend — server-side only
    BLINK_AI_KEY: str = "blnk_ak_j5fb8NA6wMCOyB24p1eWOLfQ56lcudoRo2hCeSY8I0S2zImU"
    BLINK_AI_BASE_URL: str = "https://core.blink.new/api/v1"
    # Model format: provider/model-id
    # Available: anthropic/claude-sonnet-4.5, anthropic/claude-haiku-4.5,
    #            openai/gpt-5.1, google/gemini-3-flash, google/gemini-2.5-flash-lite
    BLINK_AI_DEFAULT_MODEL: str = "anthropic/claude-haiku-4.5"  # fast + cost-effective for inference

    # ── Blink Personal Access Token ───────────────────────────
    # Used to manage Blink platform projects programmatically
    # Token format: blnk_c5... (Personal Access Token from Settings → Tokens de Acesso)
    BLINK_PROJECT_TOKEN: str = "blnk_c5UMQp21VYI0u47p"

    DATABASE_URL_DIRECT: str = ""  # Direct connection (may not resolve from all networks)

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore unknown env vars (e.g. GITHUB_REPO etc.)

settings = Settings()



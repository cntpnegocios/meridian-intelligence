from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Meridian Intelligence API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/meridian_intelligence"
    
    # Provider Settings (To be overridden by ENV in production)
    AIS_PROVIDER_IMPL: str = "demo" # "spire", "kpler", "demo"

    class Config:
        env_file = ".env"

settings = Settings()

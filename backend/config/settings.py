import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AURA Hackathon Backend"
    API_V1_STR: str = "/api/v1"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    ENV: str = os.getenv("ENV", "dev")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    MODEL_NAME: str = os.getenv("MODEL_NAME", "gpt-5-nano")
    REALTIME_MODEL: str = os.getenv("REALTIME_MODEL", "gpt-4o-realtime-preview")
    CALL_LANG : str = os.getenv("CALL_LANG","English")
    REALTIME_URL: str = os.getenv("REALTIME_URL", "wss://api.openai.com/v1/realtime")
settings = Settings()

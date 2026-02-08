from openai import AsyncOpenAI
from config.settings import settings

class TTSService:
    def __init__(self):
        if not settings.OPENAI_API_KEY:
             print("WARNING: OPENAI_API_KEY is not set. TTS will fail.")
             self.client = None
        else:
             self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
             
        self.model = "tts-1"
        self.voice = "alloy" # Options: alloy, echo, fable, onyx, nova, shimmer

    async def speak(self, text: str) -> bytes:
        if not self.client:
            return b""
            
        print(f"TTS Service (OpenAI) speaking: {text}")
        
        try:
            response = await self.client.audio.speech.create(
                model=self.model,
                voice=self.voice,
                input=text
            )
            return response.content
        except Exception as e:
            print(f"TTS Error (OpenAI): {e}")
            return b""

tts_service = TTSService()

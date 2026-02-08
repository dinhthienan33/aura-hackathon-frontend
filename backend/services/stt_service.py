from openai import AsyncOpenAI
import os
import tempfile
from config.settings import settings

class STTService:
    def __init__(self):
        if not settings.OPENAI_API_KEY:
            print("WARNING: OPENAI_API_KEY is not set. STT will fail.")
            self.client = None
        else:
            self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        
        self.model = "whisper-1"

    async def transcribe(self, audio_data: bytes) -> str:
        if not self.client:
            print("STT Service Error: No OPENAI_API_KEY provided.")
            return "Lỗi cấu hình STT"

        print(f"STT Service (OpenAI) received {len(audio_data)} bytes of audio")
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp_file:
            tmp_file.write(audio_data)
            tmp_path = tmp_file.name
            
        try:
            with open(tmp_path, "rb") as file_obj:
                transcription = await self.client.audio.transcriptions.create(
                    file=file_obj,
                    model=self.model,
                    language="en", 
                    temperature=0.0
                )
                
            text = transcription.text
            print(f"Transcript: {text}")
            return text
            
        except Exception as e:
            print(f"STT Error (OpenAI): {e}")
            return ""
        finally:
            if os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except:
                    pass

stt_service = STTService()

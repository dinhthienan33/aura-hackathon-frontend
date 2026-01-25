import random

class STTService:
    async def transcribe(self, audio_data: bytes) -> str:
        # Simulate processing time
        # In real impl, this would send to OpenAI Whisper or similar
        print(f"STT Service received {len(audio_data)} bytes of audio")
        return "Alo"

stt_service = STTService()

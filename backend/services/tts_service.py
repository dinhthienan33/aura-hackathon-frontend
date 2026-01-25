import struct
import math
import asyncio

class TTSService:
    async def speak(self, text: str) -> bytes:
        print(f"TTS Service speaking: {text}")
        await asyncio.sleep(0.5) # Simulate latency
        # Returns a dummy WAV file (1 second of sine wave beep)
        return self._generate_sine_wave()

    def _generate_sine_wave(self, frequency=440.0, duration=1.0, sample_rate=44100) -> bytes:
        n_samples = int(sample_rate * duration)
        amplitude = 32767 // 2
        
        # WAV Header setup
        # See http://soundfile.sapp.org/doc/WaveFormat/
        
        audio_data = bytearray()
        for i in range(n_samples):
            value = int(amplitude * math.sin(2 * math.pi * frequency * i / sample_rate))
            audio_data.extend(struct.pack('<h', value))
            
        byte_rate = sample_rate * 2 # 16-bit mono
        block_align = 2
        
        header = struct.pack('<4sI4s4sIHHIIHH4sI', 
            b'RIFF', 
            36 + len(audio_data), 
            b'WAVE', 
            b'fmt ', 
            16, 
            1, # PCM
            1, # Mono
            sample_rate, 
            byte_rate, 
            block_align, 
            16, # Bits per sample
            b'data', 
            len(audio_data)
        )
        
        return header + audio_data

tts_service = TTSService()

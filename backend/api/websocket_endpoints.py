from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.stt_service import stt_service
from services.llm_service import llm_service
from services.tts_service import tts_service
import asyncio
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_text(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_bytes(self, data: bytes, websocket: WebSocket):
        await websocket.send_bytes(data)

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Wait for message from client
            # We expect audio bytes (blob) or text (json)
            # For simplicity, let's assume client sends:
            # 1. Text control messages
            # 2. Binary audio data
            
            message = await websocket.receive()
            
            if "text" in message:
                data_text = message["text"]
                # Handle text control if needed
                print(f"Received text: {data_text}")
                await manager.send_text(f"Server received: {data_text}", websocket)
                
            elif "bytes" in message:
                audio_data = message["bytes"]
                print(f"Received {len(audio_data)} bytes of audio")
                
                # 1. STT
                transcript = await stt_service.transcribe(audio_data)
                await manager.send_text(json.dumps({"type": "transcript", "content": transcript}), websocket)
                
                # 2. LLM
                response_text = await llm_service.process(transcript)
                await manager.send_text(json.dumps({"type": "llm_response", "content": response_text}), websocket)
                
                # 3. TTS
                audio_response = await tts_service.speak(response_text)
                await manager.send_bytes(audio_response, websocket)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")
        # Try to close if possible, or just ignore
        pass

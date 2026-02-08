import json
import asyncio
import os
import websockets
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from services.agent_service import agent_service
from services.conversation_orchestrator import conversation_orchestrator
from config.settings import settings
router = APIRouter()

OPENAI_API_KEY = settings.OPENAI_API_KEY
REALTIME_MODEL = settings.REALTIME_MODEL  
REALTIME_URL = settings.REALTIME_URL + "?model=" + REALTIME_MODEL
CALL_LANG = settings.CALL_LANG

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_text(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_bytes(self, data: bytes, websocket: WebSocket):
        await websocket.send_bytes(data)

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, agent_id: str = Query(None)):
    await manager.connect(websocket)
    
    current_agent = None
    if agent_id:
        current_agent = agent_service.get_agent(agent_id)
        print(f"WS Connected. Agent: {current_agent.name if current_agent else 'None'} ({agent_id})")

    try:
        while True:
            message = await websocket.receive()
            
            flow = None
            
            if "text" in message:
                data_text = message["text"]
                print(f"Received text: {data_text}")
                flow = conversation_orchestrator.process_text_flow(data_text, current_agent)
                
            elif "bytes" in message:
                audio_data = message["bytes"]
                print(f"Received audio: {len(audio_data)} bytes")
                flow = conversation_orchestrator.process_audio_flow(audio_data, current_agent)
            
            if flow:
                async for result in flow:
                    if result["type"] == "audio":
                        await manager.send_bytes(result["content"], websocket)
                    else:
                        await manager.send_text(json.dumps(result), websocket)

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("WS Disconnected")
    except Exception as e:
        print(f"WS Error: {e}")

@router.websocket("/realtime-relay")
async def realtime_relay(websocket: WebSocket):
    """
    Relays messages between the client and OpenAI Realtime API.
    """
    await websocket.accept()
    
    auth_header = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "OpenAI-Beta": "realtime=v1"
    }

    try:
        async with websockets.connect(REALTIME_URL, additional_headers=auth_header) as openai_ws:
            print("Connected to OpenAI Realtime API")
            
            # Initialize session with language
            await openai_ws.send(json.dumps({
                "type": "session.update",
                "session": {
                    "instructions": f"Please speak in {CALL_LANG}."
                }
            }))

            async def client_to_openai():
                try:
                    while True:
                        message = await websocket.receive_text()
                        await openai_ws.send(message)
                except Exception as e:
                    print(f"Client to OpenAI error: {e}")

            async def openai_to_client():
                try:
                    async for message in openai_ws:
                        await websocket.send_text(message)
                except Exception as e:
                    print(f"OpenAI to client error: {e}")

            # Run both relay directions concurrently
            await asyncio.gather(client_to_openai(), openai_to_client())

    except WebSocketDisconnect:
        print("Client disconnected from relay")
    except Exception as e:
        print(f"Relay Error: {e}")
    finally:
        try:
            await websocket.close()
        except:
            pass


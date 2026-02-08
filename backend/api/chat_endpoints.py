from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
import base64
from services.agent_service import agent_service
from services.rag_service import rag_service
from services.stt_service import stt_service
from services.tts_service import tts_service
from services.history_service import history_service

router = APIRouter()

@router.post("/chat", response_model=dict)
async def chat_text(payload: dict):
    """
    Text-to-Text interaction using RAG.
    """
    user_text = payload.get("text", "")
    agent_id = payload.get("agent_id")
    
    if not user_text:
        return {"response": "No text provided"}
    
    agent = agent_service.get_agent(agent_id) if agent_id else None
    
    # Use RAG Service directly for simple text-text
    response_text = await rag_service.chat(user_text, agent=agent)
    
    # Save to history
    if agent_id:
        history_service.save_message(agent_id, "user", user_text)
        history_service.save_message(agent_id, "assistant", response_text)
    
    return {"response": response_text}

@router.get("/history/{agent_id}")
async def get_chat_history(agent_id: str):
    """
    Retrieve conversation history for an agent.
    """
    return history_service.get_history(agent_id)

@router.post("/talk")
async def talk_to_aura(file: UploadFile = File(...)):
    """
    Audio-to-Audio interaction (One-shot).
    STT -> RAG -> TTS
    """
    # 1. Read Audio
    audio_bytes = await file.read()
    
    # 2. STT
    transcript = await stt_service.transcribe(audio_bytes)
    if not transcript:
        return {"error": "Could not understand audio"}
    
    # 3. RAG Loop (Use default agent or parameterize if needed)
    # For /talk, we might want to support agent_id, but it's harder with file upload unless using Form
    # Let's assume default agent for now or add Form param
    response_text = await rag_service.chat(transcript, agent=None)
    
    # 4. TTS
    audio_output = await tts_service.speak(response_text)
    
    return {
        "user_text": transcript,
        "ai_response": response_text,
        "audio_base64": base64.b64encode(audio_output).decode('utf-8')
    }

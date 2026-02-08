from services.stt_service import stt_service
from services.tts_service import tts_service
from services.rag_service import rag_service
from services.agent_service import AgentProfile
from services.history_service import history_service
from typing import AsyncGenerator, Dict, Any

class ConversationOrchestrator:
    """
    Orchestrates the flow of conversation:
    1. Input handling (Text or Audio)
    2. AI Processing (LLM)
    3. Output generation (TTS for voice)
    """

    async def process_text_flow(self, text: str, agent: AgentProfile) -> AsyncGenerator[Dict[str, Any], None]:
        """
        Process text input -> LLM -> Result
        Yields:
            - {"type": "llm_response", "content": text}
        """

        response_text = await rag_service.chat(text, agent=agent)
        
        # Save to history
        history_service.save_message(agent.id, "user", text)
        history_service.save_message(agent.id, "assistant", response_text)
        
        yield {
            "type": "llm_response",
            "content": response_text
        }

    async def process_audio_flow(self, audio_data: bytes, agent: AgentProfile) -> AsyncGenerator[Dict[str, Any], None]:
        """
        Process audio input -> STT -> LLM -> TTS -> Result
        Yields:
            - {"type": "transcript", "content": text}
            - {"type": "llm_response", "content": text}
            - {"type": "audio", "content": bytes}
        """
        # 1. STT
        transcript = await stt_service.transcribe(audio_data)
        yield {
            "type": "transcript",
            "content": transcript # Return transcript to user immediately
        }

        if not transcript or transcript.startswith("Error"):
             # Handle error gracefully?
             pass

        # 2. RAG + LLM + Memory
        response_text = await rag_service.chat(transcript, agent=agent)
        
        # Save to history
        history_service.save_message(agent.id, "user", transcript)
        history_service.save_message(agent.id, "assistant", response_text)
        
        yield {
            "type": "llm_response",
            "content": response_text
        }

        # 3. TTS
        # MVP: Generate TTS for the full response
        # Future: Stream TTS chunk by chunk
        audio_response = await tts_service.speak(response_text)
        if audio_response:
            yield {
                "type": "audio",
                "content": audio_response # Binary content handled by caller
            }

conversation_orchestrator = ConversationOrchestrator()

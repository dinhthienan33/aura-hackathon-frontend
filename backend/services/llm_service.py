import os
from openai import AsyncOpenAI
from services.agent_service import AgentProfile
from backend.services.prompts.system_prompts import DEFAULT_SYSTEM_PROMPT, LLM_AGENT_PROMPT_TEMPLATE
from config.settings import settings

class LLMService:
    def __init__(self): 
        self.api_key = settings.OPENAI_API_KEY
        self.client = None
        if self.api_key:
            self.client = AsyncOpenAI(api_key=self.api_key)
        else:
            print("Warning: OPENAI_API_KEY not found in environment variables.")

    async def process(self, text: str, agent: AgentProfile = None) -> str:
        if not self.client:
            return "Error: OpenAI API Key not configured."

        system_instruction = DEFAULT_SYSTEM_PROMPT
        if agent and agent.system_prompt:
            system_instruction = LLM_AGENT_PROMPT_TEMPLATE.format(
                name=agent.name, 
                system_prompt=agent.system_prompt
            )

        try:
            response = await self.client.chat.completions.create(
                model=settings.MODEL_NAME,
                messages=[
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": text}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI Error: {e}")
            return "Xin lỗi, tôi đang gặp sự cố kết nối."

llm_service = LLMService()

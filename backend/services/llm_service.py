import asyncio

class LLMService:
    async def process(self, text: str) -> str:
        # Dummy Logic for Skeleton
        print(f"LLM Service processing text: {text}")
        await asyncio.sleep(0.5) # Simulate latency
        if "alo" in text.lower():
            return "Chào bạn, Aura đây. Bạn cần giúp gì không ạ?"
        return "Aura đang lắng nghe bạn đây."

llm_service = LLMService()

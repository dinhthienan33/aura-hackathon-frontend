import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings, StorageContext, load_index_from_storage
from llama_index.llms.openai import OpenAI
from llama_index.core.memory import ChatMemoryBuffer
from services.agent_service import AgentProfile
from config.settings import settings
from services.prompts.system_prompts import DEFAULT_SYSTEM_PROMPT, RAG_AGENT_PROMPT_TEMPLATE
class RAGService:
    def __init__(self):
        self.index = None
        self.memory_buffers = {} # Map agent_id/session_id to ChatMemoryBuffer
        self._initialize()

    def _initialize(self):
        # 1. Configure Settings with OpenAI
        api_key = settings.OPENAI_API_KEY
        if not api_key:
            print("Warning: OPENAI_API_KEY not set.")
        
        Settings.llm = OpenAI(model=settings.MODEL_NAME, temperature=0.7, api_key=api_key)

        # 2. Load or Create Index
        persist_dir = "./storage"
        if os.path.exists(persist_dir):
            print("Loading RAG index from storage...")
            try:
                storage_context = StorageContext.from_defaults(persist_dir=persist_dir)
                self.index = load_index_from_storage(storage_context)
            except Exception as e:
                 print(f"Error loading index: {e}. Recreating...")
                 self._create_index(persist_dir)
        else:
            self._create_index(persist_dir)

    def _create_index(self, persist_dir: str):
        print("Creating new RAG index from docs...")
        docs_dir = "../docs"
        if os.path.exists(docs_dir):
            documents = SimpleDirectoryReader(docs_dir, recursive=True).load_data()
            self.index = VectorStoreIndex.from_documents(documents)
            # Persist
            if not os.path.exists(persist_dir):
                os.makedirs(persist_dir)
            self.index.storage_context.persist(persist_dir=persist_dir)
        else:
            print(f"Warning: Docs directory {docs_dir} not found. RAG will be empty.")
            self.index = VectorStoreIndex.from_documents([])

    def _get_memory(self, agent_id: str):
        if agent_id not in self.memory_buffers:
            # Token limit 3000 for context window safety
            self.memory_buffers[agent_id] = ChatMemoryBuffer.from_defaults(token_limit=3000)
        return self.memory_buffers[agent_id]

    async def chat(self, text: str, agent: AgentProfile) -> str:
        """
        Chat with RAG context and Memory Buffer.
        Each Agent (or Session) gets its own Memory Buffer.
        """
        if not self.index:
            return "System Error: RAG Index not initialized."

        # Custom System Prompt for the Agent + RAG Context
        system_prompt = DEFAULT_SYSTEM_PROMPT
        if agent:
             system_prompt = RAG_AGENT_PROMPT_TEMPLATE.format(
                 name=agent.name,
                 description=agent.description,
                 system_prompt=agent.system_prompt
             )

        memory = self._get_memory(agent.id if agent else "default")

        # Create engine on the fly or cache it? 
        # ChatEngine is lightweight if index is loaded. 
        # We inject the specific memory buffer for this session.
        chat_engine = self.index.as_chat_engine(
            chat_mode="context",
            memory=memory,
            system_prompt=system_prompt,
            verbose=True
        )

        response = await chat_engine.achat(text)
        return str(response)

rag_service = RAGService()

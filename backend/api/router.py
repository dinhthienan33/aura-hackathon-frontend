from fastapi import APIRouter
from api import websocket_endpoints, chat_endpoints
from api.agent_endpoints import router as agent_router

api_router = APIRouter()

api_router.include_router(websocket_endpoints.router, tags=["websocket"])
api_router.include_router(chat_endpoints.router, tags=["chat"])
api_router.include_router(agent_router, prefix="/agents", tags=["agents"])
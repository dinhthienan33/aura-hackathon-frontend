from fastapi import APIRouter
from api import websocket_endpoints

api_router = APIRouter()

api_router.include_router(websocket_endpoints.router, tags=["websocket"])

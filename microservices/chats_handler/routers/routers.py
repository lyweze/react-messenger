from fastapi import APIRouter

from microservices.chats_handler.config.settings import ChatHandlerApiSettings
from microservices.chats_handler.routers.components import (
    create_chat,
)

chat_handler_router = APIRouter(prefix=ChatHandlerApiSettings.API_V1_PREFIX, tags=["chats_handler"])

chat_handler_router.include_router(create_chat.router)


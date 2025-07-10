import os
from typing import List

from dotenv import load_dotenv

load_dotenv()


class ChatHandlerApiSettings:
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "3000"))

    CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "*").split(",")
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = [
        "Origin",
        "Content-Length",
        "Content-Type",
        "Authorization",
    ]

    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "react-messenger chats_handler"
    VERSION: str = "1.0.0"
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

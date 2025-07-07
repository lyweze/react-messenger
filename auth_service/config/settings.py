import os
from typing import List


class AuthApiSettings:
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET", "")
    JWT_ALGORITHM: str = "HS256"

    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "3000"))

    # CORS SECURITY
    """
    CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "*").split(",")
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = [
        "Origin", 
        "Content-Length", 
        "Content-Type", 
        "Authorization"
    ]
    """

    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "react-messenger auth"
    VERSION: str = "1.0.0"

    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    def __init__(self):
        if not self.SUPABASE_JWT_SECRET:
            raise ValueError("Please set the SUPABASE_JWT_SECRET environment variable")


AuthApiSettings = AuthApiSettings()

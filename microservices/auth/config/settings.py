import os
from typing import List

from dotenv import load_dotenv

load_dotenv()


class AuthApiSettings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY")

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
    AUTH_HEADERS: dict[str, str] = {
        "apikey": SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
    }

    REGISTER_URL: str = f"{SUPABASE_URL}/auth/v1/signup"
    SIGNIN_URL: str = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    REFRESH_TOKEN_URL: str = f"{SUPABASE_URL}/auth/v1/token?grant_type=refresh_token"

    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "react-messenger auth"
    VERSION: str = "1.0.0"
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")


AuthApiSettings: AuthApiSettings = AuthApiSettings()

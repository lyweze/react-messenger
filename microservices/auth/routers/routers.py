from fastapi import APIRouter

from microservices.auth.config.settings import AuthApiSettings
from microservices.auth.routers.components import (
    fast_login,
    refresh_tokens,
    register,
    signin,
)

auth_router = APIRouter(prefix=AuthApiSettings.API_V1_PREFIX, tags=["auth"])
auth_router.include_router(fast_login.router)
auth_router.include_router(register.router)
auth_router.include_router(signin.router)
auth_router.include_router(refresh_tokens.router)

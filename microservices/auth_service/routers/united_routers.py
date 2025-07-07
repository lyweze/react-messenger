from fastapi import APIRouter

from microservices.auth_service.config.settings import AuthApiSettings
from microservices.auth_service.routers.components import fast_login, register, signin, refresh_tokens

auth_router = APIRouter(prefix=f"{AuthApiSettings.API_V1_PREFIX}", tags=["auth"])

auth_router.include_router(fast_login.router)
auth_router.include_router(register.router)
auth_router.include_router(signin.router)
auth_router.include_router(refresh_tokens.router)

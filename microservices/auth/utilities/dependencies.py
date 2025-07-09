from typing import Any

import httpx
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from microservices.auth.config.settings import AuthApiSettings

security: HTTPBearer = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> Any:
    token: str = credentials.credentials
    headers: dict[str, str] = {
        "apikey": AuthApiSettings.SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {token}",
    }
    async with httpx.AsyncClient() as client:
        response: httpx.Response = await client.get(
            f"{AuthApiSettings.SUPABASE_URL}/auth/v1/user", headers=headers
        )
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="invalid token")
    return response.json()

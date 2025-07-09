from typing import Any

import httpx
from fastapi import APIRouter, HTTPException, status

from microservices.auth.config.settings import AuthApiSettings
from microservices.auth.schemas.schemas import RefreshRequest

router: APIRouter = APIRouter()


@router.post("/refresh-tokens")
async def refresh_tokens(request: RefreshRequest) -> Any:
    headers: dict[str, str] = {
        "apikey": AuthApiSettings.SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
    }
    payload: dict[str, str] = {"refresh_token": request.refresh_token}
    async with httpx.AsyncClient() as client:
        response: httpx.Response = await client.post(
            url=AuthApiSettings.REFRESH_TOKEN_URL, json=payload, headers=headers
        )
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
        )
    return response.json()

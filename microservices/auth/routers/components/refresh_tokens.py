import httpx
from fastapi import APIRouter, HTTPException, status

from microservices.auth.config.settings import AuthApiSettings
from microservices.auth.schemas.schemas import RefreshRequest

router = APIRouter()


@router.post("/refresh-tokens")
async def refresh_tokens(request: RefreshRequest):
    """
    ПУТЬ ДЛЯ ОБНОВЛЕНИЯ ТОКЕНОВ ЮЗЕРОВ ДЛЯ ВХОДА
    """
    headers = {
        "apikey": AuthApiSettings.SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
    }
    payload = {"refresh_token": request.refresh_token}

    async with httpx.AsyncClient() as client:
        response = await client.post(
            url=AuthApiSettings.REFRESH_TOKEN_URL, json=payload, headers=headers
        )
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
            )
        return response.json()

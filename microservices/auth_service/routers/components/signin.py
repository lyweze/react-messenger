from fastapi import APIRouter, HTTPException
import httpx
from microservices.auth_service.config.settings import AuthApiSettings
from microservices.auth_service.models.responses import LoginSchema

router = APIRouter()


@router.post("/login", response_model=LoginSchema)
async def login(data: LoginSchema):
    payload = {"email": data.email, "password": data.password}
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url=f"{AuthApiSettings.SUPABASE_URL}/auth/v1/token?grant_type=password",
            json=payload,
            headers=AuthApiSettings.AUTH_HEADERS,
        )
    if response.status_code != httpx.codes.OK:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

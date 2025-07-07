from fastapi import APIRouter, HTTPException
import httpx
from microservices.auth_service.config.settings import AuthApiSettings
from microservices.auth_service.models.responses import RegisterSchema

router = APIRouter()


@router.post("/register", response_model=RegisterSchema)
async def register(data: RegisterSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url=f"{AuthApiSettings.SUPABASE_URL}/auth/v1/signup",
            json=data.model_dump(),
            headers=AuthApiSettings.AUTH_HEADERS,
        )
        if response.status_code != httpx.codes.OK:
            raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

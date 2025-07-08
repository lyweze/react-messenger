import httpx
from fastapi import APIRouter, HTTPException, status

from microservices.auth.config.settings import AuthApiSettings
from microservices.auth.schemas.schemas import RegisterResponse, RegisterSchema

router = APIRouter()


@router.post("/register", response_model=RegisterResponse)
async def register(data: RegisterSchema):
    """
    регистрируем юзера и получаем токена
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url=AuthApiSettings.REGISTER_URL,
            json=data.model_dump(),
            headers=AuthApiSettings.AUTH_HEADERS,
        )
        if response.status_code != status.HTTP_200_OK:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

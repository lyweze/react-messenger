from typing import Any

import httpx
from fastapi import APIRouter, HTTPException

from microservices.auth.config.settings import AuthApiSettings
from microservices.auth.schemas.schemas import LoginResponse, LoginSchema

router: APIRouter = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(data: LoginSchema) -> Any:
    payload: dict[str, str] = {"email": data.email, "password": data.password}
    async with httpx.AsyncClient() as client:
        response: httpx.Response = await client.post(
            url=AuthApiSettings.SIGNIN_URL,
            json=payload,
            headers=AuthApiSettings.AUTH_HEADERS,
        )
    if response.status_code != httpx.codes.OK:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

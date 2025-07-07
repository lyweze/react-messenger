from fastapi import APIRouter, Depends
from microservices.auth_service.utilities.dependencies import get_current_user

router = APIRouter()


@router.get("/fast-login")
async def fast_login(user=Depends(get_current_user)):
    return user

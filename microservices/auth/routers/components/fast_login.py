from typing import Any

from fastapi import APIRouter, Depends

from microservices.utilities.dependencies import get_current_user

router: APIRouter = APIRouter()


@router.get("/fast-login")
async def fast_login(user: Any = Depends(get_current_user)) -> Any:
    return user

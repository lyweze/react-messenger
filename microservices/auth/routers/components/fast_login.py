from fastapi import APIRouter, Depends

from microservices.auth.utilities.dependencies import get_current_user

router = APIRouter()


@router.get("/fast-login")
async def fast_login(user=Depends(get_current_user)):
    """
    чекаем логин для входаа юзера после загрузки
    токен берем из локат стораджа
    или при последующем входе
    """
    return user

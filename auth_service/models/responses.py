from typing import Optional

from pydantic import BaseModel


class SecretResponse(BaseModel):
    message: str

class ErrorResponse(BaseModel):
    error: str

class UserInfo(BaseModel):
    email: str

class TokenPayload(BaseModel):
    email: str
    sub: Optional[str] = None

    
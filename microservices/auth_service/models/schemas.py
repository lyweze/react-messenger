from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# TWO DIFF SCHEMAS FOR REQUEST
class RegisterSchema(BaseModel):
    email: EmailStr
    password: str


class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserRegisterResponse(BaseModel):
    id: str
    aud: str
    email: EmailStr
    email_confirmed_at: Optional[datetime] = None
    phone: Optional[str] = None
    created_at: datetime
    is_anonymous: bool


class RegisterResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str
    user: UserRegisterResponse


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str
    user: UserRegisterResponse


class RefreshRequest(BaseModel):
    refresh_token: str

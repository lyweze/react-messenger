from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class RegisterSchema(BaseModel):
    email: EmailStr
    password: str


class UserIdentity(BaseModel):
    identity_id: str
    id: str
    user_id: str
    provider: str
    email: str
    created_at: datetime
    updated_at: datetime


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


class LoginSchema(BaseModel):
    email: EmailStr
    password: str

from datetime import datetime
from typing import List

from pydantic import BaseModel


class CreateChatRequest(BaseModel):
    recipient_user_id: str # это юзернейм


class CreateChatResponse(BaseModel):
    chat_id: str
    participants: List[str]
    created_at: datetime
    is_new_chat: bool

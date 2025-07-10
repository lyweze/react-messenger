import logging
import uuid
from typing import List, Optional

from fastapi import HTTPException

from microservices.chats_handler.config.supabase_cfg import SupabaseConfig


async def execute_chats(user_id: str) -> Optional[List[str] | None]:
    try:
        user_chats = (
            SupabaseConfig.supabase.table(SupabaseConfig.table_chats_name)
            .select("chat_id")
            .eq("user_id", user_id)
            .execute()
        )
        if not user_chats.data:
            return None
        user_chats_ids = [chat["chat_id"] for chat in user_chats.data]
        return user_chats_ids
    except Exception as e:
        logging.error(e)
        return None


async def find_existing_chat(user1_id: str, user2_id: str) -> Optional[str]:
    try:
        user1_chats_ids = await execute_chats(user1_id)

        for chat_id in user1_chats_ids:
            user2_in_chats = (
                SupabaseConfig.supabase.table(SupabaseConfig.table_chats_name)
                .select("*")
                .eq("chat_id", chat_id)
                .eq("user_id", user2_id)
                .execute()
            )
            if user2_in_chats.data:
                return chat_id

        return None
    except Exception as e:
        logging.error(e)
        return None


async def create_new_chat(user1_id: str, user2_id: str) -> str:
    try:
        chat_id = str(uuid.uuid4())

        chat_data = {
            "id": chat_id,
            "created_at": user1_id,
        }
        chat_results = (
            SupabaseConfig.supabase.table(SupabaseConfig.table_chats_name)
            .insert(chat_data)
            .execute()
        )
        if not chat_results:
            raise Exception("Failed to create chat between users")

        participants_data = [
            {
                "id": str(uuid.uuid4()),
                "chat_id": chat_id,
                "user_id": user1_id,
            },
            {
                "id": str(uuid.uuid4()),
                "chat_id": chat_id,
                "user_id": user2_id,
            },
        ]
        participants_result = (
            SupabaseConfig.supabase.table(SupabaseConfig.table_participants_name)
            .insert(participants_data)
            .execute()
        )
        if not participants_result.data:
            SupabaseConfig.supabase.table(SupabaseConfig.table_chats_name).delete().eq(
                "id", chat_id
            ).execute()
            raise Exception("Failed to add participants to chat!!@")
        return chat_id
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=500, detail="Failed to create NEW chat")

import datetime
import logging

import supabase
from fastapi import APIRouter, Depends, HTTPException

from microservices.chats_handler.config.supabase_cfg import SupabaseConfig
from microservices.chats_handler.schemas.schemas import (
    CreateChatRequest,
    CreateChatResponse,
)
from microservices.utilities import chat_handler, dependencies

router = APIRouter()


@router.post("/create-chat", response_model=CreateChatResponse)
async def create_get_chat(
    request: CreateChatRequest,
    current_user: dict = Depends(dependencies.get_current_user),
):
    try:
        current_user_id = current_user["id"]

        """
        ЭТУ ХУЙНЮ ПОФИКСИТЬ НАДО БУДЕТ АТО
         КОСТЫЛЬ КАКОЙ ТО ХУЙ НХАЕТ НО ПАСХАЛКА
        """
        current_user_profile = (
            SupabaseConfig.supabase.table(SupabaseConfig.table_profiles_name)
            .select("username")
            .eq("id", current_user_id)
            .execute()
        )

        if (
            current_user_profile.data
            and current_user_profile.data[0]["username"] == request.recipient_user_id
        ):
            raise HTTPException(
                status_code=403,
                detail="cannot create chat with yourself HAHAHAHAHAHAHAHAHA SAM SEPIOL",
            )

        # check if user exists
        recipient_check = (
            SupabaseConfig.supabase.table(SupabaseConfig.table_profiles_name)
            .select("username")
            .eq("id", current_user_id)
            .execute()
        )
        if not recipient_check.data:
            raise HTTPException(detail="user not found", status_code=404)

        recipient_id = recipient_check[0]["id"]

        existing_chat_id = await chat_handler.find_existing_chat(
            current_user_id, recipient_id
        )

        is_new_chat = False  # FLAG FOR CHAT
        if existing_chat_id:
            chat_id = existing_chat_id
        else:
            chat_id = await chat_handler.create_new_chat(current_user_id, recipient_id)
            is_new_chat = True

        chat_info = (
            SupabaseConfig.supabase.table(SupabaseConfig.table_chats_name)
            .select("*")
            .eq("id", chat_id)
            .execute()
        )
        participants = SupabaseConfig.supabase.rpc(
            SupabaseConfig.get_chat_participants_uuid_fun, {"chat_id": chat_id}
        ).execute()
        participants_ids = participants[0]

        return CreateChatResponse(
            chat_id=chat_id,
            participants=participants_ids.data[0],
            created_at=datetime.fromisoformat(chat_info[0]["created_at"]),
            is_new_chat=is_new_chat,
        )
    except HTTPException as e:
        logging.error(e)
        raise e
    except Exception as e:
        print("ERROR IN CREATING/GET CHAT, CUZ", e)
        raise HTTPException(status_code=500, detail="internal server error")

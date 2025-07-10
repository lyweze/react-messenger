import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()


class SupabaseConfig:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    table_participants_name = os.getenv("SUPABASE_TABLE_PARTICIPANTS_NAME")
    table_chats_name = os.getenv("SUPABASE_TABLE_CHATS_NAME")
    table_profiles_name = os.getenv("SUPABASE_TABLE_PROFILES_NAME")

    get_chat_participants_uuid_fun = os.getenv("SUPABASE_GET_CHAT_PARTICIPANTS_UUID")


SupabaseConfig = SupabaseConfig()

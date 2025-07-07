from settings import AuthApiSettings
from supabase import Client, create_client

if not AuthApiSettings.SUPABASE_URL or not AuthApiSettings.SUPABASE_ANON_KEY:
    raise ValueError("SUPABASE_URL/SUPABASE_ANON_KEY doesnt exists")

supabase: Client = create_client(
    AuthApiSettings.SUPABASE_URL, AuthApiSettings.SUPABASE_ANON_KEY
)

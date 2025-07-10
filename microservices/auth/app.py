import uvicorn
from fastapi import FastAPI

from microservices.auth.routers.routers import auth_router
from microservices.chats_handler.routers.routers import chat_handler_router
app = FastAPI(title="Auth API")
app.include_router(auth_router)
app.include_router(chat_handler_router)
if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=8000)

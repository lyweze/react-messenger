import uvicorn
from fastapi import FastAPI

from microservices.chats_handler.routers import routers

app = FastAPI(title="Chat-chains handler")  # LOL
app.include_router(routers.chat_handler_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

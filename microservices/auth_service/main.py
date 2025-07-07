import uvicorn
from fastapi import FastAPI

from microservices.auth_service.routers import united_routers

app = FastAPI(title="Auth API")
app.include_router(united_routers.auth_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

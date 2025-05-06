from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logger import logger

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

# Allow CORS for localhost origin

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.CORS_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/", status_code=200)
async def root():
  return {"message": "PDF Chat API is working!", "status":"success"}
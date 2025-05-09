from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
from pathlib import Path


load_dotenv(dotenv_path=".env")

class Settings(BaseSettings):
  # API config
  API_V1_PREFIX: str = "/api/v1"
  PROJECT_NAME: str = "PDF Chat Backend"
  VERSION: str = "1.0.0"

  CORS_ORIGINS: List[str] = [
    "http://localhost:5173",
    "http://localhost:4173",
  ]
  
  LOG_LEVEL: str = os.getenv("LOG_LEVEL")
  
  # DB and File Storage
  DATABASE_URL: str = os.getenv("DATABASE_URL")
  UPLOAD_DIR: str = os.getenv("UPLOAD_DIR")

  DEEPSEEK_API_KEY:str = os.getenv("DEEPSEEK_API_KEY")
  class Config:
    env_file = ".env"
    case_sensitive = True
  
  def create_upload_dir(self):
    upload_path = Path(self.UPLOAD_DIR)
    upload_path.mkdir(parents=True, exist_ok=True)
    return upload_path

@lru_cache()
def get_settings() -> Settings:
  return Settings()

settings = get_settings()
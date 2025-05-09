from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.utils.config import settings
from app.utils.logger import logger
from app.db.session import Base, engine, get_db
from app.api.v1.router import router as api_router

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

@app.on_event("startup")
async def init_db():
  try:
    Base.metadata.create_all(bind=engine)
  except Exception as e:
    logger.error(f"Error creating database tables: {e}")
    raise e

# Allow CORS for localhost origin
app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.CORS_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


# Root Testing endpoints
@app.get("/", status_code=200)
async def root():
  return {"message": "PDF Chat API is working!", "status":"success"}

@app.get("/health", status_code=200)
async def health_check(db: Session = Depends(get_db)):
  try:
    from sqlalchemy import text
    db.execute(text('SELECT 1'))
    return {
      "status": "healthy",
      "database": "connected"
    }
  except Exception as e:
    logger.error(f"Database health check failed: {e}")
    return {
      "status": "unhealthy",
      "database": "disconnected"
    }
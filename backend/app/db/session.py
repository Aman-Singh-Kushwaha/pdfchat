from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from app.utils.config import settings
from app.utils.logger import logger

# SQLAlchemy engine
engine = create_engine(
  settings.DATABASE_URL,
  pool_pre_ping=True,
  echo=settings.LOG_LEVEL == "DEBUG",
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False,bind=engine)

# Base (Abstract class) for models
class Base(DeclarativeBase):
  __abstract__ = True
  pass

# Dependency for database session
def get_db():
  db = SessionLocal()
  try:
    yield db
  except Exception as e:
    raise e
  finally:
    db.close()
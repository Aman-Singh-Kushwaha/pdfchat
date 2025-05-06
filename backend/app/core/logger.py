import logging
import sys
from pathlib import Path
from loguru import logger
from app.core.config import settings

# Create logs directory
LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

# Configure loguru logger
logger.remove()  # Remove default handler
logger.add(
  sys.stdout,
  level=settings.LOG_LEVEL,
  format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
)
logger.add(
  LOG_DIR / "api.log",
  rotation="10 MB",
  level=settings.LOG_LEVEL,
  format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}"
)

class InterceptHandler(logging.Handler):
  def emit(self, record):
    try:
      level = logger.level(record.levelname).name
    except ValueError:
      level = record.levelno

    frame, depth = logging.currentframe(), 2
    while frame.f_code.co_filename == logging.__file__:
      frame = frame.f_back
      depth += 1

    logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())

# Intercept standard logging
logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)
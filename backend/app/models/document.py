"""
  Model for uploaded documents
"""

from datetime import datetime
import uuid
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.db.session import Base

class Document(Base):
  __tablename__ = "documents"

  id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=str(uuid.uuid4()))
  filename = Column(String, nullable=False)
  file_path = Column(String, nullable=False)
  added_at = Column(DateTime, default=datetime.utcnow)
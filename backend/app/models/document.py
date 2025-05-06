"""
  Model for uploaded documents
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from app.db.session import Base

class Document(Base):
  __tablename__ = "documents"

  id = Column(Integer, primary_key=True, index=True)
  filename = Column(String, nullable=False)
  file_path = Column(String, nullable=False)
  added_at = Column(DateTime, default=datetime.utcnow)
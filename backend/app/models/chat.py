from datetime import datetime
import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.session import Base

class ChatMessage(Base):
  __tablename__ = "chat_messages"

  id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
  document_id = Column(UUID, ForeignKey("documents.id"), nullable=False)
  query = Column(Text, nullable=False)
  response = Column(Text, nullable=False)
  created_at = Column(DateTime, default=datetime.utcnow)
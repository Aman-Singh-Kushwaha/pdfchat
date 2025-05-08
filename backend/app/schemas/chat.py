from datetime import datetime
from pydantic import BaseModel
from uuid import UUID

class ChatQuery(BaseModel):
  document_id: UUID
  query: str

class ChatResponse(BaseModel):
  id: UUID
  query: str
  response: str

  class Config:
    from_attributes = True
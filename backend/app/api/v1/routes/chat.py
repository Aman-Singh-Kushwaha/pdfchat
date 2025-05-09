from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.utils.config import settings
from app.utils.logger import logger
from app.db.session import get_db
from app.models.chat import ChatSession, ChatMessage
from app.schemas.chat import ChatQuery, ChatResponse
from app.services.query_service import query_document

router = APIRouter()

@router.post("/query", response_model= ChatResponse)
async def query_document_endpoint( chat_query: ChatQuery, db: Session= Depends(get_db)):
  try:
    session = ChatSession(document_id = chat_query.document_id)
    db.add(session)
    db.flush()
    db.refresh(session)

    response_text = await query_document(
      chat_query.query,
      settings.DATABASE_URL
    )
    print(response_text)
    message = ChatMessage(
      session_id= session.id,
      query=chat_query.query,
      response= response_text
    )

    db.add(message)
    db.flush()
    db.commit()
    db.refresh(message)
    
    
    logger.info(f"Chat query processed for document: {chat_query.document_id}")

    response = ChatResponse(
      id=message.id,
      query= message.query,
      response = message.response
    )
    return response
  except Exception as e:
    db.rollback()
    logger.error(f"Chat query failed: {str(e)}")
    raise HTTPException(status_code=500, detail=str(e))

@router.get("/{document_id}/history", response_model=List[ChatResponse])
async def get_chat_history(
  document_id: UUID,
  db: Session = Depends(get_db)
):
  try:
    messages = db.query(ChatMessage)\
                .join(ChatSession)\
                .filter(ChatSession.document_id == document_id)\
                .order_by(ChatMessage.created_at.desc())\
                .all()
    return messages 

  except Exception as e:
    logger.error(f"Error fetching chat history: {e}")
    raise HTTPException (status_code=500, detail= str(e))
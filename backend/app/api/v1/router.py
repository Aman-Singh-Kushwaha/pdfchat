from fastapi import APIRouter
from app.api.v1.routes import documents, chat

router = APIRouter()

router.include_router(documents.router, prefix="/documents", tags=["documents"])
router.include_router(chat.router, prefix="/chat", tags=["chat"])
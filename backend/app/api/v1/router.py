from fastapi import APIRouter
from app.api.v1.routes import documents

router = APIRouter()

router.include_router(documents.router, prefix="/documents", tags=["documents"])
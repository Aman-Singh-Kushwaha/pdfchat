from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import os

from app.utils.config import settings
from app.utils.logger import logger
from app.db.session import get_db
from app.models.document import Document
from app.schemas.document import DocumentResponse
from app.services.document_processor import process_pdf_index

router = APIRouter()

""" Retrieve all pdfs names"""
@router.get("/", response_model=List[DocumentResponse], status_code=200)
async def list_documents(db: Session = Depends(get_db)):
  documents = db.query(Document).order_by(Document.added_at.desc()).all()
  return documents


""" Uploads a pdf file """
@router.post("/upload", response_model=DocumentResponse, status_code=201)
async def upload_file(
  file: UploadFile = File(...),
  db: Session = Depends(get_db)
):
  if not file.filename.endswith('.pdf'):
    raise HTTPException(status_code=400, detail="Only PDF files are allowed")
  
  # file size (50MB limit)
  if file.size > 50 * 1024 * 1024:
    raise HTTPException(status_code=400, detail="File size cannot exceed 50MB")
    
  file_path = None
  try:
    # Creates dir if not exists on env upload dir path
    upload_dir = settings.create_upload_dir()
    file_path = upload_dir / file.filename
    
    content = await file.read()
    with open(file_path, "wb") as f:
      f.write(content)
    
    # Process PDF and create embeddings
    await process_pdf_index(file_path, settings.DATABASE_URL)

    document = Document(
      filename=file.filename,
      file_path=str(file_path),
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    
    logger.info(f"Document processed successfully: {document.filename}")
    return document
  
  except Exception as e:
    # Clean up on any error
    if file_path and file_path.exists():
      file_path.unlink()
    db.rollback()
    logger.exception(f"Error processing document: {e}")
    raise HTTPException(status_code=500, detail=str(e))
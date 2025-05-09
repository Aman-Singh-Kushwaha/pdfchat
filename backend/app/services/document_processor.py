""" Methods for extract pdf into llamaparse document to vector indexes """

from pathlib import Path
from sqlalchemy import make_url
from pymupdf4llm import LlamaMarkdownReader
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import VectorStoreIndex, StorageContext, Settings
from llama_index.vector_stores.postgres import PGVectorStore

from app.utils.logger import logger

async def extract_document(doc_path:Path):
  """ Extracts PDF data using PymuPDF4llm """    
  llama_reader = LlamaMarkdownReader()
  return llama_reader.load_data(str(doc_path))


async def process_pdf_index(file_path: Path, db_conn_str: str):
  """ Main Function for calling fucntions for module"""
  try:
    extracted_data = await extract_document(file_path)
    logger.info(f"Data Extraction completed for file at: {file_path}")

    # Postgres VectorDB Table connection storing index
    url = make_url(db_conn_str)
    pgvector_store = PGVectorStore.from_params(
      database=url.database,
      host=url.host,
      password=url.password,
      port=url.port,
      user=url.username,
      table_name = "document_vectors",
      embed_dim = 384
    )
    storage_context = StorageContext.from_defaults(vector_store = pgvector_store)

    # Service context for embedding generation
    Settings.embed_model = HuggingFaceEmbedding(
      model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    index = VectorStoreIndex.from_documents(
      extracted_data,
      storage_context= storage_context,
      embed_model= Settings.embed_model,
      show_progress= True,
    )
    if(index): logger.success("Document indexing is completed.")
    return index
  
  except Exception as e:
    logger.error(f"Error Indexing: {e}")
    raise Exception(f"Failed to process document: {str(e)}")
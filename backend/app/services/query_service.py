from pathlib import Path
from sqlalchemy import make_url
from fastapi import HTTPException
from llama_index.core import StorageContext, VectorStoreIndex, Settings
from llama_index.vector_stores.postgres import PGVectorStore
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.openai import OpenAI

from app.utils.config import settings as envConfig

from app.utils.logger import logger

async def query_document(user_query: str, db_conn_str: str) -> str:
  try:
    #intialized Existing Vector Store
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

    # Configure model for query
    embed_model = HuggingFaceEmbedding(
      model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    llm = OpenAI(
      model='gpt-4o-mini',
      api_key= envConfig.DEEPSEEK_API_KEY
    )

    Settings.llm = llm
    Settings.embed_model = embed_model

    index = VectorStoreIndex.from_vector_store(
      vector_store=pgvector_store,
      storage_context = storage_context,
      embed_model= embed_model
    )

    response_text=str(index.as_query_engine().query(user_query))

    # # Generating query embedding
    # query_embedding = embed_model.get_text_embedding(query)
    
    # # Perform similarity search
    # results = pgvector_store.similarity_search(
    #   query_embedding,
    #   k=3,  # Get top 2 most relevant chunks
    #   filter=None 
    # )

    # if not results:
    #   return "No relevant information found in the document."

    # context = "\n".join([node.text for node in results])
    # response = f"Based on the document content: \n\n{context}"

    return response_text

  except Exception as e:
    logger.error(f"Error in query processing: {e}")
    raise HTTPException(status_code=500, detail=str(e))
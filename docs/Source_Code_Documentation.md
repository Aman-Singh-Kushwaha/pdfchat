# PDF Chat Application - Source Code Documentation

## Architecture Overview

### Core Architecture Pattern
- Frontend: React Single Page Application (SPA)
- Backend: FastAPI RESTful Architecture 
- Database: PostgreSQL with pgvector for vector similarity search
- RAG (Retrieval Augmented Generation) Implementation using LlamaIndex

## Backend Architecture

### Document Processing Pipeline
```mermaid
graph LR
    Upload[Upload PDF] --> Extract[Text Extraction]
    Extract --> Chunk[Document Chunking]
    Chunk --> Embed[Generate Embeddings]
    Embed --> Store[Store in pgvector]
```

#### Key Components:

1. **Document Processor Service** [`document_processor.py`]
- Uses PyMuPDF4llm for structured text extraction
- Implements batch processing for embeddings (20 chunks per batch)
- Handles large documents through chunking and sequential processing

2. **Query Service** [`query_service.py`]
- Implements RAG architecture using LlamaIndex
- Manages vector store interactions for similarity search
- Uses OpenAI embeddings for semantic understanding

3. **Database Models**
- Uses SQLAlchemy ORM with UUID primary keys
- Implements soft dependencies through Foreign Keys
- Document-Message: One-to-Many relationship

### Notable Implementation Details

1. **Vector Store Integration**
```python
pgvector_store = PGVectorStore.from_params(
  database=url.database,
  host=url.host,
  password=url.password,
  port=url.port or 5432,
  user=url.username,
  table_name="document_vectors",
  embed_dim=1536  # OpenAI embedding dimension
)
```

2. **Error Handling Pattern**
- Atomic transactions for document processing
- Cleanup on failure (file deletion + DB rollback)
- Structured error responses with logging

## Frontend Architecture

### State Management
- Context-based state management using AppContext
- Optimistic updates for chat messages
- Local state for UI components

### Key Patterns:

1. **Chat Message Flow**
```javascript
const handleSendMessage = async (query) => {
  const tempId = crypto.randomUUID()
  setMessages(prev => [...prev, { id: tempId, query }])
  
  try {
    const response = await sendChatMessage(id, query)
    setMessages(prev => prev.map(msg => 
      msg.id === tempId ? 
        { ...msg, id: response.id, response: response.response }
        : msg
    ))
  } catch (error) {
    // Error handling with message preservation
  }
}
```

2. **Responsive Design Implementation**
- Uses Material-UI's useMediaQuery for adaptive layouts
- Dynamic component rendering based on screen size
- Fluid typography and spacing system

### Component Architecture

1. **Smart vs Presentational Components**
- Smart: Chat, DocumentsList, FileUploadDialog
- Presentational: ChatMessage, ChatInput, Navbar

2. **Reusable Patterns**
- Error boundary implementation
- Loading state management
- File upload handling

## API Integration

### Key Endpoints:
1. **Document Management**
- `POST /documents/upload`: Multipart form data handling
- `GET /documents`: Pagination ready structure

2. **Chat Interface**
- `POST /chat/query`: Handles RAG queries
- `GET /chat/{document_id}/history`: Returns chat history

### Security Considerations
1. **File Upload Security**
- File type validation
- Size limitations (50MB)
- Secure file storage path generation

2. **API Security**
- CORS configuration for production/development
- Input validation using Pydantic models
- Error handling with proper status codes

## Database Schema

### Vector Store Design
```sql
CREATE TABLE document_vectors (
    id UUID PRIMARY KEY,
    content TEXT,
    embedding vector(1536),
    metadata JSONB
);
```

### Performance Optimizations
1. **Database**
- Index on document_id for chat messages
- UUID for distributed scalability
- Proper foreign key constraints

2. **API**
- Async handlers for long-running operations
- Connection pooling for database
- Batch processing for embeddings with 20 chunks at a time

## Environment Configuration
- Environment-based configuration using pydantic
- Cached settings using lru_cache
- Dynamic CORS origin configuration
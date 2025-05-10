# PDF Chat - Technical Design Document

## 1. High-Level Design (HLD)

### 1.1 System Overview

The PDF Chat application is built with three main components:
- Frontend (React.js)
- Backend API (FastAPI)
- Database (PostgreSQL with pgvector)

### 1.2 Core Components

#### Frontend Application
- Single Page Application (SPA) built with React
- Material-UI for component design
- Context API for state management
- Responsive design for mobile/desktop

#### Backend Service
- RESTful API using FastAPI
- Document processing pipeline
- Chat processing with RAG (Retrieval Augmented Generation)
- OpenAI integration for embeddings and responses

#### Database Layer
- PostgreSQL for structured data
- pgvector extension for vector similarity search
- Document metadata storage
- Chat history persistence

### 1.3 Key Features
1. PDF Document Management
   - Upload and storage
   - Document processing
   - Vector embedding generation

2. Chat Interface
   - Context-aware querying
   - Real-time responses
   - Chat history tracking

## 2. Low-Level Design (LLD)

### 2.1 Database Schema

#### Documents Table
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY,
    filename VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Chat Messages Table
```sql
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY,
    document_id UUID REFERENCES documents(id),
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Vector Store Table
```sql
CREATE TABLE document_vectors (
    id UUID PRIMARY KEY,
    content TEXT NOT NULL,
    embedding vector(1536)
);
```

### 2.3 Component Breakdown

#### Frontend Components
```
src/
├── components/
│   ├── Chat/
│   │   ├── Chat.jsx
│   │   ├── ChatMessage.jsx
│   │   └── ChatInput.jsx
│   ├── Documents/
│   │   ├── DocumentsList.jsx
│   │   └── FileUploadDialog.jsx
│   └── Layout/
│       └── Header.jsx
├── context/
│   └── AppContext.jsx
└── services/
    └── api.js
```

#### Backend Modules
```
app/
├── api/
│   └── v1/
│       ├── router.py
│       └── routes/
│           ├── documents.py
│           └── chat.py
├── models/
│   ├── document.py
│   └── chat.py
├── services/
│   ├── document_processor.py
│   └── query_service.py
└── utils/
    ├── config.py
    └── logger.py
```

### 2.4 Processing Pipelines

#### Document Processing Flow
1. File Upload
   - Validate file type/size
   - Save to filesystem
   - Create document record

2. Document Processing
   - Extract text content
   - Generate embeddings
   - Store in vector database

#### Query Processing Flow
1. Query Reception
   - Validate document existence
   - Process user query

2. Response Generation
   - Generate query embedding
   - Retrieve relevant context
   - Generate response using LLM
   - Store in chat history

### 2.5 Security Considerations
- File type validation
- Size limitations
- CORS configuration
- Error handling

### 2.6 Performance Optimizations
- Database indexing
- Connection pooling
- Chunked file uploads
- Async processing

## 3. Technical Stack

### 3.1 Frontend
- React 18+
- Material-UI
- Vite
- React Router

### 3.2 Backend
- Python 3.12+
- FastAPI
- SQLAlchemy ORM
- LlamaIndex
- OpenAI API
- PyMuPDF

### 3.3 Database
- PostgreSQL 17+
- pgvector extension

### 3.4 Deployment
- Vercel (Frontend)
- Render (Backend)
- NeonDB (Hosted DB)
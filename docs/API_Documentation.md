# PDFChat API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
Currently, the API doesn't require authentication.

## Endpoints

### Documents

#### Upload Document
```http
POST /documents/upload
```
Upload a PDF file for processing and indexing.

**Request Body:**
- `file`: PDF file (multipart/form-data)

**Constraints:**
- File size limit: 50MB
- File type: PDF only

**Response:**
```json
{
  "id": "uuid",
  "filename": "string",
  "file_path": "string",
  "added_at": "datetime"
}
```

**Status Codes:**
- `201`: Document uploaded successfully
- `400`: Invalid file type or size
- `500`: Server error

#### Get All Documents
```http
GET /documents
```
Retrieve list of all uploaded documents.

**Response:**
```json
[
  {
    "id": "uuid",
    "filename": "string",
    "file_path": "string",
    "added_at": "datetime"
  }
]
```

### Chat

#### Send Chat Query
```http
POST /chat/query
```
Send a query for a specific document.

**Request Body:**
```json
{
  "document_id": "uuid",
  "query": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "query": "string",
  "response": "string"
}
```

**Status Codes:**
- `200`: Query processed successfully
- `404`: Document not found
- `500`: Server error

#### Get Chat History
```http
GET /chat/{document_id}/history
```
Retrieve chat history for a specific document.

**Parameters:**
- `document_id`: UUID of the document

**Response:**
```json
[
  {
    "id": "uuid",
    "query": "string",
    "response": "string"
  }
]
```

## Error Responses
All endpoints may return these error responses:

```json
{
  "detail": "Error message"
}
```

**Common Status Codes:**
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting
Currently, no rate limiting is implemented.

## Examples

### Upload a Document
```bash
curl -X POST http://localhost:8000/api/v1/documents/upload \
  -F "file=@example.pdf" \
  -H "Content-Type: multipart/form-data"
```

### Send a Chat Query
```bash
curl -X POST http://localhost:8000/api/v1/chat/query \
  -H "Content-Type: application/json" \
  -d '{
    "document_id": "123e4567-e89b-12d3-a456-426614174000",
    "query": "What is the main topic of this document?"
  }'
```
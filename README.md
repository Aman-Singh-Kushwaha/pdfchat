# PDF Chat - RAG Application

## Objective:
A full-stack application that allows users to upload PDF documents and ask questions regarding the content of these documents. The backend will process these documents and utilize natural language processing to provide answers to the questions posed by the users.

#### Demo Video  - [Watch on Loom](https://www.loom.com/share/ad7d7412b5f2437f8dabfaa8e43da9c0)
#### Live Link : https://pdfchat-ui.vercel.app/ 
> [!NOTE]
> Backend Intial Load can take time upto 30s causing error to actions on frontend, since backend is deployed on **Render Free Tier**, which sleeps upon inactivity.
> So please retry again 

## Tools and Technologies:
- Backend: FastAPI
- NLP Processing: LLamaIndex
- Frontend: React.js (Vite)
- Database: PostgreSQL + pgVector
- File Storage: Local filesystem 

## Functional Specification:
### PDF Upload:
- Users can upload PDF documents to the application.
- The application stores the PDF and possibly extracts and stores its text content for further processing.

### Asking Questions:
- Users can ask questions related to the content of an uploaded PDF.
- The system processes the question and the content of the PDF to provide an answer.

### Displaying Answers:
- The application displays the answer to the user’s question.
- Include the functionality to ask follow-up or new questions on the same document.

## Backend Specification:
### FastAPI Endpoints:
- An endpoint for uploading PDF documents.
- An endpoint for receiving questions and returning answers based on the uploaded PDFs.

### PDF Processing:
- Extract text from uploaded PDFs using a suitable library (e.g., PyMuPDF).
- Use the LangChain/llama index to process natural language questions and generate answers based on the PDF content.

### Data Management:
- Store information about uploaded documents (e.g., filename, upload date) in a database.

## Frontend Specification:
### User Interface:
- A page for uploading PDF documents.
- A feature for asking questions on uploaded documents and viewing answers.
### Interactivity:
- Implement feedback mechanisms while uploading documents and processing questions.
- Display error messages for unsupported file types or processing errors.

## Documentations
- [API Documentation](docs/API_Documentation.md)
- [Code Documentation](docs/Source_Code_Documentation.md)
- [Approach Documentation](docs/HLD_LLD_Documentation.md)

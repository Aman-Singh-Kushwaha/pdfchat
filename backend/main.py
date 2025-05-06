from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="PDF Chat Backend", version="0.1.0")

# Allow CORS for all origins
origins = [
  "http://localhost:3000",
]
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/", status_code=200)
async def root():
  return {"message": "PDF Chat API is working!", "status":"success"}

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import tempfile
from dotenv import load_dotenv
from llama_parse import LlamaParse

load_dotenv()

app = FastAPI(title="PDF to Markdown Converter", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LlamaParse
LLAMA_CLOUD_API_KEY = os.getenv("LLAMA_CLOUD_API_KEY")
if not LLAMA_CLOUD_API_KEY:
    raise ValueError("LLAMA_CLOUD_API_KEY environment variable is required")

parser = LlamaParse(
    api_key=LLAMA_CLOUD_API_KEY,
    result_type="markdown",
    verbose=True
)

@app.get("/")
async def root():
    return {"message": "PDF to Markdown Converter API"}

@app.post("/convert-pdf")
async def convert_pdf(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )
    
    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix='.pdf'
        ) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        # Parse the PDF using LlamaParse
        documents = parser.load_data(temp_file_path)
        
        # Combine all parsed content
        markdown_content = ""
        for doc in documents:
            markdown_content += doc.text + "\n\n"
        
        # Clean up temporary file
        os.unlink(temp_file_path)
        
        return JSONResponse(content={
            "success": True,
            "filename": file.filename,
            "markdown": markdown_content.strip()
        })
    
    except Exception as e:
        # Clean up temporary file if it exists
        if 'temp_file_path' in locals():
            try:
                os.unlink(temp_file_path)
            except Exception:
                pass
        
        raise HTTPException(
            status_code=500,
            detail=(
                f"Error processing PDF: {str(e)}"
            )
        )


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
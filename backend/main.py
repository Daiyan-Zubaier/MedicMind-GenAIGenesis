from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="AI First-Aid Guide API")

origins = [
    "http://localhost:3000",
    "http://localhost:8080",  # Vite default port
    "http://127.0.0.1:5173"
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

def analyze_emergency_level(text):
    """Analyze the emergency level based on the response text."""
    high_urgency_keywords = [
        "call 911", "emergency", "immediately", "severe", "critical",
        "unconscious", "not breathing", "cardiac arrest", "heart attack",
        "stroke", "choking", "bleeding severely", "anaphylaxis"
    ]
    
    text_lower = text.lower()
    for keyword in high_urgency_keywords:
        if keyword in text_lower:
            return "high"
    
    return "medium"

class TranscriptRequest(BaseModel):
    transcript: str

@app.post("/first-aid-guide")
async def generate_ai_response(request: TranscriptRequest):
    """Generate first aid instructions using OpenAI."""
    transcript = request.transcript
    prompt = f"""You are an AI first aid assistant. Provide clear, step-by-step first aid instructions for the following situation:
    
    "{transcript}"
    
    Important guidelines:
    1. If this is a life-threatening emergency, start your response with "CALL 911 IMMEDIATELY."
    2. Provide concise, actionable steps in a numbered list.
    3. Use simple, clear language that anyone can follow in an emergency.
    4. If more information is needed to provide proper guidance, ask specific follow-up questions.
    5. Include when to seek professional medical help.
    """
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-3.5-turbo" if gpt-4 is not available
            messages=[
                {"role": "system", "content": "You are a first aid expert providing emergency medical guidance."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,  # Lower temperature for more consistent, factual responses
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Error generating AI response: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate response: {str(e)}")
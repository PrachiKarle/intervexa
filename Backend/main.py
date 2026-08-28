from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from resume_service import extract_resume_text
from gemini_service import generate_interview_response

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return{
        "message":"AI interview assistant API is running"
    }
    

@app.post("/api/interview/start")
async def start_interview(job_description : str = Form(...), resume : UploadFile = File(...)):
    
    resume_text=extract_resume_text(resume)
    first_question=generate_interview_response(job_description=job_description, resume_text=resume_text,conversation="")
    return {
        "success": True,
        "question": first_question,
        "resume_text": resume_text
    }


@app.post("/api/interview/chat")
async def interview_chat( job_description: str = Form(...), resume_text: str = Form(...), conversation: str = Form(...)):
    
    next_response=generate_interview_response(job_description=job_description,resume_text=resume_text,conversation=conversation)
    
    return{
        "success":True,
        "response":next_response
    }
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

API_KEY=os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError("GEMINI API KEY is Missing")

client=genai.Client(api_key=API_KEY)

MODEL="gemini-2.5-flash"


def generate_interview_response(job_description:str,resume_text:str,conversation:str=""):
    
    prompt=f"""
    You are an AI Job Interview Assistant.
    You are conducting a realistic job interview.
    JOB DESCRIPTION:
    {job_description}

    CANDIDATE RESUME:
    {resume_text}

    INTERVIEW CONVERSATION:
    {conversation}
    
    Your responsibilities:
    1. Act as the interviewer.
    2. Ask ONE question at a time.
    3. Analyze the candidate's previous answer.
    4. Ask a relevant follow-up question.
    5. Questions should be based on the job description and resume.
    6. Include technical, behavioral and project-related questions.
    7. Gradually increase difficulty.
    8. Do not provide the answer to the candidate.
    9. Do not ask multiple questions at once.
    10. Keep the response professional and concise.
    
    If this is the beginning of the interview, start with:

   "Tell me about yourself and your experience relevant to this role."

    Otherwise, analyze the candidate's latest answer and continue the interview.

    Return ONLY the interviewer's response.
    """
    
    response=client.models.generate_content(
        model=MODEL,
        contents=prompt
    )
    return response.text
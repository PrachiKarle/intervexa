from google.adk.agents import Agent
from google.adk.models import Gemini

from .prompts import INTERVIEWER_PROMPT


root_agent = Agent(
    name="intervexa_interviewer",

    model=Gemini(
        model="gemini-3.6-flash"
    ),

    instruction=INTERVIEWER_PROMPT,
)
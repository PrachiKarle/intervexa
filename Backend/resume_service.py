# from pypdf import PdfReader


# def extract_resume_text(file):
#     """
#     Extract text from an uploaded PDF resume.
#     """

#     try:
#         reader = PdfReader(file.file)

#         text = ""

#         for page in reader.pages:
#             page_text = page.extract_text()

#             if page_text:
#                 text += page_text + "\n"

#         return text.strip()

#     except Exception as e:
#         raise Exception(f"Failed to read resume PDF: {str(e)}")
    
    
    
from pypdf import PdfReader

def extract_resume_text(file):
    try:
        reader=PdfReader(file.file)
        
        text=""
        
        for page in reader.pages:
            page_text=page.extract_text()
            
            if page_text:
                text+=page_text+"\n"
                
        return text.strip()
    
    except Exception as e:
        raise Exception(f"Failed to read resume pdf")
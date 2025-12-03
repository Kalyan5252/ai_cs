import google.generativeai as genai
import os

class GoogleEmbedder:
    def __init__(self):
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

    def embed(self, texts):
        # Google API supports batch embedding
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=texts
        )
        return result['embedding']

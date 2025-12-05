
import google.generativeai as genai
import os

class GoogleEmbedder:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY must be set in environment variables.")
        genai.configure(api_key=api_key)

    def embed(self, texts):
        # Google API supports batch embedding
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=texts
        )
        return result['embedding']

def get_embedder():
    return GoogleEmbedder()
import uuid
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI

from pinecone_client import init_pinecone
from chunker import chunk_markdown
from google_embedder import GoogleEmbedder


load_dotenv()

app = FastAPI()

index = init_pinecone()
embedder = GoogleEmbedder()


class IngestRequest(BaseModel):
    path: str
    text: str

@app.get('/')
def read_root():
    return {"status": "ingestion service is running"}

@app.post("/ingest")
def ingest(req: IngestRequest):
    # Chunk the markdown
    chunks = chunk_markdown(req.text, size=300, overlap=40)

    # Embed each chunk with Google
    embeddings = [embedder.embed(chunk) for chunk in chunks]
    print(f"Generated {len(embeddings)} embeddings.")

    # Prepare vectors for Pinecone
    vectors = []
    for i, emb in enumerate(embeddings):
        vectors.append({
            "id": str(uuid.uuid4()),
            "values": emb,
            "metadata": {
                "path": req.path,
                "chunk": i,
            }
        })

    # Upsert to Pinecone
    index.upsert(vectors)

    return {
        "status": "ok",
        "chunks": len(chunks)
    }
import uuid
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI


from pinecone_client import get_pinecone_index
from chunker import chunk_markdown
from google_embedder import get_embedder

from rag_retrieval import retrieve
from llm_service import llm_answer, build_prompt

load_dotenv()

app = FastAPI()

# index = init_pinecone()
embedder = get_embedder()


class IngestRequest(BaseModel):
    path: str
    text: str

class Query(BaseModel):
    query: str

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
                "chunk": i
            }
        })

    # Get Pinecone index at runtime
    index = get_pinecone_index()
    # Upsert to Pinecone
    index.upsert(vectors)

    return {
        "status": "ok",
        "chunks": len(chunks)
    }

# @app.post("/rag")
# def rag_api(q: Query):
#     contexts = retrieve(q.query)
#     prompt = build_prompt(q.query, contexts)
#     answer = llm_answer(prompt)

#     return {
#         "answer": answer,
#         "contexts": contexts
#     }

@app.post("/rag")
def rag_api(q: Query):
    contexts = retrieve(q.query)
    prompt = build_prompt(q.query, contexts)
    answer = llm_answer(prompt)
    # Serialize contexts to plain dicts
    serialized_contexts = [
        {
            "id": m.id,
            "score": getattr(m, "score", None),
            "metadata": dict(m.metadata) if hasattr(m, "metadata") else m.get("metadata", {})
        }
        for m in contexts
    ]
    return {
        "answer": answer,
        "contexts": serialized_contexts
    }
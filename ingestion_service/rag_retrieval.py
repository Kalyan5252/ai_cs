
from google_embedder import get_embedder
from pinecone_client import get_pinecone_index

def retrieve(query: str, top_k=6):
    """Search Pinecone"""
    embedder = get_embedder()
    emb = embedder.embed(query)

    index = get_pinecone_index()
    result = index.query(
        vector=emb,
        top_k=top_k,
        include_metadata=True
    )
    return result.matches

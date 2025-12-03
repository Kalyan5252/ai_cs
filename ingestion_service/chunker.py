def chunk_markdown(text: str, size: int = 300, overlap: int = 40):
    """Split markdown text into overlapping chunks (word-based)."""
    tokens = text.split()
    i = 0
    chunks = []
    while i < len(tokens):
        chunk = tokens[i:i+size]
        chunks.append(" ".join(chunk))
        i += size - overlap
    return chunks
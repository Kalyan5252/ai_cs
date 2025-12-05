import openai

def build_prompt(query: str, contexts):
    """Build a prompt with retrieved contexts"""
    ctx = ''
    for idx, m in enumerate(contexts):
        meta = m["metadata"]
        ctx += f"\n### CONTEXT {idx+1}\nSOURCE: {meta['path']} (chunk {meta['chunk']})\n{m['metadata'].get('text', m['id'])}\n"

    return f"""You are a strict DSA tutor.
        You MUST answer using ONLY the provided context.
        CONTEXTS:
        {ctx}

        QUESTION:
        {query}

        Answer in:
        1. Intuition
        2. Steps
        3. Code (if relevant)
        4. Complexity
        5. Sources list
    """


def llm_answer(prompt: str) -> str:
    response = openai.chat.completions.create(
        model='gpt-4o-mini',
        messages=[{'role': 'user', 'content': prompt}],
        temperature=0.2,
        max_tokens=600
    )
    print('res:::',response)
    return response.choices[0].message.content
import { ChatPromptTemplate } from '@langchain/core/prompts';

export const algorithmExtractorPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `
You extract DSA algorithms into structured JSON.
Output ONLY JSON matching the schema.
`,
  ],
  ['user', '{dsaProblem}'],
]);

export const scenarioGeneratorPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `
You create real-world scenarios for algorithms.
Keep logic identical.
`,
  ],
  [
    'user',
    `
Domain: {domainPreference}
Algorithm Summary: {algorithmSummary}
`,
  ],
]);

export const applicativeAssemblerPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `
You MUST output ONLY a valid JSON object that EXACTLY matches this schema (no extra keys, no missing keys):

{{
  "problem_title": string,
  "problem_statement": string,

  "input_format": [
    {{
      "name": string,
      "type": string,
      "description": string
    }}
  ],

  "output_format": {{
    "type": string,
    "description": string
  }},

  "constraints": string[],

  "sample_input": any,
  "sample_output": any,
  "explanation": string,

  "hints": string[],
  "algorithm_steps": string[],
  "real_world_application": string,

  "data_structures_used": string[],
  "time_complexity": string,
  "space_complexity": string
}}

STRICT RULES:
- Output ONLY the JSON object above.
- NO markdown.
- NO code fences.
- NO text outside JSON.
- NO additional keys.
- NO comments.
- NO prose.
- Ensure all array fields are valid arrays.
- Ensure all string fields are valid strings.
- If needed, convert lists to arrays.
`,
  ],
  [
    'user',
    `
Difficulty: {{difficulty}}
Algorithm Summary: {{algorithmSummary}}
Scenario: {{scenario}}
`,
  ],
]);

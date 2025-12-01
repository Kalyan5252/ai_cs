import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { z } from 'zod';

// MODELS
const highLevelModel = new ChatOpenAI({
  model: 'gpt-4.1',
  temperature: 0.2,
});

const creativeModel = new ChatOpenAI({
  model: 'gpt-4.1-mini',
  temperature: 0.7,
});

// ------------------ SCHEMAS ------------------
const AlgorithmExtractionSchema = z.object({
  algorithm_name: z.string(),
  core_idea: z.string(),
  data_structures: z.array(z.string()),
  time_complexity: z.string(),
  space_complexity: z.string(),
  key_steps: z.array(z.string()),
  real_world_analogies: z.array(z.string()),
});

const ScenarioSchema = z.object({
  domain: z.string(),
  title: z.string(),
  short_description: z.string(),
  scenario_details: z.string(),
  mapping_notes: z.string(),
});

const ApplicativeProblemSchema = z.object({
  title: z.string(),
  background_story: z.string(),
  problem_statement: z.string(),
  input_format: z.string(),
  output_format: z.string(),
  constraints: z.string(),
  examples: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string(),
    })
  ),
  solution_intuition: z.string(),
  mapping_to_dsa: z.string(),
  difficulty: z.string(),
});

// -------------------------------------------------------
//                 STEP 1: ALGORITHM EXTRACTOR
// -------------------------------------------------------
const algorithmExtractorPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `
You are an expert competitive programming analyst.
Extract the core algorithmic information.
Output ONLY JSON with fields in schema:
algorithm_name, core_idea, data_structures, time_complexity, space_complexity, key_steps[], real_world_analogies[]
`,
  ],
  ['user', 'DSA Problem:\n\n{dsaProblem}'],
]);

const algorithmExtractor = algorithmExtractorPrompt.pipe(
  highLevelModel.withStructuredOutput(AlgorithmExtractionSchema)
);

// -------------------------------------------------------
//               STEP 2: SCENARIO GENERATOR
// -------------------------------------------------------
const scenarioGeneratorPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `
You convert algorithms into real-world scenarios.
Preserve the logic & constraints.
Output JSON exactly matching the schema.
`,
  ],
  [
    'user',
    `
Domain preference: {domainPreference}

Algorithm Summary:
{algorithmSummary}
`,
  ],
]);

const scenarioGenerator = scenarioGeneratorPrompt.pipe(
  creativeModel.withStructuredOutput(ScenarioSchema)
);

// -------------------------------------------------------
//           STEP 3: APPLICATIVE PROBLEM ASSEMBLER
// -------------------------------------------------------
const applicativeAssemblerPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `
You create real-world applicative versions of DSA problems.
Return JSON using the required schema.
`,
  ],
  [
    'user',
    `
Difficulty: {difficulty}

Algorithm Summary:
{algorithmSummary}

Scenario:
{scenario}
`,
  ],
]);

const applicativeAssembler = applicativeAssemblerPrompt.pipe(
  creativeModel.withStructuredOutput(ApplicativeProblemSchema)
);

// -------------------------------------------------------
//             PIPELINE (RunnableSequence)
// -------------------------------------------------------
const pipeline = RunnableSequence.from([
  async (input: any) => {
    const algorithmSummary = await algorithmExtractor.invoke({
      dsaProblem: input.dsaProblem,
    });

    return { ...input, algorithmSummary };
  },

  async (state: any) => {
    const scenario = await scenarioGenerator.invoke({
      domainPreference: state.domainPreference ?? 'any',
      algorithmSummary: JSON.stringify(state.algorithmSummary),
    });

    return { ...state, scenario };
  },

  async (state: any) => {
    const applicativeProblem = await applicativeAssembler.invoke({
      difficulty: state.difficulty ?? 'medium',
      algorithmSummary: JSON.stringify(state.algorithmSummary),
      scenario: JSON.stringify(state.scenario),
    });

    return {
      algorithmSummary: state.algorithmSummary,
      scenario: state.scenario,
      applicativeProblem,
    };
  },
]);

// -------------------------------------------------------
//                    RUN EXAMPLE
// -------------------------------------------------------
async function main() {
  const result = await pipeline.invoke({
    dsaProblem: `
Given an array nums and integer k, return the maximum subarray sum whose length is divisible by k.`,
    domainPreference: 'finance',
    difficulty: 'medium',
  });

  console.log('FINAL OUTPUT JSON:\n');
  console.dir(result.applicativeProblem, { depth: null });
}

main().catch(console.error);

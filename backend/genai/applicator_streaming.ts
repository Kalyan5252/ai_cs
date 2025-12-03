import 'dotenv/config';
import { highLevelModel, creativeModel } from './ai_setup';
import {
  algorithmExtractorPrompt,
  scenarioGeneratorPrompt,
  applicativeAssemblerPrompt,
} from './prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import {
  AlgorithmExtractionSchema,
  ScenarioSchema,
  ApplicativeProblemSchema,
} from './schemas';

function extractText(chunk: any): string {
  if (!chunk) return '';

  if (typeof chunk.content === 'string') {
    return chunk.content;
  }

  // Some models return array of blocks
  if (Array.isArray(chunk.content)) {
    return chunk.content
      .map((c: any) => (typeof c === 'string' ? c : c.text ?? ''))
      .join('');
  }

  return '';
}

// STEP 1
const algorithmExtractor = algorithmExtractorPrompt.pipe(
  highLevelModel.withStructuredOutput(AlgorithmExtractionSchema)
);

// STEP 2
const scenarioGenerator = scenarioGeneratorPrompt.pipe(
  creativeModel.withStructuredOutput(ScenarioSchema)
);

// STEP 3 — STREAMABLE VERSION
const applicativeAssembler = creativeModel.withStructuredOutput(
  ApplicativeProblemSchema
);

function sanitizeJSON(text: string): string {
  return text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();
}

// ---------------------------------------------
// NEW STREAMING FUNCTION
// ---------------------------------------------
async function streamApplicativeProblem(state: any) {
  // Build the runnable: prompt -> model
  const runnable = applicativeAssemblerPrompt.pipe(creativeModel);

  // Prepare the input values for the prompt
  const inputValues = {
    difficulty: state.difficulty ?? 'medium',
    algorithmSummary: JSON.stringify(state.algorithmSummary),
    scenario: JSON.stringify(state.scenario),
  };

  // Stream from the runnable
  const stream = await runnable.stream(inputValues);

  console.log('\n\n=== STREAM OUTPUT START ===\n');

  let fullText = '';

  for await (const chunk of stream) {
    const text = extractText(chunk);
    fullText += text;
    process.stdout.write(text);
  }

  console.log('\n\n=== STREAM OUTPUT END ===');

  const clean = sanitizeJSON(fullText);

  let parsed;
  try {
    parsed = ApplicativeProblemSchema.safeParse(JSON.parse(clean));
    console.log('fullText', fullText, parsed);
  } catch (err) {
    console.error('Failed to parse streamed JSON:', clean);
    throw err;
  }

  if (!parsed.success) {
    console.error('Zod validation failed:', parsed.error);
    return null;
  }

  return parsed.data;
}

// --------------------------------------------------
// FULL PIPELINE (steps 1 + 2 normal, step 3 streamed)
// --------------------------------------------------
async function runPipelineStreaming(input: any) {
  const algorithmSummary = await algorithmExtractor.invoke({
    dsaProblem: input.dsaProblem,
  });

  const scenario = await scenarioGenerator.invoke({
    domainPreference: input.domainPreference ?? 'any',
    algorithmSummary: JSON.stringify(algorithmSummary),
  });

  // STREAM THE BIG PART
  const applicativeProblem = await streamApplicativeProblem({
    difficulty: input.difficulty,
    algorithmSummary,
    scenario,
  });

  return {
    algorithmSummary,
    scenario,
    applicativeProblem,
  };
}

// test run
async function main() {
  await runPipelineStreaming({
    dsaProblem: `Given nums[] and k, return maximum subarray sum with length divisible by k.`,
    domainPreference: 'gaming',
    difficulty: 'medium',
  });
}

main().catch(console.error);

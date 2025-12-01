import { z } from 'zod';

export const AlgorithmExtractionSchema = z.object({
  algorithm_name: z.string(),
  core_idea: z.string(),
  data_structures: z.array(z.string()),
  time_complexity: z.string(),
  space_complexity: z.string(),
  key_steps: z.array(z.string()),
  real_world_analogies: z.array(z.string()),
});

export const ScenarioSchema = z.object({
  domain: z.string(),
  title: z.string(),
  short_description: z.string(),
  scenario_details: z.string(),
  mapping_notes: z.string(),
});

export const ApplicativeProblemSchema = z.object({
  problem_title: z.string(),
  problem_statement: z.string(),
  input_format: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      description: z.string(),
    })
  ),
  output_format: z.object({
    type: z.string(),
    description: z.string(),
  }),
  constraints: z.array(z.string()),
  sample_input: z.any(),
  sample_output: z.any(),
  explanation: z.string(),
  hints: z.array(z.string()),
  algorithm_steps: z.array(z.string()),
  real_world_application: z.string(),
  data_structures_used: z.array(z.string()),
  time_complexity: z.string(),
  space_complexity: z.string(),
});

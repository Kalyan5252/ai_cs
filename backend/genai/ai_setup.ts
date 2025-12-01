import { ChatOpenAI } from '@langchain/openai';

export const highLevelModel = new ChatOpenAI({
  model: 'gpt-4.1',
  temperature: 0.2,
});

export const creativeModel = new ChatOpenAI({
  model: 'gpt-4.1-mini',
  temperature: 0.7,
});

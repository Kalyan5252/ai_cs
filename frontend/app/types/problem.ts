export type Difficulty = 'easy' | 'medium' | 'hard' | string;

export interface ProblemExample {
  input: string;
  output: string;
}

export interface Problem {
  id?: string;
  title: string;
  slug?: string;
  difficulty?: Difficulty;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  createdAt?: string;
  tags?: string[];
}

export interface CodeTab {
  id: number | string;
  name: string;
  active: boolean;
}

export type RunHandler = (code: string) => Promise<string> | string;

export interface ProblemPageProps {
  problemData?: Problem | null;
  onRun?: RunHandler | null;
  onSubmit?: RunHandler | null;
}

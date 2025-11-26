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
  /**
   * Example I/O pairs shown in the problem statement.
   */
  examples: ProblemExample[];
  /**
   * Human‑readable constraint lines, e.g. "2 <= nums.length <= 10^4".
   */
  constraints: string[];
  createdAt?: string;
  /**
   * Optional tag names associated with the problem.
   */
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

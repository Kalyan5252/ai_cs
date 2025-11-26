'use client';

import React, { useState, useRef, useEffect } from 'react';
import type * as monacoEditor from 'monaco-editor';

// ---------- Types ----------
interface Example {
  input: string;
  output: string;
}

interface Problem {
  title: string;
  description: string;
  examples: Example[];
  constraints: string[];
}

interface Tab {
  id: number;
  name: string;
  active: boolean;
}

interface ProblemStatementProps {
  problem: Problem;
}

interface CodeTabsProps {
  tabs: Tab[];
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
}

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language?: string;
}

interface ConsoleOutputProps {
  consoleOut: string;
}

interface ProblemPageProps {
  problemData?: Problem | null;
  onRun?: (code: string) => Promise<string> | string;
  onSubmit?: (code: string) => Promise<string> | string;
}

// =============================
// Problem Statement Component
// =============================
function ProblemStatement({ problem }: ProblemStatementProps) {
  return (
    <div className="rounded-xl p-6 bg-[#0F1B1F] overflow-auto flex flex-col h-full">
      <h1 className="text-2xl font-semibold text-white">{problem.title}</h1>
      <p className="mt-4 text-gray-300 leading-relaxed">
        {problem.description}
      </p>

      <h2 className="mt-6 text-lg font-semibold text-gray-100">Examples</h2>
      <div className="mt-2 space-y-2">
        {problem.examples.map((ex, idx) => (
          <div
            key={idx}
            className="bg-[#1a212b] border border-gray-700 p-3 rounded-lg text-sm"
          >
            <p>
              <span className="text-gray-400">Input:</span> {ex.input}
            </p>
            <p>
              <span className="text-gray-400">Output:</span> {ex.output}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-6 text-lg font-semibold text-gray-100">Constraints</h2>
      <ul className="mt-2 list-disc list-inside text-gray-300 text-sm space-y-1">
        {problem.constraints.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

// =============================
// Tabs Component
// =============================
function CodeTabs({ tabs, setTabs }: CodeTabsProps) {
  return (
    <div className="flex items-center rounded-t-xl h-12">
      {tabs.map((t) => (
        <div
          key={t.id}
          onClick={() =>
            setTabs((prev) =>
              prev.map((tab) => ({ ...tab, active: tab.id === t.id }))
            )
          }
          className={`px-4 py-2 text-sm rounded-md cursor-pointer mr-2 ${
            t.active ? 'bg-[#1f2730] text-white' : 'text-gray-400'
          }`}
        >
          {t.name}
        </div>
      ))}
      <button
        className="ml-auto text-xl text-gray-400"
        onClick={() =>
          setTabs((prev) => [
            ...prev,
            { id: Date.now(), name: 'NewFile.py', active: false },
          ])
        }
      >
        +
      </button>
    </div>
  );
}

// =============================
// Code Editor Component (Monaco)
// =============================
const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  language = 'javascript',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );
  const monacoRef = useRef<typeof monacoEditor | null>(null);

  // Mount Monaco editor once
  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;

    const load = async () => {
      const monaco = await import('monaco-editor');
      if (!containerRef.current || disposed) return;

      monacoRef.current = monaco;

      monaco.editor.defineTheme('myCoolTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '888888' },
          { token: 'keyword', foreground: 'c586c0' },
        ],
        colors: {
          'editor.background': '#1D2A31',
        },
      });

      const editor = monaco.editor.create(containerRef.current, {
        value: code,
        language,
        theme: 'myCoolTheme',
        automaticLayout: true,
        fontSize: 15,
        minimap: { enabled: false },
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        roundedSelection: false,
        fontFamily: 'JetBrains Mono, Menlo, monospace',
      });

      editorRef.current = editor;

      editor.onDidChangeModelContent(() => {
        setCode(editor.getValue());
      });
    };

    load();

    return () => {
      disposed = true;
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep external code changes in sync
  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== code) {
      editorRef.current.setValue(code);
    }
  }, [code]);

  return (
    <div className="flex-1 bg-[#0F1B1F] rounded-t-xl h-full overflow-clip">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

// =============================
// Console Output Component
// =============================
function ConsoleOutput({ consoleOut }: ConsoleOutputProps) {
  return (
    <div className="my-4 bg-[#1D2A31] rounded-xl p-4 h-40 overflow-auto font-mono text-sm text-gray-300">
      {consoleOut || 'Console output...'}
    </div>
  );
}

// =============================
// PAGE ROUTE COMPONENT
// =============================
export default function ProblemPage({
  problemData = null,
  onRun,
  onSubmit,
}: ProblemPageProps) {
  const sampleProblem: Problem = {
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Exactly one valid answer exists.',
    ],
  };

  const problem = problemData ?? sampleProblem;

  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, name: 'Program1.py', active: true },
    { id: 2, name: 'Test.java', active: false },
  ]);

  const [code, setCode] = useState<string>('def solve():\n    pass');
  const [consoleOut, setConsoleOut] = useState<string>('');

  const handleRun = async () => {
    if (onRun) {
      const res = await Promise.resolve(onRun(code));
      setConsoleOut(res);
    } else {
      setConsoleOut('Running... (connect backend)');
    }
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      const res = await Promise.resolve(onSubmit(code));
      setConsoleOut(res);
    } else {
      setConsoleOut('Submitting... (connect backend)');
    }
  };

  return (
    <div className="min-h-screen h-screen w-full bg-[#232F32] text-gray-200 flex flex-col p-4 select-none">
      <div className="grid grid-cols-2 gap-4 h-full">
        <ProblemStatement problem={problem} />

        <div className="flex flex-col h-full bg-[#0F1B1F] px-4 py-1 rounded-xl">
          <CodeTabs tabs={tabs} setTabs={setTabs} />

          <CodeEditor code={code} setCode={setCode} language="javascript" />

          <hr className="text-[#0c181f]" />
          <div className="flex justify-between items-center bg-[#1D2A31] rounded-b-xl px-4 py-2">
            <div className="text-xs text-gray-400">
              Line {code.split('\n').length}, Col 1
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRun}
                className="px-4 py-1 bg-[#1c7ed6] hover:bg-[#228be6] rounded-md text-sm"
              >
                Run
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-[#0ca678] hover:bg-[#099268] rounded-md text-sm"
              >
                Submit
              </button>
            </div>
          </div>

          <ConsoleOutput consoleOut={consoleOut} />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Problem, CodeTab, ProblemPageProps } from '../types/problem';

// =============================
// Problem Statement Component
// =============================
function ProblemStatement({ problem }: { problem: Problem }) {
  return (
    <div className="border border-gray-700 rounded-xl p-6 bg-[#11161c] overflow-auto flex flex-col h-full">
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
function CodeTabs({
  tabs,
  setTabs,
}: {
  tabs: CodeTab[];
  setTabs: React.Dispatch<React.SetStateAction<CodeTab[]>>;
}) {
  return (
    <div className="flex items-center bg-[#11161c] border border-gray-700 rounded-t-xl px-4 h-12">
      {tabs.map((t) => (
        <div
          key={t.id}
          onClick={() =>
            setTabs((prev) =>
              prev.map((tab) => ({ ...tab, active: tab.id === t.id }))
            )
          }
          className={`px-4 py-1 text-sm rounded-md cursor-pointer mr-2 ${
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
// Code Editor Component
// =============================
function CodeEditor({
  code,
  setCode,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="flex-1 bg-[#0c1117] border-x border-gray-700 p-4 font-mono text-sm outline-none resize-none text-gray-200"
    />
  );
}

// =============================
// Console Output Component
// =============================
function ConsoleOutput({ consoleOut }: { consoleOut: string }) {
  return (
    <div className="mt-4 bg-[#0c1117] border border-gray-700 rounded-xl p-4 h-40 overflow-auto font-mono text-sm text-gray-300">
      {consoleOut || 'Console output...'}
    </div>
  );
}

// =============================
// PAGE ROUTE: /problem
// =============================
export default function ProblemPage({
  problemData = null,
  onRun = null,
  onSubmit = null,
}: ProblemPageProps = {}) {
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

  const problem = problemData || sampleProblem;

  const [tabs, setTabs] = useState<CodeTab[]>([
    { id: 1, name: 'Program1.py', active: true },
    { id: 2, name: 'Test.java', active: false },
  ]);

  const [code, setCode] = useState(`def solve():\n    pass`);
  const [consoleOut, setConsoleOut] = useState('');

  const handleRun = async () => {
    if (onRun) setConsoleOut(await onRun(code));
    else setConsoleOut('Running... (connect backend)');
  };

  const handleSubmit = async () => {
    if (onSubmit) setConsoleOut(await onSubmit(code));
    else setConsoleOut('Submitting... (connect backend)');
  };

  return (
    <div className="min-h-screen w-full bg-[#0c0f12] text-gray-200 flex flex-col p-6 select-none">
      <div className="grid grid-cols-2 gap-6 h-full">
        <ProblemStatement problem={problem} />

        <div className="flex flex-col h-full">
          <CodeTabs tabs={tabs} setTabs={setTabs} />

          <CodeEditor code={code} setCode={setCode} />

          <div className="flex justify-between items-center bg-[#11161c] border border-gray-700 rounded-b-xl px-4 py-2">
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

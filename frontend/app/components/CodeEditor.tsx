'use client';

import React, { useRef, useEffect } from 'react';
import { CodeEditorProps } from '../types';
import type * as monacoEditor from 'monaco-editor';

// =============================
// Code Editor Component (Monaco)
// =============================
const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  language = 'python',
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
          { token: 'comment', foreground: '6E6B66' },
          { token: 'keyword', foreground: '63B0CD' },
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
        fontSize: 14,
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

export default CodeEditor;

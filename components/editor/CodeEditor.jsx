'use client';

import React, { useState, useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Copy, Check, Code2, Maximize2, Minimize2 } from 'lucide-react';

export const SUPPORTED_LANGUAGES = [
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'c', label: 'C' },
];

export function CodeEditor({
  value = '',
  onChange,
  language = 'cpp',
  placeholder = 'Write your Code',
  onLanguageChange,
  readOnly = false,
  minHeight = '320px',
  className = '',
}) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const extensions = useMemo(() => {
    switch (language) {
      case 'python':
        return [python()];
      case 'cpp':
      case 'c':
        return [cpp()];
      case 'java':
        return [java()];
      case 'javascript':
      default:
        return [javascript({ jsx: true })];
    }
  }, [language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={`flex flex-col border border-border rounded-xl overflow-hidden bg-panel ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl flex flex-col bg-panel border-accent/40' : ''
      } ${className}`}
    >
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border bg-elevated/70">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent" />
          {onLanguageChange ? (
            <select
              value={language || 'cpp'}
              onChange={(e) => onLanguageChange(e.target.value)}
              disabled={readOnly}
              aria-label="Code language"
              className="bg-panel border border-border rounded-md px-2 py-1 text-xs text-foreground font-medium focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-xs font-semibold text-foreground/80 uppercase">
              {language || 'cpp'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-border hover:bg-panel text-muted hover:text-foreground transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 text-xs rounded-md border border-border hover:bg-panel text-muted hover:text-foreground transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className={`overflow-auto text-sm font-mono ${isFullscreen ? 'flex-1' : ''}`}>
        <CodeMirror
          value={value}
          height={isFullscreen ? '100%' : minHeight}
          placeholder={placeholder}
          theme={isDark ? oneDark : 'light'}
          extensions={extensions}
          onChange={onChange}
          readOnly={readOnly}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: !readOnly,
            bracketMatching: true,
            closeBrackets: !readOnly,
            autocompletion: !readOnly,
            foldGutter: true,
          }}
          className="text-sm font-mono h-full"
        />
      </div>
    </div>
  );
}


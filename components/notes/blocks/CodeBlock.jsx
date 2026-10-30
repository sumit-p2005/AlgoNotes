'use client';

import React from 'react';
import { CodeEditor } from '@/components/editor/CodeEditor';

export function CodeBlock({
  content = {},
  onChange,
  autoFocus = false,
  onFocus,
}) {
  const code = content.code || '';
  const language = content.language || 'cpp';

  const handleCodeChange = (newCode) => {
    onChange({
      ...content,
      code: newCode,
    });
  };

  const handleLanguageChange = (newLanguage) => {
    onChange({
      ...content,
      language: newLanguage,
    });
  };

  return (
    <div className="w-full mt-1 mb-2.5 sm:mb-3 first:mt-0" onFocus={onFocus}>
      <CodeEditor
        value={code}
        onChange={handleCodeChange}
        language={language}
        onLanguageChange={handleLanguageChange}
        placeholder="Write your Code"
        autoFocus={autoFocus}
        minHeight="140px"
        className="shadow-xs"
      />
    </div>
  );
}


'use client';

import React from 'react';
import { CodeEditor } from '@/components/editor/CodeEditor';

export function CodeBlock({ content = {}, onChange }) {
  const code = content.code || '';
  const language = content.language || 'javascript';

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
    <div className="w-full my-2">
      <CodeEditor
        value={code}
        onChange={handleCodeChange}
        language={language}
        onLanguageChange={handleLanguageChange}
        minHeight="140px"
        className="shadow-sm"
      />
    </div>
  );
}

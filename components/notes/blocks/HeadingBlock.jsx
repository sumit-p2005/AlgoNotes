'use client';

import React, { useRef, useEffect } from 'react';

export function HeadingBlock({ content = {}, onChange, autoFocus = false }) {
  const textareaRef = useRef(null);
  const text = content.text || '';

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => {
          onChange({ ...content, text: e.target.value });
          adjustHeight();
        }}
        placeholder="Section Heading..."
        aria-label="Section Heading"
        className="w-full resize-none overflow-hidden bg-transparent font-bold text-2xl sm:text-3xl text-foreground placeholder:text-muted/40 focus:outline-none tracking-tight leading-tight"
      />
    </div>
  );
}

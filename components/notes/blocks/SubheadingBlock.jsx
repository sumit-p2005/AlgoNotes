'use client';

import React, { useRef, useEffect } from 'react';

export function SubheadingBlock({ content = {}, onChange, autoFocus = false }) {
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
        placeholder="Subheading..."
        aria-label="Subheading"
        className="w-full resize-none overflow-hidden bg-transparent font-semibold text-lg sm:text-xl text-foreground/90 placeholder:text-muted/40 focus:outline-none tracking-tight leading-snug"
      />
    </div>
  );
}

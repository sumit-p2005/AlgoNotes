'use client';

import React, { useRef, useEffect } from 'react';

export function HeadingBlock({
  content = {},
  onChange,
  autoFocus = false,
  blockNumber = null,
  onFocus,
  onEnter,
  onDeleteEmpty,
}) {
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
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [autoFocus]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter?.();
    } else if (e.key === 'Backspace' && !text) {
      e.preventDefault();
      onDeleteEmpty?.();
    }
  };

  return (
    <div className="w-full mt-3.5 mb-2.5 first:mt-0 flex items-baseline gap-2.5">
      {blockNumber && (
        <span className="font-extrabold text-2xl sm:text-3xl text-accent select-none shrink-0 font-mono tracking-tight">
          {blockNumber}.
        </span>
      )}
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          onChange({ ...content, text: e.target.value });
          adjustHeight();
        }}
        placeholder="Section Heading..."
        aria-label="Section Heading"
        className="w-full resize-none overflow-hidden bg-transparent font-extrabold text-2xl sm:text-3xl text-foreground placeholder:text-muted/30 focus:outline-none tracking-tight leading-tight"
      />
    </div>
  );
}


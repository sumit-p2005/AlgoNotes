'use client';

import React, { useRef, useEffect } from 'react';

export function SubheadingBlock({
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
    <div className="w-full mt-2.5 mb-1.5 first:mt-0 flex items-baseline gap-2 pl-1.5 sm:pl-2.5">
      {blockNumber && (
        <span className="font-semibold text-lg sm:text-xl text-accent/90 select-none shrink-0 font-mono tracking-tight">
          {blockNumber}
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
        placeholder="Subheading..."
        aria-label="Subheading"
        className="w-full resize-none overflow-hidden bg-transparent font-semibold text-lg sm:text-xl text-foreground/90 placeholder:text-muted/30 focus:outline-none tracking-tight leading-snug"
      />
    </div>
  );
}


'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Code,
} from 'lucide-react';

export function TextBlock({
  content = {},
  onChange,
  autoFocus = false,
  onFocus,
  onDeleteEmpty,
}) {
  const textareaRef = useRef(null);
  const text = content.text || '';
  const [isFocused, setIsFocused] = useState(false);

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

  // Apply formatting to selected text
  const applyFormat = (formatType) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = text.substring(start, end);

    let formatted = selected;
    let newCursorPos = end;

    switch (formatType) {
      case 'bold':
        formatted = `**${selected || 'bold text'}**`;
        newCursorPos = selected ? end + 4 : start + 11;
        break;
      case 'italic':
        formatted = `*${selected || 'italic text'}*`;
        newCursorPos = selected ? end + 2 : start + 12;
        break;
      case 'underline':
        formatted = `<u>${selected || 'underlined text'}</u>`;
        newCursorPos = selected ? end + 7 : start + 18;
        break;
      case 'bullet': {
        const lines = (selected || 'List item').split('\n');
        formatted = lines.map((l) => (l.startsWith('• ') ? l : `• ${l}`)).join('\n');
        newCursorPos = start + formatted.length;
        break;
      }
      case 'number': {
        const lines = (selected || 'Step item').split('\n');
        formatted = lines.map((l, i) => `${i + 1}. ${l.replace(/^\d+\.\s*/, '')}`).join('\n');
        newCursorPos = start + formatted.length;
        break;
      }
      case 'code':
        formatted = `\`${selected || 'code'}\``;
        newCursorPos = selected ? end + 2 : start + 5;
        break;
      default:
        break;
    }

    const updatedText = text.substring(0, start) + formatted + text.substring(end);
    onChange({ ...content, text: updatedText });

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(newCursorPos, newCursorPos);
      adjustHeight();
    }, 10);
  };

  return (
    <div className="w-full space-y-1 group">
      {/* Mini formatting pill toolbar on focus / hover */}
      <div
        className={`flex items-center gap-0.5 p-1 rounded-lg border border-border/80 bg-elevated/80 w-fit transition-opacity duration-150 ${
          isFocused ? 'opacity-100 pointer-events-auto' : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
        }`}
        role="toolbar"
        aria-label="Text Formatting"
      >
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('bold');
          }}
          className="p-1 rounded text-muted hover:text-foreground hover:bg-panel transition-colors"
          title="Bold (**text**)"
          aria-label="Format Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('italic');
          }}
          className="p-1 rounded text-muted hover:text-foreground hover:bg-panel transition-colors"
          title="Italic (*text*)"
          aria-label="Format Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('underline');
          }}
          className="p-1 rounded text-muted hover:text-foreground hover:bg-panel transition-colors"
          title="Underline (<u>text</u>)"
          aria-label="Format Underline"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>
        <div className="h-3 w-[1px] bg-border mx-0.5" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('bullet');
          }}
          className="p-1 rounded text-muted hover:text-foreground hover:bg-panel transition-colors"
          title="Bullet list (• text)"
          aria-label="Bullet list"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('number');
          }}
          className="p-1 rounded text-muted hover:text-foreground hover:bg-panel transition-colors"
          title="Numbered list (1. text)"
          aria-label="Numbered list"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('code');
          }}
          className="p-1 rounded text-muted hover:text-foreground hover:bg-panel transition-colors"
          title="Inline code (`code`)"
          aria-label="Format Inline code"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && !text) {
            e.preventDefault();
            onDeleteEmpty?.();
          }
        }}
        onChange={(e) => {
          onChange({ ...content, text: e.target.value });
          adjustHeight();
        }}
        placeholder="Write text, paragraph, explanation, or notes... (Formatting shortcuts supported)"
        aria-label="Text block content"
        className="w-full resize-none overflow-hidden bg-transparent text-sm sm:text-base text-foreground/90 placeholder:text-muted/30 focus:outline-none leading-[1.6] min-h-[26px]"
      />
    </div>
  );
}


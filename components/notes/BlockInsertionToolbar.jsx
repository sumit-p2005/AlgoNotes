'use client';

import React from 'react';
import {
  Heading,
  Heading2,
  Pilcrow,
  Code2,
  Image as ImageIcon,
  Plus,
} from 'lucide-react';

export const BLOCK_TYPES = {
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  TEXT: 'text',
  CODE: 'code',
  IMAGE: 'image',
};

export function BlockInsertionToolbar({ onInsertBlock, className = '', compact = false }) {
  const tools = [
    {
      type: BLOCK_TYPES.HEADING,
      label: 'Heading',
      icon: Heading,
      description: 'Large section heading',
    },
    {
      type: BLOCK_TYPES.SUBHEADING,
      label: 'Subheading',
      icon: Heading2,
      description: 'Secondary subheading',
    },
    {
      type: BLOCK_TYPES.TEXT,
      label: 'Text',
      icon: Pilcrow,
      description: 'Paragraph with rich formatting',
    },
    {
      type: BLOCK_TYPES.CODE,
      label: 'Code',
      icon: Code2,
      description: 'Syntax-highlighted CodeMirror block',
    },
    {
      type: BLOCK_TYPES.IMAGE,
      label: 'Image',
      icon: ImageIcon,
      description: 'Upload or embed image',
    },
  ];

  if (compact) {
    return (
      <div
        className={`flex items-center gap-1 p-1 rounded-xl border border-border bg-panel/95 shadow-lg backdrop-blur-md ${className}`}
        role="toolbar"
        aria-label="Insert block options"
      >
        <span className="text-[10px] font-semibold text-muted px-2 uppercase tracking-wider flex items-center gap-1">
          <Plus className="w-3 h-3 text-accent" />
          <span>Insert</span>
        </span>
        <div className="h-4 w-[1px] bg-border mx-1" />
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.type}
              type="button"
              onClick={() => onInsertBlock(t.type)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-elevated transition-colors cursor-pointer"
              title={t.description}
              aria-label={`Insert ${t.label} block`}
            >
              <Icon className="w-3.5 h-3.5 text-accent" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`p-3 rounded-2xl border border-border bg-panel/70 shadow-sm ${className}`}
      role="toolbar"
      aria-label="Note Block Insertion Toolbar"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-accent" />
          <span>Insert Content Block</span>
        </span>
        <span className="text-[10px] text-muted">Click to append to note</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.type}
              type="button"
              onClick={() => onInsertBlock(t.type)}
              className="group flex flex-col items-center justify-center p-3 rounded-xl border border-border/80 bg-page/60 hover:bg-elevated hover:border-accent/40 text-left transition-all cursor-pointer"
              aria-label={`Insert ${t.label}`}
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform mb-2">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                + {t.label}
              </span>
              <span className="text-[10px] text-muted text-center mt-0.5 line-clamp-1">
                {t.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


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
import { cn } from '@/lib/utils/cn';

export const BLOCK_TYPES = {
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  TEXT: 'text',
  CODE: 'code',
  IMAGE: 'image',
};

const TOOLS = [
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

export function BlockInsertionToolbar({ onInsertBlock, className = '', isDocked = false, activeBlockType = null }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        isDocked && 'sticky bottom-4 z-20 mx-auto w-fit',
        className
      )}
      role="toolbar"
      aria-label="Insert content block toolbar"
    >
      <div className="flex items-center gap-1 p-1 sm:p-1.5 rounded-2xl border border-border bg-panel/95 shadow-lg backdrop-blur-md">
        <span className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-muted px-2.5 uppercase tracking-wider select-none">
          <Plus className="w-3.5 h-3.5 text-accent stroke-[3]" />
          <span>Insert</span>
        </span>
        <div className="hidden sm:block h-4 w-[1px] bg-border mr-1" />

        <div className="flex items-center gap-1">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            const isActive = activeBlockType === t.type;
            return (
              <button
                key={t.type}
                type="button"
                onMouseDown={(e) => {
                  // Prevent stealing focus before insertion
                  e.preventDefault();
                }}
                onClick={() => onInsertBlock(t.type)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer select-none group',
                  isActive
                    ? 'bg-accent/15 border-accent/40 text-accent font-bold shadow-xs'
                    : 'text-muted hover:text-foreground hover:bg-elevated border-transparent hover:border-border'
                )}
                title={t.description}
                aria-label={`Insert ${t.label} block`}
              >
                <Icon
                  className={cn(
                    'w-3.5 h-3.5 text-accent transition-transform group-hover:scale-110',
                    isActive && 'scale-110 text-accent'
                  )}
                />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

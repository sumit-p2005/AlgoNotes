'use client';

import React, { useState, useMemo } from 'react';
import {
  List,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Hash,
} from 'lucide-react';
import { generateTableOfContents } from '@/lib/utils/noteNumbering';
import { cn } from '@/lib/utils/cn';

export function TableOfContents({
  blocks = [],
  className = '',
  isMobileModal = false,
  onCloseMobile,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const items = useMemo(() => generateTableOfContents(blocks), [blocks]);

  const handleScrollTo = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('bg-amber-400/15', 'transition-colors', 'duration-300');
      setTimeout(() => {
        el.classList.remove('bg-amber-400/15');
      }, 1200);
      if (isMobileModal && onCloseMobile) {
        onCloseMobile();
      }
    }
  };

  // If collapsed on desktop, show a compact vertical strip to reopen
  if (isCollapsed && !isMobileModal) {
    return (
      <aside
        className={cn(
          'hidden lg:flex flex-col items-center justify-start py-4 px-1.5 w-10 shrink-0 border-l border-border bg-panel transition-all select-none',
          className
        )}
      >
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="p-1.5 rounded-lg text-muted hover:text-amber-400 hover:bg-elevated transition-colors"
          title="Expand Table of Contents"
          aria-label="Expand Table of Contents"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="mt-8 [writing-mode:vertical-rl] text-[10px] tracking-wider text-muted font-bold uppercase flex items-center gap-1.5">
          <List className="w-3 h-3 text-amber-400 rotate-90" />
          <span>Contents</span>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        isMobileModal
          ? 'w-full max-w-sm mx-auto p-4'
          : 'hidden lg:flex flex-col w-64 shrink-0 border-l border-border bg-panel text-xs select-none transition-all',
        className
      )}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between h-12 px-3.5 border-b border-border/80 shrink-0">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <List className="w-4 h-4 text-amber-400" />
          <span className="tracking-wide">Table of Contents</span>
          {items.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-elevated border border-border text-muted font-mono font-medium">
              {items.length}
            </span>
          )}
        </div>
        {!isMobileModal && (
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-elevated transition-colors"
            title="Collapse Table of Contents"
            aria-label="Collapse Table of Contents"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Contents List or Empty State */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-2 text-muted select-none">
            <div className="w-8 h-8 rounded-full bg-elevated flex items-center justify-center border border-border/60">
              <Hash className="w-4 h-4 text-muted/60" />
            </div>
            <p className="text-xs font-semibold text-foreground/80">No headings yet</p>
            <p className="text-[11px] text-muted max-w-[170px] leading-relaxed">
              Add a heading to generate your table of contents.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const isHeading = item.level === 1;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.anchorId)}
                className={cn(
                  'w-full text-left py-1.5 px-2 rounded-lg text-xs transition-colors flex items-start gap-1.5 group hover:bg-elevated/70 cursor-pointer',
                  isHeading
                    ? 'font-medium text-foreground/90'
                    : 'pl-5 text-muted hover:text-foreground'
                )}
                title={item.text || (isHeading ? 'Untitled Heading' : 'Untitled Subheading')}
              >
                <span className="font-mono text-amber-400 font-semibold text-[11px] shrink-0 pt-0.5">
                  {item.number}
                </span>
                <span className="truncate group-hover:text-amber-400">
                  {item.text || (isHeading ? 'Untitled Heading' : 'Untitled Subheading')}
                </span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}

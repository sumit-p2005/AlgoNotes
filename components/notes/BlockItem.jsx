'use client';

import React, { useState } from 'react';
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  Plus,
} from 'lucide-react';
import { HeadingBlock } from './blocks/HeadingBlock';
import { SubheadingBlock } from './blocks/SubheadingBlock';
import { TextBlock } from './blocks/TextBlock';
import { CodeBlock } from './blocks/CodeBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { BlockInsertionToolbar, BLOCK_TYPES } from './BlockInsertionToolbar';
import { cn } from '@/lib/utils/cn';

export function BlockItem({
  block,
  index,
  totalBlocks,
  blockNumber = null,
  isFocused = false,
  onUpdateContent,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  onInsertBelow,
  onBlockFocus,
  onEnterNewBlock,
  onDeleteEmptyBlock,
}) {
  const [showInserter, setShowInserter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderBlockContent = () => {
    switch (block.block_type) {
      case BLOCK_TYPES.HEADING:
        return (
          <HeadingBlock
            content={block.content}
            blockNumber={blockNumber}
            autoFocus={isFocused}
            onFocus={() => onBlockFocus?.(block.id)}
            onEnter={() => onEnterNewBlock?.(index)}
            onDeleteEmpty={() => onDeleteEmptyBlock?.(block.id, index)}
            onChange={(newContent) => onUpdateContent(block.id, newContent)}
          />
        );
      case BLOCK_TYPES.SUBHEADING:
        return (
          <SubheadingBlock
            content={block.content}
            blockNumber={blockNumber}
            autoFocus={isFocused}
            onFocus={() => onBlockFocus?.(block.id)}
            onEnter={() => onEnterNewBlock?.(index)}
            onDeleteEmpty={() => onDeleteEmptyBlock?.(block.id, index)}
            onChange={(newContent) => onUpdateContent(block.id, newContent)}
          />
        );
      case BLOCK_TYPES.TEXT:
        return (
          <TextBlock
            content={block.content}
            autoFocus={isFocused}
            onFocus={() => onBlockFocus?.(block.id)}
            onDeleteEmpty={() => onDeleteEmptyBlock?.(block.id, index)}
            onChange={(newContent) => onUpdateContent(block.id, newContent)}
          />
        );
      case BLOCK_TYPES.CODE:
        return (
          <CodeBlock
            content={block.content}
            autoFocus={isFocused}
            onFocus={() => onBlockFocus?.(block.id)}
            onChange={(newContent) => onUpdateContent(block.id, newContent)}
          />
        );
      case BLOCK_TYPES.IMAGE:
        return (
          <ImageBlock
            content={block.content}
            onChange={(newContent) => onUpdateContent(block.id, newContent)}
          />
        );
      default:
        return (
          <div className="p-2 text-xs text-rose-500 bg-rose-500/10 rounded-lg">
            Unknown block type: {block.block_type}
          </div>
        );
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group px-1 sm:px-2 py-0.5 rounded-lg transition-colors hover:bg-panel/20"
    >
      {/* Top/Left Floating Action Handle */}
      <div
        className={cn(
          'absolute -left-2 sm:-left-9 top-1 flex items-center gap-0.5 bg-panel border border-border rounded-lg shadow-sm p-0.5 transition-opacity z-10',
          isHovered || isFocused
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto'
        )}
      >
        {/* Move Up */}
        <button
          type="button"
          disabled={index === 0}
          onClick={() => onMoveBlock(index, index - 1)}
          className="p-1 text-muted hover:text-foreground disabled:opacity-20 hover:bg-elevated rounded transition-colors"
          title="Move up"
          aria-label="Move block up"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        {/* Move Down */}
        <button
          type="button"
          disabled={index === totalBlocks - 1}
          onClick={() => onMoveBlock(index, index + 1)}
          className="p-1 text-muted hover:text-foreground disabled:opacity-20 hover:bg-elevated rounded transition-colors"
          title="Move down"
          aria-label="Move block down"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Duplicate */}
        <button
          type="button"
          onClick={() => onDuplicateBlock(block.id)}
          className="p-1 text-muted hover:text-foreground hover:bg-elevated rounded transition-colors"
          title="Duplicate block"
          aria-label="Duplicate block"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={() => onDeleteBlock(block.id)}
          className="p-1 text-muted hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
          title="Delete block"
          aria-label="Delete block"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Block Content Render */}
      <div className="w-full">{renderBlockContent()}</div>

      {/* Quick Add Inserter Handle Below */}
      <div className="relative flex items-center justify-center h-2 my-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/30" />
        </div>
        <button
          type="button"
          onClick={() => setShowInserter(!showInserter)}
          className="relative z-10 flex items-center gap-1 px-2 py-0.2 rounded-full bg-panel border border-border text-[9px] font-bold text-muted hover:text-foreground hover:border-accent transition-colors"
          title="Insert block here"
          aria-label="Insert block below"
        >
          <Plus className="w-2.5 h-2.5 text-accent" />
          <span>Insert Block</span>
        </button>
      </div>

      {/* Embedded Inserter Toolbar if toggled */}
      {showInserter && (
        <div className="my-1.5 animate-in fade-in zoom-in-95 duration-100">
          <BlockInsertionToolbar
            className="my-1"
            onInsertBlock={(type) => {
              onInsertBelow(index, type);
              setShowInserter(false);
            }}
          />
        </div>
      )}
    </div>
  );
}


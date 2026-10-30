'use client';

import React, { useRef, useEffect } from 'react';
import {
  RotateCcw,
  Check,
  Star,
  Trash2,
  Folder,
  Calendar,
  Layers,
  Undo2,
  Redo2,
  Plus,
} from 'lucide-react';
import { BlockItem } from './BlockItem';
import { BlockInsertionToolbar, BLOCK_TYPES } from './BlockInsertionToolbar';
import { cn } from '@/lib/utils/cn';

function getInitialBlockContent(type) {
  switch (type) {
    case BLOCK_TYPES.HEADING:
      return { text: '' };
    case BLOCK_TYPES.SUBHEADING:
      return { text: '' };
    case BLOCK_TYPES.TEXT:
      return { text: '' };
    case BLOCK_TYPES.CODE:
      return { code: '', language: 'javascript' };
    case BLOCK_TYPES.IMAGE:
      return { url: '', caption: '', widthPercent: 100, alignment: 'center' };
    default:
      return {};
  }
}

function createTempBlock(blockType, sortOrder = 0) {
  const stamp = Date.now();
  const rand = Math.random().toString(36).slice(2, 6);
  return {
    id: `temp-${stamp}-${rand}`,
    block_type: blockType,
    content: getInitialBlockContent(blockType),
    sort_order: sortOrder,
  };
}

export function NoteCanvas({
  note,
  folders = [],
  onUpdateNoteMeta,
  onUpdateBlocks,
  onDeleteNote,
  saveStatus = 'saved', // 'saved' | 'saving' | 'unsaved' | 'error'
  lastSavedAt,
  onRetrySave,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
}) {
  const titleInputRef = useRef(null);

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-page text-muted">
        <Layers className="w-12 h-12 text-muted/30 stroke-[1.5] mb-3" />
        <h3 className="text-base font-bold text-foreground">Select a note or create a new one</h3>
        <p className="text-xs text-muted max-w-sm mt-1">
          AlgoNotes My Notes lets you create free-form, block-based documents with headings, rich text, syntax-highlighted code, and images.
        </p>
      </div>
    );
  }

  const blocks = note.blocks || [];

  // Block Mutation Handlers
  const handleUpdateContent = (blockId, newContent) => {
    const updated = blocks.map((b) =>
      b.id === blockId ? { ...b, content: newContent } : b
    );
    onUpdateBlocks(updated);
  };

  const handleDeleteBlock = (blockId) => {
    const updated = blocks.filter((b) => b.id !== blockId);
    onUpdateBlocks(updated);
  };

  const handleDuplicateBlock = (blockId) => {
    const idx = blocks.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const target = blocks[idx];
    const duplicate = {
      ...target,
      id: createTempBlock(target.block_type, target.sort_order + 1).id,
      sort_order: target.sort_order + 1,
    };
    const updated = [...blocks];
    updated.splice(idx + 1, 0, duplicate);
    onUpdateBlocks(updated);
  };

  const handleMoveBlock = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= blocks.length) return;
    const updated = [...blocks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onUpdateBlocks(updated);
  };

  const handleInsertBelow = (index, blockType) => {
    const newBlock = createTempBlock(blockType, index + 2);
    const updated = [...blocks];
    updated.splice(index + 1, 0, newBlock);
    onUpdateBlocks(updated);
  };

  const handleAppendBlock = (blockType) => {
    const newBlock = createTempBlock(blockType, blocks.length + 1);
    onUpdateBlocks([...blocks, newBlock]);
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-page text-foreground">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-border bg-page/90 backdrop-blur-xs shrink-0">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Folder Selector Dropdown */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-border bg-panel text-xs">
            <Folder className="w-3.5 h-3.5 text-accent" />
            <select
              value={note.folder_id || ''}
              onChange={(e) => onUpdateNoteMeta({ folder_id: e.target.value || null })}
              className="bg-transparent text-xs text-foreground font-medium focus:outline-none cursor-pointer pr-1"
              aria-label="Select folder"
            >
              <option value="" className="bg-panel text-foreground">
                (Unorganized)
              </option>
              {folders.map((f) => (
                <option key={f.id} value={f.id} className="bg-panel text-foreground">
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Favourite Toggle */}
          <button
            type="button"
            onClick={() => onUpdateNoteMeta({ is_favourite: !note.is_favourite })}
            className={cn(
              'p-1.5 rounded-lg border transition-colors cursor-pointer',
              note.is_favourite
                ? 'border-amber-400/40 bg-amber-400/10 text-amber-400'
                : 'border-border text-muted hover:text-foreground hover:bg-panel'
            )}
            title={note.is_favourite ? 'Starred' : 'Add to favourites'}
            aria-label="Toggle favourite"
          >
            <Star
              className={cn('w-3.5 h-3.5', note.is_favourite ? 'fill-amber-400' : '')}
            />
          </button>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center border border-border rounded-lg bg-panel">
            <button
              type="button"
              disabled={!canUndo}
              onClick={onUndo}
              className="p-1.5 text-muted hover:text-foreground disabled:opacity-25 transition-colors"
              title="Undo (Ctrl+Z)"
              aria-label="Undo edit"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3 bg-border" />
            <button
              type="button"
              disabled={!canRedo}
              onClick={onRedo}
              className="p-1.5 text-muted hover:text-foreground disabled:opacity-25 transition-colors"
              title="Redo (Ctrl+Y)"
              aria-label="Redo edit"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Autosave Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-panel text-xs text-muted">
            {saveStatus === 'saving' && (
              <>
                <RotateCcw className="w-3 h-3 animate-spin text-accent" />
                <span className="text-accent font-medium">Saving...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Saved</span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Unsaved changes</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-rose-400">Save failed</span>
                {onRetrySave && (
                  <button
                    type="button"
                    onClick={onRetrySave}
                    className="ml-1 text-accent font-bold underline cursor-pointer"
                  >
                    Retry
                  </button>
                )}
              </>
            )}
          </div>

          {/* Delete Note */}
          <button
            type="button"
            onClick={onDeleteNote}
            className="p-1.5 rounded-lg border border-border hover:border-rose-500/40 text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Delete this note"
            aria-label="Delete note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-12 lg:px-20 py-8 max-w-4xl mx-auto w-full space-y-6">
        {/* Note Title Input */}
        <div>
          <input
            ref={titleInputRef}
            type="text"
            value={note.title || ''}
            onChange={(e) => onUpdateNoteMeta({ title: e.target.value })}
            placeholder="Untitled Note"
            aria-label="Note Title"
            className="w-full bg-transparent font-extrabold text-3xl sm:text-4xl text-foreground placeholder:text-muted/30 focus:outline-none tracking-tight leading-tight"
          />
        </div>

        {/* Optional Subtitle / Description */}
        <div>
          <input
            type="text"
            value={note.description || ''}
            onChange={(e) => onUpdateNoteMeta({ description: e.target.value })}
            placeholder="Add an optional brief description, tags, or topic context..."
            aria-label="Note Description"
            className="w-full bg-transparent text-sm sm:text-base text-muted placeholder:text-muted/30 focus:outline-none"
          />
        </div>

        <div className="h-[1px] w-full bg-border/60" />

        {/* Blocks Container */}
        <div className="space-y-3 min-h-[200px]">
          {blocks.length === 0 ? (
            <div className="py-10 px-4 text-center space-y-2 select-none">
              <p className="text-xs text-muted/80">
                This document is blank. Start by clicking any block below.
              </p>
            </div>
          ) : (
            blocks.map((block, idx) => (
              <BlockItem
                key={block.id || `b-${idx}`}
                block={block}
                index={idx}
                totalBlocks={blocks.length}
                onUpdateContent={handleUpdateContent}
                onDeleteBlock={handleDeleteBlock}
                onDuplicateBlock={handleDuplicateBlock}
                onMoveBlock={handleMoveBlock}
                onInsertBelow={handleInsertBelow}
              />
            ))
          )}
        </div>

        {/* Docked Compact Bottom Insertion Toolbar */}
        <div className="sticky bottom-4 pt-4 pb-2">
          <BlockInsertionToolbar onInsertBlock={handleAppendBlock} isDocked />
        </div>
      </div>
    </main>
  );
}

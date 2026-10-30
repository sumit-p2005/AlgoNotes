'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Folder,
  Star,
  FileText,
  FolderPlus,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronRight,
  Settings2,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function NotesListSidebar({
  notes = [],
  folders = [],
  activeNoteId,
  onSelectNote,
  onCreateNote,
  onToggleFavourite,
  onOpenFolderManager,
  selectedFolderId,
  onSelectFolderFilter,
  searchQuery,
  onSearchChange,
  className = '',
}) {
  const [foldersExpanded, setFoldersExpanded] = useState(true);

  // Counts
  const totalNotes = notes.length;
  const favouritesCount = notes.filter((n) => n.is_favourite).length;

  return (
    <aside
      className={`flex flex-col w-72 sm:w-80 border-r border-border bg-sidebar-secondary select-none shrink-0 h-full ${className}`}
    >
      {/* Top Header */}
      <div className="p-3.5 border-b border-border/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-foreground">My Notes</h2>
              <span className="text-[10px] text-muted">{totalNotes} total notes</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCreateNote}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs shadow-xs transition-colors cursor-pointer"
            title="Create new note (Alt+N)"
            aria-label="Create new note"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>New Note</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes or folders..."
            aria-label="Search notes"
            className="w-full pl-8.5 pr-3 py-1.5 rounded-xl border border-border/80 bg-panel text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {/* Navigation Filter Badges */}
      <div className="px-3 py-2 border-b border-border/60 space-y-0.5">
        <button
          type="button"
          onClick={() => onSelectFolderFilter(null)}
          className={cn(
            'w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors',
            selectedFolderId === null
              ? 'bg-accent/15 text-accent font-semibold'
              : 'text-muted hover:text-foreground hover:bg-panel'
          )}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>All Notes</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-panel border border-border/80">
            {totalNotes}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFolderFilter('favourites')}
          className={cn(
            'w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors',
            selectedFolderId === 'favourites'
              ? 'bg-accent/15 text-accent font-semibold'
              : 'text-muted hover:text-foreground hover:bg-panel'
          )}
        >
          <div className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>Favourites</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-panel border border-border/80">
            {favouritesCount}
          </span>
        </button>
      </div>

      {/* Folders Section */}
      <div className="px-3 py-2 border-b border-border/60">
        <div className="flex items-center justify-between py-1 text-xs text-muted">
          <button
            type="button"
            onClick={() => setFoldersExpanded(!foldersExpanded)}
            className="flex items-center gap-1.5 font-semibold text-muted hover:text-foreground transition-colors"
          >
            {foldersExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <span className="uppercase text-[10px] tracking-wider">Folders ({folders.length})</span>
          </button>

          <button
            type="button"
            onClick={onOpenFolderManager}
            className="p-1 rounded text-muted hover:text-accent hover:bg-panel transition-colors"
            title="Manage folders"
            aria-label="Manage folders"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {foldersExpanded && (
          <div className="space-y-0.5 mt-1 max-h-36 overflow-y-auto pr-0.5">
            {folders.length === 0 ? (
              <p className="text-[11px] text-muted/60 italic px-2 py-1">No custom folders</p>
            ) : (
              folders.map((f) => {
                const count = notes.filter((n) => n.folder_id === f.id).length;
                const isSelected = selectedFolderId === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onSelectFolderFilter(f.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors',
                      isSelected
                        ? 'bg-accent/15 text-accent font-semibold'
                        : 'text-muted hover:text-foreground hover:bg-panel'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Folder className="w-3.5 h-3.5 text-accent/80 shrink-0" />
                      <span className="truncate">{f.name}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-panel border border-border/80">
                      {count}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Notes List Scroll Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-muted">
            <FileText className="w-8 h-8 stroke-[1.5] text-muted/50 mb-2" />
            <p className="text-xs font-semibold text-foreground/80">No notes found</p>
            <p className="text-[11px] text-muted mt-1">
              {searchQuery ? 'Try another search query' : 'Create your first note to get started!'}
            </p>
            {!searchQuery && (
              <button
                type="button"
                onClick={onCreateNote}
                className="mt-3 px-3 py-1.5 rounded-xl bg-accent/20 border border-accent/40 text-accent text-xs font-bold hover:bg-accent/30 transition-colors"
              >
                + New Note
              </button>
            )}
          </div>
        ) : (
          notes.map((note) => {
            const isSelected = note.id === activeNoteId;
            const updatedDate = note.updated_at
              ? new Date(note.updated_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })
              : 'Recent';

            return (
              <div
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={cn(
                  'group relative p-3 rounded-xl border transition-all cursor-pointer text-left',
                  isSelected
                    ? 'border-accent/40 bg-accent/10 shadow-xs'
                    : 'border-border/60 bg-panel/60 hover:bg-panel hover:border-border'
                )}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <h3
                    className={cn(
                      'text-xs font-bold line-clamp-1 flex-1',
                      isSelected ? 'text-accent' : 'text-foreground group-hover:text-foreground'
                    )}
                  >
                    {note.title || 'Untitled Note'}
                  </h3>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavourite(note.id, !note.is_favourite);
                    }}
                    className="p-0.5 rounded text-muted hover:text-amber-400 transition-colors shrink-0"
                    aria-label={note.is_favourite ? 'Unstar note' : 'Star note'}
                  >
                    <Star
                      className={cn(
                        'w-3.5 h-3.5',
                        note.is_favourite
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-muted/60'
                      )}
                    />
                  </button>
                </div>

                {note.description && (
                  <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
                    {note.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] text-muted/80 pt-2 mt-1 border-t border-border/40">
                  <div className="flex items-center gap-1.5">
                    {note.folder?.name && (
                      <span className="px-1.5 py-0.2 rounded-md bg-elevated border border-border text-[9px] font-medium text-muted">
                        {note.folder.name}
                      </span>
                    )}
                    <span>{note.blocks_count || 0} blocks</span>
                  </div>

                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-muted" />
                    <span>{updatedDate}</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}


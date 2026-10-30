'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { NotesListSidebar } from './NotesListSidebar';
import { NoteCanvas } from './NoteCanvas';
import { FolderManageModal } from './FolderManageModal';
import { Menu, X } from 'lucide-react';

export function NotesWorkspace({ initialNotes = [], initialFolders = [], initialActiveNoteId = null }) {
  const router = useRouter();

  // Primary State
  const [notes, setNotes] = useState(initialNotes);
  const [folders, setFolders] = useState(initialFolders);
  const [activeNoteId, setActiveNoteId] = useState(
    initialActiveNoteId || (initialNotes[0] ? initialNotes[0].id : null)
  );
  const [activeNote, setActiveNote] = useState(null);
  const [loadingNote, setLoadingNote] = useState(false);

  // Filters & Search
  const [selectedFolderId, setSelectedFolderId] = useState(null); // null = all, 'favourites' = starred, uuid = specific
  const [searchQuery, setSearchQuery] = useState('');
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Autosave State
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved' | 'error'
  const [lastSavedAt, setLastSavedAt] = useState(null);

  // Undo / Redo History
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveTimeoutRef = useRef(null);
  const activeNoteRef = useRef(null);

  useEffect(() => {
    activeNoteRef.current = activeNote;
  }, [activeNote]);

  // 1. Fetch active note details (with blocks) when activeNoteId changes
  useEffect(() => {
    if (!activeNoteId) {
      setActiveNote(null);
      return;
    }

    let isMounted = true;
    async function loadNote() {
      setLoadingNote(true);
      try {
        const res = await fetch(`/api/notes/${activeNoteId}`);
        const data = await res.json();
        if (isMounted && data.success && data.note) {
          setActiveNote(data.note);
          setSaveStatus('saved');
          // Reset history for new note
          setHistory([data.note.blocks || []]);
          setHistoryIndex(0);
        }
      } catch (err) {
        console.error('Error loading note:', err);
      } finally {
        if (isMounted) setLoadingNote(false);
      }
    }

    loadNote();
    return () => {
      isMounted = false;
    };
  }, [activeNoteId]);

  // 2. Autosave Engine
  const performSave = useCallback(async (noteToSave) => {
    if (!noteToSave || !noteToSave.id) return;

    try {
      setSaveStatus('saving');
      const res = await fetch(`/api/notes/${noteToSave.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noteToSave.title,
          description: noteToSave.description,
          folder_id: noteToSave.folder_id,
          is_favourite: noteToSave.is_favourite,
          blocks: noteToSave.blocks || [],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Save failed');
      }

      setSaveStatus('saved');
      setLastSavedAt(new Date().toLocaleTimeString());

      // Update sidebar notes list snippet and title
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === noteToSave.id
            ? {
                ...n,
                title: noteToSave.title,
                description: noteToSave.description,
                folder_id: noteToSave.folder_id,
                is_favourite: noteToSave.is_favourite,
                blocks_count: noteToSave.blocks?.length || 0,
                updated_at: data.updated_at || new Date().toISOString(),
              }
            : n
        )
      );
    } catch (err) {
      console.error('Autosave failed:', err);
      setSaveStatus('error');
    }
  }, []);

  // Debounced Autosave Trigger
  const scheduleAutosave = useCallback(
    (updatedNote) => {
      setSaveStatus('unsaved');
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(() => {
        performSave(updatedNote);
      }, 800);
    },
    [performSave]
  );

  // 3. BeforeUnload Warning when Unsaved
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (saveStatus === 'unsaved' || saveStatus === 'saving') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus]);

  // 4. Create New Note
  const handleCreateNote = useCallback(async () => {
    try {
      const folderId = selectedFolderId && selectedFolderId !== 'favourites' ? selectedFolderId : null;
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Untitled Note',
          description: '',
          folderId,
          initialBlocks: [],
        }),
      });

      const data = await res.json();
      if (data.success && data.note) {
        setNotes((prev) => [data.note, ...prev]);
        setActiveNoteId(data.note.id);
        if (mobileSidebarOpen) setMobileSidebarOpen(false);
      }
    } catch (err) {
      console.error('Error creating note:', err);
    }
  }, [selectedFolderId, mobileSidebarOpen]);

  // 5. Keyboard shortcut Alt+N / Ctrl+Alt+N to create new note
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey && e.key.toLowerCase() === 'n') || (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'n')) {
        e.preventDefault();
        handleCreateNote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCreateNote]);

  // 6. Note Mutation Handlers
  const handleUpdateNoteMeta = (metaUpdates) => {
    if (!activeNote) return;
    const updated = { ...activeNote, ...metaUpdates };
    setActiveNote(updated);
    scheduleAutosave(updated);
  };

  const handleUpdateBlocks = (newBlocks) => {
    if (!activeNote) return;
    const updated = { ...activeNote, blocks: newBlocks };
    setActiveNote(updated);

    // Push to undo history
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newBlocks].slice(-25); // cap at 25 states
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 24));

    scheduleAutosave(updated);
  };

  // Undo & Redo Handlers
  const handleUndo = () => {
    if (historyIndex > 0 && activeNote) {
      const newIdx = historyIndex - 1;
      const prevBlocks = history[newIdx];
      setHistoryIndex(newIdx);
      const updated = { ...activeNote, blocks: prevBlocks };
      setActiveNote(updated);
      scheduleAutosave(updated);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1 && activeNote) {
      const newIdx = historyIndex + 1;
      const nextBlocks = history[newIdx];
      setHistoryIndex(newIdx);
      const updated = { ...activeNote, blocks: nextBlocks };
      setActiveNote(updated);
      scheduleAutosave(updated);
    }
  };

  // 7. Delete Note
  const handleDeleteNote = async () => {
    if (!activeNote) return;
    if (!window.confirm(`Delete note "${activeNote.title || 'Untitled Note'}"? This cannot be undone.`)) {
      return;
    }

    try {
      await fetch(`/api/notes/${activeNote.id}`, { method: 'DELETE' });
      const remaining = notes.filter((n) => n.id !== activeNote.id);
      setNotes(remaining);
      setActiveNoteId(remaining[0] ? remaining[0].id : null);
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  // 8. Toggle Favourite
  const handleToggleFavourite = async (noteId, isFav) => {
    try {
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, is_favourite: isFav } : n))
      );

      if (activeNote && activeNote.id === noteId) {
        setActiveNote((prev) => ({ ...prev, is_favourite: isFav }));
      }

      await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_favourite: isFav }),
      });
    } catch (err) {
      console.error('Error toggling favourite:', err);
    }
  };

  // 9. Folder Management Handlers
  const handleCreateFolder = async (name) => {
    try {
      const res = await fetch('/api/notes/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success && data.folder) {
        setFolders((prev) => [...prev, data.folder]);
      }
    } catch (err) {
      console.error('Error creating folder:', err);
    }
  };

  const handleRenameFolder = async (folderId, newName) => {
    try {
      const res = await fetch('/api/notes/folders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId, name: newName }),
      });
      const data = await res.json();
      if (data.success && data.folder) {
        setFolders((prev) =>
          prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
        );
      }
    } catch (err) {
      console.error('Error renaming folder:', err);
    }
  };

  const handleDeleteFolder = async (folderId, destinationFolderId) => {
    try {
      await fetch(
        `/api/notes/folders?folderId=${folderId}&destinationFolderId=${destinationFolderId || ''}`,
        { method: 'DELETE' }
      );
      setFolders((prev) => prev.filter((f) => f.id !== folderId));
      setNotes((prev) =>
        prev.map((n) =>
          n.folder_id === folderId ? { ...n, folder_id: destinationFolderId } : n
        )
      );
      if (selectedFolderId === folderId) setSelectedFolderId(null);
    } catch (err) {
      console.error('Error deleting folder:', err);
    }
  };

  // Filtered Notes List
  const filteredNotes = notes.filter((n) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = n.title && n.title.toLowerCase().includes(q);
      const matchDesc = n.description && n.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    // 2. Folder / Favourite
    if (selectedFolderId === 'favourites') {
      return n.is_favourite;
    }
    if (selectedFolderId !== null) {
      return n.folder_id === selectedFolderId;
    }
    return true;
  });

  return (
    <div className="flex-1 flex h-full relative overflow-hidden bg-page">
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Notes & Folders Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 md:static transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <NotesListSidebar
          notes={filteredNotes}
          folders={folders}
          activeNoteId={activeNoteId}
          onSelectNote={(id) => {
            setActiveNoteId(id);
            if (mobileSidebarOpen) setMobileSidebarOpen(false);
          }}
          onCreateNote={handleCreateNote}
          onToggleFavourite={handleToggleFavourite}
          onOpenFolderManager={() => setFolderModalOpen(true)}
          selectedFolderId={selectedFolderId}
          onSelectFolderFilter={(fId) => setSelectedFolderId(fId)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Mobile Toggle Button on small screens */}
        <div className="md:hidden flex items-center justify-between px-4 py-2 border-b border-border bg-page">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-panel"
            aria-label="Toggle notes navigation"
          >
            <Menu className="w-4 h-4 text-accent" />
            <span>Notes List ({notes.length})</span>
          </button>

          <span className="text-xs font-bold text-foreground truncate max-w-[200px]">
            {activeNote?.title || 'My Notes'}
          </span>
        </div>

        {loadingNote ? (
          <div className="flex-1 flex items-center justify-center p-12 text-center text-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping mr-2" />
            <span className="text-xs">Loading note...</span>
          </div>
        ) : (
          <NoteCanvas
            note={activeNote}
            folders={folders}
            onUpdateNoteMeta={handleUpdateNoteMeta}
            onUpdateBlocks={handleUpdateBlocks}
            onDeleteNote={handleDeleteNote}
            saveStatus={saveStatus}
            lastSavedAt={lastSavedAt}
            onRetrySave={() => performSave(activeNoteRef.current)}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />
        )}
      </div>

      {/* Folder Management Modal */}
      <FolderManageModal
        isOpen={folderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        folders={folders}
        onCreateFolder={handleCreateFolder}
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
      />
    </div>
  );
}

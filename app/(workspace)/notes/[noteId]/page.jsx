'use client';

import React, { useState, useEffect, use } from 'react';
import { NotesWorkspace } from '@/components/notes/NotesWorkspace';

export default function NoteDetailPage({ params }) {
  const unwrappedParams = use(params);
  const noteId = unwrappedParams.noteId;

  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [notesRes, foldersRes] = await Promise.all([
          fetch('/api/notes'),
          fetch('/api/notes/folders'),
        ]);

        const notesData = await notesRes.json();
        const foldersData = await foldersRes.json();

        if (isMounted) {
          if (notesData.success && notesData.notes) {
            setNotes(notesData.notes);
          }
          if (foldersData.success && foldersData.folders) {
            setFolders(foldersData.folders);
          }
        }
      } catch (err) {
        console.error('Failed to load note data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 bg-page text-muted">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
          <span>Opening note...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-3.25rem)] overflow-hidden">
      <NotesWorkspace
        initialNotes={notes}
        initialFolders={folders}
        initialActiveNoteId={noteId}
      />
    </div>
  );
}


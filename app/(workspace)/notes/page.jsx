'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NotesWorkspace } from '@/components/notes/NotesWorkspace';

function NotesPageContent() {
  const searchParams = useSearchParams();
  const folderParam = searchParams.get('folder');
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
        console.error('Failed to load notes workspace data:', err);
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
          <span>Opening My Notes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-3.25rem)] overflow-hidden">
      <NotesWorkspace
        initialNotes={notes}
        initialFolders={folders}
        initialActiveNoteId={notes[0]?.id || null}
      />
    </div>
  );
}

export default function NotesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12 bg-page text-muted">
          <span className="text-xs">Loading notes workspace...</span>
        </div>
      }
    >
      <NotesPageContent />
    </Suspense>
  );
}

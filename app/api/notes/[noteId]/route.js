import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getNoteById, saveNoteWithBlocks, deleteNote } from '@/lib/notes/service';

export async function GET(request, { params }) {
  try {
    const { noteId } = await params;
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const note = await getNoteById(userId, noteId);
    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, note });
  } catch (err) {
    console.error('Error fetching note:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { noteId } = await params;
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const body = await request.json().catch(() => ({}));
    const result = await saveNoteWithBlocks(userId, noteId, body);

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('Error saving note:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { noteId } = await params;
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    await deleteNote(userId, noteId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting note:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

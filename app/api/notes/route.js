import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserNotes, createNote } from '@/lib/notes/service';

export async function GET(request) {
  try {
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId') || undefined;
    const isFavourite = searchParams.get('favourite') === 'true' ? true : undefined;
    const searchQuery = searchParams.get('search') || undefined;

    const notes = await getUserNotes(userId, { folderId, isFavourite, searchQuery });
    return NextResponse.json({ success: true, notes });
  } catch (err) {
    console.error('Error fetching notes:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const body = await request.json().catch(() => ({}));
    const { title = 'Untitled Note', description = '', folderId = null, initialBlocks = [] } = body;

    const note = await createNote(userId, {
      title,
      description,
      folderId,
      initialBlocks,
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (err) {
    console.error('Error creating note:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

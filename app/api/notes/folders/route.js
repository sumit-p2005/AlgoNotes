import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  getUserFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from '@/lib/notes/service';

export async function GET() {
  try {
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const folders = await getUserFolders(userId);
    return NextResponse.json({ success: true, folders });
  } catch (err) {
    console.error('Error fetching folders:', err);
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
    const { name, parentId } = body;

    const folder = await createFolder(userId, name, parentId);
    return NextResponse.json({ success: true, folder }, { status: 201 });
  } catch (err) {
    console.error('Error creating folder:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const body = await request.json().catch(() => ({}));
    const { folderId, name, parentId } = body;

    const updated = await updateFolder(userId, folderId, { name, parentId });
    return NextResponse.json({ success: true, folder: updated });
  } catch (err) {
    console.error('Error updating folder:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    let userId = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId');
    const destinationFolderId = searchParams.get('destinationFolderId') || null;

    if (!folderId) {
      return NextResponse.json({ success: false, error: 'folderId is required' }, { status: 400 });
    }

    await deleteFolder(userId, folderId, destinationFolderId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting folder:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

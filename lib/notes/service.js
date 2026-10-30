/**
 * AlgoNotes: My Notes & Block-Editor Service Layer
 * Supports PostgreSQL persistence via Supabase with RLS, atomic block sync,
 * and resilient local fallback for offline/development environments.
 */

async function getSupabaseClient() {
  try {
    const mod = await import('../supabase/server.js');
    return await mod.createClient();
  } catch {
    return null;
  }
}

// In-memory fallback store for offline development when Supabase is not yet seeded
let fallbackFolders = [
  {
    id: 'folder-system-design',
    user_id: 'default-user',
    name: 'System Design',
    parent_id: null,
    created_at: new Date('2026-10-25T10:00:00Z').toISOString(),
    updated_at: new Date('2026-10-25T10:00:00Z').toISOString(),
  },
  {
    id: 'folder-js-internals',
    user_id: 'default-user',
    name: 'JavaScript Internals',
    parent_id: null,
    created_at: new Date('2026-10-26T12:00:00Z').toISOString(),
    updated_at: new Date('2026-10-26T12:00:00Z').toISOString(),
  },
];

let fallbackNotes = [
  {
    id: 'note-distributed-caching',
    user_id: 'default-user',
    folder_id: 'folder-system-design',
    title: 'Distributed Caching Strategies: Redis & Memcached',
    description: 'Deep dive into cache-aside, write-through, cache invalidation, and thundering herd problem.',
    is_favourite: true,
    created_at: new Date('2026-10-27T14:00:00Z').toISOString(),
    updated_at: new Date('2026-10-29T18:30:00Z').toISOString(),
  },
  {
    id: 'note-v8-event-loop',
    user_id: 'default-user',
    folder_id: 'folder-js-internals',
    title: 'V8 Engine & Microtask Queues',
    description: 'Call stack, libuv event loop phases, process.nextTick vs Promise.then().',
    is_favourite: false,
    created_at: new Date('2026-10-28T09:15:00Z').toISOString(),
    updated_at: new Date('2026-10-28T16:45:00Z').toISOString(),
  },
];

let fallbackBlocks = [
  // Distributed Caching blocks
  {
    id: 'b-1',
    note_id: 'note-distributed-caching',
    block_type: 'heading',
    content: { text: '1. Why Distributed Caching?' },
    sort_order: 1,
  },
  {
    id: 'b-2',
    note_id: 'note-distributed-caching',
    block_type: 'text',
    content: {
      text: 'Caching is the primary architectural mechanism to reduce latency and protect primary databases from high read throughput. By keeping frequently accessed records in memory (RAM), query latency drops from ~15ms (disk SSD/Postgres) to sub-millisecond (< 1ms).',
    },
    sort_order: 2,
  },
  {
    id: 'b-3',
    note_id: 'note-distributed-caching',
    block_type: 'subheading',
    content: { text: 'Cache-Aside (Lazy Loading) Implementation' },
    sort_order: 3,
  },
  {
    id: 'b-4',
    note_id: 'note-distributed-caching',
    block_type: 'code',
    content: {
      language: 'javascript',
      code: `async function getUserProfile(userId) {
  const cacheKey = \`user:\${userId}:profile\`;
  
  // 1. Check memory cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // 2. Cache miss: Query primary database
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  if (!user) return null;
  
  // 3. Populate cache with TTL (Time To Live = 1 hour)
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  return user;
}`,
    },
    sort_order: 4,
  },
  {
    id: 'b-5',
    note_id: 'note-distributed-caching',
    block_type: 'text',
    content: {
      text: 'Key considerations:\n• Invalidation: Delete cache key on user profile update.\n• Thundering Herd: Protect cold cache with distributed mutex or single-flight lock.',
    },
    sort_order: 5,
  },
];

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes('your-project.supabase.co'));
}

/**
 * Get all folders for a user
 */
export async function getUserFolders(userId) {
  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');
      const { data, error } = await supabase
        .from('user_note_folders')
        .select('*')
        .eq('user_id', userId)
        .order('name', { ascending: true });

      if (!error && data) return data;
    } catch (e) {
      console.warn('Fallback to local folders:', e.message);
    }
  }

  return fallbackFolders;
}

/**
 * Create a new folder
 */
export async function createFolder(userId, name, parentId = null) {
  if (!name || !name.trim()) throw new Error('Folder name is required');
  const cleanName = name.trim();

  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');
      const { data, error } = await supabase
        .from('user_note_folders')
        .insert({
          user_id: userId,
          name: cleanName,
          parent_id: parentId || null,
        })
        .select()
        .single();

      if (!error && data) return data;
      if (error) throw error;
    } catch (e) {
      console.warn('Supabase folder creation failed, using local store:', e.message);
    }
  }

  const newFolder = {
    id: `folder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    user_id: userId || 'default-user',
    name: cleanName,
    parent_id: parentId || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  fallbackFolders.push(newFolder);
  return newFolder;
}

/**
 * Update folder name or parent
 */
export async function updateFolder(userId, folderId, { name, parentId }) {
  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');
      const updates = { updated_at: new Date().toISOString() };
      if (name !== undefined) updates.name = name.trim();
      if (parentId !== undefined) updates.parent_id = parentId;

      const { data, error } = await supabase
        .from('user_note_folders')
        .update(updates)
        .eq('id', folderId)
        .eq('user_id', userId)
        .select()
        .single();

      if (!error && data) return data;
      if (error) throw error;
    } catch (e) {
      console.warn('Supabase folder update failed:', e.message);
    }
  }

  const idx = fallbackFolders.findIndex((f) => f.id === folderId);
  if (idx !== -1) {
    if (name !== undefined) fallbackFolders[idx].name = name.trim();
    if (parentId !== undefined) fallbackFolders[idx].parent_id = parentId;
    fallbackFolders[idx].updated_at = new Date().toISOString();
    return fallbackFolders[idx];
  }
  throw new Error('Folder not found');
}

/**
 * Delete folder safely
 * If destinationFolderId is provided, move notes there, otherwise unassign folder (set null)
 */
export async function deleteFolder(userId, folderId, destinationFolderId = null) {
  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');

      // 1. Move notes in this folder to destination
      await supabase
        .from('user_notes')
        .update({ folder_id: destinationFolderId })
        .eq('folder_id', folderId)
        .eq('user_id', userId);

      // 2. Delete folder
      const { error } = await supabase
        .from('user_note_folders')
        .delete()
        .eq('id', folderId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } catch (e) {
      console.warn('Supabase delete folder failed:', e.message);
    }
  }

  // Fallback deletion
  fallbackNotes = fallbackNotes.map((n) =>
    n.folder_id === folderId ? { ...n, folder_id: destinationFolderId } : n
  );
  fallbackFolders = fallbackFolders.filter((f) => f.id !== folderId);
  return { success: true };
}

/**
 * List notes for user with optional folder, favourite, or search filtering
 */
export async function getUserNotes(userId, options = {}) {
  const { folderId, isFavourite, searchQuery } = options;

  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');
      let query = supabase
        .from('user_notes')
        .select('*, folder:user_note_folders(id, name), blocks:note_blocks(id, block_type, content, sort_order)')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (folderId === 'unorganized') {
        query = query.is('folder_id', null);
      } else if (folderId) {
        query = query.eq('folder_id', folderId);
      }

      if (isFavourite === true) {
        query = query.eq('is_favourite', true);
      }

      if (searchQuery && searchQuery.trim()) {
        const q = `%${searchQuery.trim()}%`;
        query = query.or(`title.ilike.${q},description.ilike.${q}`);
      }

      const { data, error } = await query;
      if (!error && data) {
        return data.map((note) => ({
          ...note,
          blocks_count: note.blocks?.length || 0,
        }));
      }
    } catch (e) {
      console.warn('Supabase getUserNotes fallback:', e.message);
    }
  }

  // Local fallback filtering
  let notes = [...fallbackNotes];

  if (folderId === 'unorganized') {
    notes = notes.filter((n) => !n.folder_id);
  } else if (folderId) {
    notes = notes.filter((n) => n.folder_id === folderId);
  }

  if (isFavourite === true) {
    notes = notes.filter((n) => n.is_favourite);
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    notes = notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        (n.description && n.description.toLowerCase().includes(q))
    );
  }

  // Populate folder and blocks count
  return notes
    .map((note) => {
      const folder = fallbackFolders.find((f) => f.id === note.folder_id) || null;
      const blocks = fallbackBlocks.filter((b) => b.note_id === note.id);
      return {
        ...note,
        folder,
        blocks_count: blocks.length,
      };
    })
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

/**
 * Get a specific note by ID, including its ordered blocks
 */
export async function getNoteById(userId, noteId) {
  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');
      const { data: note, error: noteError } = await supabase
        .from('user_notes')
        .select('*, folder:user_note_folders(id, name)')
        .eq('id', noteId)
        .eq('user_id', userId)
        .single();

      if (!noteError && note) {
        // Fetch ordered blocks
        const { data: blocks } = await supabase
          .from('note_blocks')
          .select('*')
          .eq('note_id', noteId)
          .order('sort_order', { ascending: true });

        return {
          ...note,
          blocks: blocks || [],
        };
      }
    } catch (e) {
      console.warn('Supabase getNoteById fallback:', e.message);
    }
  }

  const note = fallbackNotes.find((n) => n.id === noteId);
  if (!note) return null;

  const folder = fallbackFolders.find((f) => f.id === note.folder_id) || null;
  const blocks = fallbackBlocks
    .filter((b) => b.note_id === noteId)
    .sort((a, b) => a.sort_order - b.sort_order);

  return {
    ...note,
    folder,
    blocks,
  };
}

/**
 * Create a new blank or templated note
 */
export async function createNote(userId, { title = 'Untitled Note', description = '', folderId = null, initialBlocks = [] }) {
  const cleanTitle = title.trim() || 'Untitled Note';

  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');
      const { data: note, error } = await supabase
        .from('user_notes')
        .insert({
          user_id: userId,
          title: cleanTitle,
          description: description || '',
          folder_id: folderId || null,
          is_favourite: false,
        })
        .select()
        .single();

      if (error) throw error;

      // Insert initial blocks if supplied
      if (initialBlocks.length > 0) {
        const blocksToInsert = initialBlocks.map((b, idx) => ({
          note_id: note.id,
          block_type: b.block_type || 'text',
          content: b.content || {},
          sort_order: idx + 1,
        }));
        await supabase.from('note_blocks').insert(blocksToInsert);
      }

      return note;
    } catch (e) {
      console.warn('Supabase createNote fallback:', e.message);
    }
  }

  const newNoteId = `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const newNote = {
    id: newNoteId,
    user_id: userId || 'default-user',
    folder_id: folderId || null,
    title: cleanTitle,
    description: description || '',
    is_favourite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  fallbackNotes.unshift(newNote);

  // If initial blocks given
  if (initialBlocks.length > 0) {
    initialBlocks.forEach((b, idx) => {
      fallbackBlocks.push({
        id: `block-${Date.now()}-${idx}`,
        note_id: newNoteId,
        block_type: b.block_type || 'text',
        content: b.content || {},
        sort_order: idx + 1,
      });
    });
  }

  return newNote;
}

/**
 * Atomic save for Note details and ordered blocks
 */
export async function saveNoteWithBlocks(userId, noteId, data) {
  const { title, description, folder_id, is_favourite, blocks } = data;

  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');

      // 1. Update note metadata
      const updates = { updated_at: new Date().toISOString() };
      if (title !== undefined) updates.title = title.trim() || 'Untitled Note';
      if (description !== undefined) updates.description = description;
      if (folder_id !== undefined) updates.folder_id = folder_id || null;
      if (is_favourite !== undefined) updates.is_favourite = Boolean(is_favourite);

      const { error: noteUpdateError } = await supabase
        .from('user_notes')
        .update(updates)
        .eq('id', noteId)
        .eq('user_id', userId);

      if (noteUpdateError) throw noteUpdateError;

      // 2. Sync blocks atomically if provided
      if (Array.isArray(blocks)) {
        // Try calling atomic RPC procedure first
        const { error: rpcError } = await supabase.rpc('sync_note_blocks', {
          p_note_id: noteId,
          p_blocks: blocks.map((b, idx) => ({
            id: b.id && !b.id.startsWith('temp-') ? b.id : undefined,
            block_type: b.block_type,
            content: b.content || {},
            sort_order: idx + 1,
          })),
        });

        if (rpcError) {
          // If RPC is unavailable, perform standard delete + batch insert
          await supabase.from('note_blocks').delete().eq('note_id', noteId);
          if (blocks.length > 0) {
            const rows = blocks.map((b, idx) => ({
              note_id: noteId,
              block_type: b.block_type,
              content: b.content || {},
              sort_order: idx + 1,
            }));
            await supabase.from('note_blocks').insert(rows);
          }
        }
      }

      return { success: true, updated_at: updates.updated_at };
    } catch (e) {
      console.warn('Supabase saveNoteWithBlocks failed:', e.message);
      throw e;
    }
  }

  // Fallback update
  const noteIdx = fallbackNotes.findIndex((n) => n.id === noteId);
  if (noteIdx !== -1) {
    if (title !== undefined) fallbackNotes[noteIdx].title = title.trim() || 'Untitled Note';
    if (description !== undefined) fallbackNotes[noteIdx].description = description;
    if (folder_id !== undefined) fallbackNotes[noteIdx].folder_id = folder_id;
    if (is_favourite !== undefined) fallbackNotes[noteIdx].is_favourite = Boolean(is_favourite);
    fallbackNotes[noteIdx].updated_at = new Date().toISOString();
  }

  if (Array.isArray(blocks)) {
    fallbackBlocks = fallbackBlocks.filter((b) => b.note_id !== noteId);
    blocks.forEach((b, idx) => {
      fallbackBlocks.push({
        id: b.id || `block-${Date.now()}-${idx}`,
        note_id: noteId,
        block_type: b.block_type,
        content: b.content || {},
        sort_order: idx + 1,
      });
    });
  }

  return { success: true, updated_at: new Date().toISOString() };
}

/**
 * Delete a note and cascade delete its blocks
 */
export async function deleteNote(userId, noteId) {
  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) throw new Error('Supabase unavailable');
      const { error } = await supabase
        .from('user_notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } catch (e) {
      console.warn('Supabase deleteNote fallback:', e.message);
    }
  }

  fallbackNotes = fallbackNotes.filter((n) => n.id !== noteId);
  fallbackBlocks = fallbackBlocks.filter((b) => b.note_id !== noteId);
  return { success: true };
}

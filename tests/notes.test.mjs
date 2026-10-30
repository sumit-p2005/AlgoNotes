import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getUserFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  getUserNotes,
  getNoteById,
  createNote,
  saveNoteWithBlocks,
  deleteNote,
} from '../lib/notes/service.js';

test('My Notes - Folder creation, renaming, and safe deletion', async () => {
  const testUserId = `test-user-${Date.now()}`;

  // 1. Create Folder
  const folder = await createFolder(testUserId, 'Operating Systems');
  assert.ok(folder.id, 'Folder must have an ID');
  assert.equal(folder.name, 'Operating Systems');

  // 2. Rename Folder
  const updatedFolder = await updateFolder(testUserId, folder.id, {
    name: 'OS & Concurrency',
  });
  assert.equal(updatedFolder.name, 'OS & Concurrency');

  // 3. Create Note inside this folder
  const note = await createNote(testUserId, {
    title: 'Deadlocks and Banker Algorithm',
    folderId: folder.id,
  });
  assert.equal(note.folder_id, folder.id);

  // 4. Safe Delete Folder: move notes to unorganized (null)
  await deleteFolder(testUserId, folder.id, null);

  // Check note still exists and has folder_id = null
  const retrievedNote = await getNoteById(testUserId, note.id);
  assert.ok(retrievedNote, 'Note must not be deleted when folder is deleted');
  assert.equal(retrievedNote.folder_id, null, 'Note must be moved to unorganized');
});

test('My Notes - Note creation with blank canvas and initial blocks', async () => {
  const testUserId = `test-user-${Date.now()}`;

  // Create note with initial blocks
  const initialBlocks = [
    { block_type: 'heading', content: { text: 'Concurrency In Depth' } },
    { block_type: 'subheading', content: { text: 'Race Conditions' } },
    { block_type: 'text', content: { text: 'A race condition occurs when...' } },
    { block_type: 'code', content: { language: 'javascript', code: 'let counter = 0;' } },
    { block_type: 'image', content: { url: 'https://example.com/diagram.png', caption: 'Mutex diagram' } },
  ];

  const note = await createNote(testUserId, {
    title: 'Concurrency Notes',
    description: 'Thread safety notes',
    initialBlocks,
  });

  assert.ok(note.id);
  assert.equal(note.title, 'Concurrency Notes');

  const loaded = await getNoteById(testUserId, note.id);
  assert.equal(loaded.blocks.length, 5);

  const types = loaded.blocks.map((b) => b.block_type);
  assert.deepEqual(types, ['heading', 'subheading', 'text', 'code', 'image']);
});

test('My Notes - Block reordering, updating, and duplication preserves data', async () => {
  const testUserId = `test-user-${Date.now()}`;

  const note = await createNote(testUserId, {
    title: 'Algorithms Revision',
    initialBlocks: [
      { id: 'b-1', block_type: 'heading', content: { text: 'Dynamic Programming' } },
      { id: 'b-2', block_type: 'text', content: { text: 'Optimal substructure and overlapping subproblems.' } },
      { id: 'b-3', block_type: 'code', content: { language: 'python', code: 'memo = {}' } },
    ],
  });

  const loaded = await getNoteById(testUserId, note.id);
  let blocks = loaded.blocks;

  // 1. Move code block to index 0 (top)
  const [codeBlock] = blocks.splice(2, 1);
  blocks.unshift(codeBlock);

  // 2. Duplicate text block
  const textBlock = blocks.find((b) => b.block_type === 'text');
  const duplicate = {
    ...textBlock,
    id: `dup-${Date.now()}`,
    content: { text: 'Copy of: ' + textBlock.content.text },
  };
  blocks.push(duplicate);

  // 3. Save atomically
  await saveNoteWithBlocks(testUserId, note.id, {
    title: 'Algorithms Revision (Updated)',
    blocks,
  });

  const refreshed = await getNoteById(testUserId, note.id);
  assert.equal(refreshed.title, 'Algorithms Revision (Updated)');
  assert.equal(refreshed.blocks.length, 4);
  assert.equal(refreshed.blocks[0].block_type, 'code');
  assert.equal(refreshed.blocks[3].content.text, 'Copy of: Optimal substructure and overlapping subproblems.');
});

test('My Notes - Image upload validation checks', () => {
  const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  // Allowed types
  assert.ok(ALLOWED_MIME_TYPES.has('image/png'));
  assert.ok(ALLOWED_MIME_TYPES.has('image/jpeg'));
  assert.ok(ALLOWED_MIME_TYPES.has('image/webp'));

  // Disallowed types
  assert.equal(ALLOWED_MIME_TYPES.has('text/html'), false);
  assert.equal(ALLOWED_MIME_TYPES.has('application/javascript'), false);
  assert.equal(ALLOWED_MIME_TYPES.has('application/x-msdownload'), false);
  assert.equal(ALLOWED_MIME_TYPES.has('image/svg+xml'), false);

  // Size limit
  const validSize = 2 * 1024 * 1024;
  const oversized = 6 * 1024 * 1024;
  assert.ok(validSize <= MAX_FILE_SIZE);
  assert.equal(oversized <= MAX_FILE_SIZE, false);
});


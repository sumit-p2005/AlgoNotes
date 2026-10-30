-- Supabase Migration: 004_my_notes_blocks.sql
-- AlgoNotes: Free-Form Block-Based Note Editor (My Notes)

-- 1. USER NOTE FOLDERS
create table if not exists public.user_note_folders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  parent_id uuid references public.user_note_folders(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index on user_id and parent_id
create index if not exists idx_user_note_folders_user on public.user_note_folders(user_id);
create index if not exists idx_user_note_folders_parent on public.user_note_folders(parent_id);

-- Enable RLS on user_note_folders
alter table public.user_note_folders enable row level security;

create policy "Users can manage their own note folders"
  on public.user_note_folders
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 2. USER NOTES
create table if not exists public.user_notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  folder_id uuid references public.user_note_folders(id) on delete set null,
  title text not null default 'Untitled Note',
  description text default '',
  is_favourite boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_user_notes_user on public.user_notes(user_id);
create index if not exists idx_user_notes_folder on public.user_notes(folder_id);
create index if not exists idx_user_notes_favourite on public.user_notes(user_id, is_favourite);
create index if not exists idx_user_notes_updated on public.user_notes(user_id, updated_at desc);

-- Enable RLS on user_notes
alter table public.user_notes enable row level security;

create policy "Users can manage their own notes"
  on public.user_notes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3. NOTE BLOCKS
create table if not exists public.note_blocks (
  id uuid default gen_random_uuid() primary key,
  note_id uuid references public.user_notes(id) on delete cascade not null,
  block_type text not null check (block_type in ('heading', 'subheading', 'text', 'code', 'image')),
  content jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for ordering and relation
create index if not exists idx_note_blocks_note on public.note_blocks(note_id);
create index if not exists idx_note_blocks_order on public.note_blocks(note_id, sort_order asc);

-- Enable RLS on note_blocks
alter table public.note_blocks enable row level security;

create policy "Users can manage blocks for their own notes"
  on public.note_blocks
  for all
  using (
    exists (
      select 1 from public.user_notes
      where user_notes.id = note_blocks.note_id
        and user_notes.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.user_notes
      where user_notes.id = note_blocks.note_id
        and user_notes.user_id = auth.uid()
    )
  );

-- 4. ATOMIC BLOCK SYNC FUNCTION
-- Replaces all blocks for a note in a single transaction
create or replace function public.sync_note_blocks(
  p_note_id uuid,
  p_blocks jsonb
)
returns void
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_block record;
begin
  -- Verify note ownership
  select user_id into v_user_id
  from public.user_notes
  where id = p_note_id;

  if v_user_id is null or v_user_id != auth.uid() then
    raise exception 'Unauthorized or note not found';
  end if;

  -- Delete existing blocks for this note
  delete from public.note_blocks where note_id = p_note_id;

  -- Insert new blocks from jsonb array
  insert into public.note_blocks (id, note_id, block_type, content, sort_order)
  select
    coalesce((b->>'id')::uuid, gen_random_uuid()),
    p_note_id,
    b->>'block_type',
    coalesce(b->'content', '{}'::jsonb),
    coalesce((b->>'sort_order')::int, 0)
  from jsonb_array_elements(p_blocks) with ordinality as t(b, idx);

  -- Update note updated_at timestamp
  update public.user_notes
  set updated_at = now()
  where id = p_note_id;
end;
$$;

-- 5. STORAGE BUCKET FOR USER NOTE IMAGES
insert into storage.buckets (id, name, public)
values ('user-note-images', 'user-note-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Authenticated users can upload note images to their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'user-note-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update and delete their own note images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'user-note-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own note images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'user-note-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Note images are publicly viewable"
  on storage.objects for select
  to public
  using (bucket_id = 'user-note-images');


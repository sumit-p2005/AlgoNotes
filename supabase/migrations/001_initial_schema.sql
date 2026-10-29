-- Supabase Migration: 001_initial_schema.sql
-- AlgoNotes: Full-Stack DSA Learning & Revision Platform

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  display_name text,
  avatar_url text,
  preferred_language text default 'javascript',
  theme text default 'system',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. USER SETTINGS TABLE
create table if not exists public.user_settings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  daily_review_goal int default 10,
  intervals jsonb default '{"day1": 1, "day2": 7, "day3": 21, "day4": 45}'::jsonb,
  preferred_code_language text default 'javascript',
  enable_daily_reminder boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. TOPICS TABLE (Hierarchical)
create table if not exists public.topics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  parent_id uuid references public.topics(id) on delete cascade,
  name text not null,
  description text default '',
  order_index int default 0,
  icon text default 'Folder',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Function to prevent circular folder nesting
create or replace function public.check_topic_circular_dependency()
returns trigger as $$
declare
  curr_parent uuid;
begin
  if new.parent_id is null then
    return new;
  end if;
  if new.parent_id = new.id then
    raise exception 'A topic cannot be its own parent';
  end if;
  
  curr_parent := new.parent_id;
  while curr_parent is not null loop
    if curr_parent = new.id then
      raise exception 'Circular topic hierarchy detected';
    end if;
    select parent_id into curr_parent from public.topics where id = curr_parent;
  end loop;
  
  return new;
end;
$$ language plpgsql;

create or replace trigger trg_check_topic_circular
before insert or update of parent_id on public.topics
for each row execute function public.check_topic_circular_dependency();

-- 4. PATTERNS TABLE
create table if not exists public.patterns (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text default '',
  recognition_clues text default '',
  when_to_use text default '',
  when_not_to_use text default '',
  algorithmic_intuition text default '',
  common_mistakes text default '',
  complexity_considerations text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. PROBLEMS TABLE
create table if not exists public.problems (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  topic_id uuid references public.topics(id) on delete set null,
  subtopic_id uuid references public.topics(id) on delete set null,
  title text not null,
  problem_number text default '',
  external_url text default '',
  difficulty text default 'Medium' check (difficulty in ('Easy', 'Medium', 'Hard')),
  status text default 'Saved' check (status in ('Saved', 'Attempted', 'Solved')),
  summary text default '',
  recognition_clues text default '',
  key_points text default '',
  brute_force_approach text default '',
  optimised_approach text default '',
  code text default '',
  language text default 'javascript',
  time_complexity text default '',
  space_complexity text default '',
  common_mistakes text default '',
  edge_cases text default '',
  additional_notes text default '',
  personal_notes text default '',
  tags text[] default '{}',
  confidence_rating int default 3 check (confidence_rating between 1 and 5),
  is_bookmarked boolean default false,
  is_learned boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. PROBLEM PATTERNS (Many-to-Many)
create table if not exists public.problem_patterns (
  problem_id uuid references public.problems(id) on delete cascade not null,
  pattern_id uuid references public.patterns(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (problem_id, pattern_id)
);

-- 7. PROBLEM REVIEW SCHEDULES (Spaced Repetition Engine)
create table if not exists public.problem_review_schedules (
  id uuid default gen_random_uuid() primary key,
  problem_id uuid references public.problems(id) on delete cascade not null unique,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stage int default 0,
  learning_date timestamptz default now() not null,
  last_reviewed_at timestamptz,
  next_review_at timestamptz not null,
  review_count int default 0,
  last_rating text check (last_rating in ('Forgot', 'Difficult', 'Good', 'Easy')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. PROBLEM REVIEW HISTORY
create table if not exists public.problem_review_history (
  id uuid default gen_random_uuid() primary key,
  problem_id uuid references public.problems(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  rating text not null check (rating in ('Forgot', 'Difficult', 'Good', 'Easy')),
  stage_before int default 0,
  stage_after int default 0,
  reviewed_at timestamptz default now() not null,
  notes text default '',
  recalled_pattern text default '',
  recalled_idea text default '',
  code_attempt text default ''
);

-- 9. BOOKMARKS TABLE
create table if not exists public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  problem_id uuid references public.problems(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (user_id, problem_id)
);

-- 10. ACTIVITY EVENTS TABLE
create table if not exists public.activity_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_type text not null,
  problem_id uuid references public.problems(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- INDEXES FOR PERFORMANCE
create index if not exists idx_topics_user_id on public.topics(user_id);
create index if not exists idx_topics_parent_id on public.topics(parent_id);
create index if not exists idx_patterns_user_id on public.patterns(user_id);
create index if not exists idx_problems_user_id on public.problems(user_id);
create index if not exists idx_problems_topic_id on public.problems(topic_id);
create index if not exists idx_problems_status on public.problems(status);
create index if not exists idx_problems_difficulty on public.problems(difficulty);
create index if not exists idx_problem_patterns_problem on public.problem_patterns(problem_id);
create index if not exists idx_problem_patterns_pattern on public.problem_patterns(pattern_id);
create index if not exists idx_review_schedules_user on public.problem_review_schedules(user_id);
create index if not exists idx_review_schedules_next_review on public.problem_review_schedules(next_review_at);
create index if not exists idx_review_history_user on public.problem_review_history(user_id);
create index if not exists idx_review_history_problem on public.problem_review_history(problem_id);
create index if not exists idx_bookmarks_user on public.bookmarks(user_id);
create index if not exists idx_activity_events_user on public.activity_events(user_id, created_at desc);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.topics enable row level security;
alter table public.patterns enable row level security;
alter table public.problems enable row level security;
alter table public.problem_patterns enable row level security;
alter table public.problem_review_schedules enable row level security;
alter table public.problem_review_history enable row level security;
alter table public.bookmarks enable row level security;
alter table public.activity_events enable row level security;

-- PROFILES RLS
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- USER SETTINGS RLS
create policy "Users can view own settings" on public.user_settings
  for select using (auth.uid() = user_id);
create policy "Users can insert own settings" on public.user_settings
  for insert with check (auth.uid() = user_id);
create policy "Users can update own settings" on public.user_settings
  for update using (auth.uid() = user_id);

-- TOPICS RLS
create policy "Users can view own topics" on public.topics
  for select using (auth.uid() = user_id);
create policy "Users can insert own topics" on public.topics
  for insert with check (auth.uid() = user_id);
create policy "Users can update own topics" on public.topics
  for update using (auth.uid() = user_id);
create policy "Users can delete own topics" on public.topics
  for delete using (auth.uid() = user_id);

-- PATTERNS RLS
create policy "Users can view own patterns" on public.patterns
  for select using (auth.uid() = user_id);
create policy "Users can insert own patterns" on public.patterns
  for insert with check (auth.uid() = user_id);
create policy "Users can update own patterns" on public.patterns
  for update using (auth.uid() = user_id);
create policy "Users can delete own patterns" on public.patterns
  for delete using (auth.uid() = user_id);

-- PROBLEMS RLS
create policy "Users can view own problems" on public.problems
  for select using (auth.uid() = user_id);
create policy "Users can insert own problems" on public.problems
  for insert with check (auth.uid() = user_id);
create policy "Users can update own problems" on public.problems
  for update using (auth.uid() = user_id);
create policy "Users can delete own problems" on public.problems
  for delete using (auth.uid() = user_id);

-- PROBLEM PATTERNS RLS
create policy "Users can view own problem patterns" on public.problem_patterns
  for select using (auth.uid() = user_id);
create policy "Users can insert own problem patterns" on public.problem_patterns
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own problem patterns" on public.problem_patterns
  for delete using (auth.uid() = user_id);

-- REVIEW SCHEDULES RLS
create policy "Users can view own review schedules" on public.problem_review_schedules
  for select using (auth.uid() = user_id);
create policy "Users can insert own review schedules" on public.problem_review_schedules
  for insert with check (auth.uid() = user_id);
create policy "Users can update own review schedules" on public.problem_review_schedules
  for update using (auth.uid() = user_id);
create policy "Users can delete own review schedules" on public.problem_review_schedules
  for delete using (auth.uid() = user_id);

-- REVIEW HISTORY RLS
create policy "Users can view own review history" on public.problem_review_history
  for select using (auth.uid() = user_id);
create policy "Users can insert own review history" on public.problem_review_history
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own review history" on public.problem_review_history
  for delete using (auth.uid() = user_id);

-- BOOKMARKS RLS
create policy "Users can view own bookmarks" on public.bookmarks
  for select using (auth.uid() = user_id);
create policy "Users can insert own bookmarks" on public.bookmarks
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own bookmarks" on public.bookmarks
  for delete using (auth.uid() = user_id);

-- ACTIVITY EVENTS RLS
create policy "Users can view own activity events" on public.activity_events
  for select using (auth.uid() = user_id);
create policy "Users can insert own activity events" on public.activity_events
  for insert with check (auth.uid() = user_id);

-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  
  insert into public.user_settings (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to run on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- DEFAULT SEED FUNCTION TO SEED CURATED PATTERNS FOR A NEW USER
create or replace function public.seed_user_starter_data(target_user_id uuid)
returns void as $$
declare
  arrays_id uuid;
  strings_id uuid;
  trees_id uuid;
  graphs_id uuid;
  dp_id uuid;
  two_pointers_id uuid;
  sliding_window_id uuid;
  binary_search_id uuid;
  bfs_dfs_id uuid;
  dp_pattern_id uuid;
begin
  -- Insert Starter Topics
  insert into public.topics (id, user_id, name, order_index, icon)
  values (gen_random_uuid(), target_user_id, 'Arrays', 1, 'Array') returning id into arrays_id;

  insert into public.topics (id, user_id, name, order_index, icon)
  values (gen_random_uuid(), target_user_id, 'Strings', 2, 'Type') returning id into strings_id;

  insert into public.topics (id, user_id, name, order_index, icon)
  values (gen_random_uuid(), target_user_id, 'Trees', 3, 'GitFork') returning id into trees_id;

  insert into public.topics (id, user_id, name, order_index, icon)
  values (gen_random_uuid(), target_user_id, 'Graphs', 4, 'Share2') returning id into graphs_id;

  insert into public.topics (id, user_id, name, order_index, icon)
  values (gen_random_uuid(), target_user_id, 'Dynamic Programming', 5, 'Layers') returning id into dp_id;

  -- Insert Starter Patterns
  insert into public.patterns (id, user_id, name, description, recognition_clues, when_to_use, when_not_to_use, algorithmic_intuition)
  values (
    gen_random_uuid(),
    target_user_id,
    'Two Pointers',
    'Technique that uses two pointers to search pairs, intervals, or partition arrays in linear time.',
    'Sorted arrays, searching for pairs with given sum, palindrome checks, in-place array manipulation.',
    'When the input is sorted or monotonically ordered, or when partitioned traversal is needed.',
    'Unsorted collections where sorting destroys the required original index positions and sorting cost O(n log n) exceeds desired O(n).',
    'Leverages directional monotonicity to eliminate subsets of solutions in O(1) per step.'
  ) returning id into two_pointers_id;

  insert into public.patterns (id, user_id, name, description, recognition_clues, when_to_use, when_not_to_use, algorithmic_intuition)
  values (
    gen_random_uuid(),
    target_user_id,
    'Sliding Window',
    'Maintains a window over contiguous elements to compute subarray metrics in linear time.',
    'Subarrays, substrings, contiguous sub-segments, min/max length with target sum/unique character count.',
    'Contiguous subarray problems with monotonically increasing/decreasing property as window expands/shrinks.',
    'When elements are not contiguous or negative numbers cause window shrinkage to lose monotonicity.',
    'Expands right boundary to satisfy condition, shrinks left boundary to optimize or regain validity.'
  ) returning id into sliding_window_id;

  insert into public.patterns (id, user_id, name, description, recognition_clues, when_to_use, when_not_to_use, algorithmic_intuition)
  values (
    gen_random_uuid(),
    target_user_id,
    'Binary Search',
    'Divides the search space in half repeatedly to locate targets or optimize predicate thresholds.',
    'Sorted array, monotonic predicate function f(x), "find minimum maximum" or "maximum minimum" problems.',
    'When the search range can be tested in O(k) and monotonic invariant holds.',
    'Unsorted search spaces with no monotonic predicate.',
    'Discards half of the candidates at each step using mid calculation.'
  ) returning id into binary_search_id;

  insert into public.patterns (id, user_id, name, description, recognition_clues, when_to_use, when_not_to_use, algorithmic_intuition)
  values (
    gen_random_uuid(),
    target_user_id,
    'BFS & DFS',
    'Graph and tree traversal techniques for shortest paths or exhaustive exploration.',
    'Connected components, cycle detection, shortest path in unweighted graphs, tree traversals.',
    'Unweighted shortest path (BFS), backtracking/path finding/permutations (DFS).',
    'Weighted graphs requiring Dijkstra or Bellman-Ford.',
    'Queue for level-by-level shortest path, stack/recursion for deep tree branching.'
  ) returning id into bfs_dfs_id;

  insert into public.patterns (id, user_id, name, description, recognition_clues, when_to_use, when_not_to_use, algorithmic_intuition)
  values (
    gen_random_uuid(),
    target_user_id,
    'Dynamic Programming',
    'Breaks problems into overlapping subproblems and memoizes optimal substructure.',
    'Optimization (min/max), counting ways, decision at each step (take/skip), overlapping subproblems.',
    'When future choices depend on previous subproblem solutions with optimal substructure.',
    'Greedy choice is provably optimal, or subproblems do not overlap.',
    'Define state dp[i], identify recurrence transition, determine base cases and computation order.'
  ) returning id into dp_pattern_id;
end;
$$ language plpgsql security definer;

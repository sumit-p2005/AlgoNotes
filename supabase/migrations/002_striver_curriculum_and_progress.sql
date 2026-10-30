-- Supabase Migration: 002_striver_curriculum_and_progress.sql
-- AlgoNotes: Preinstalled Striver A2Z Curriculum & Personal Progress Tracking

-- 1. CURRICULUM SHEETS (Global Catalog)
create table if not exists public.curriculum_sheets (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text default '',
  total_topics int default 18,
  total_sections int default 61,
  total_problems int default 463,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. CURRICULUM TOPICS (e.g. Step 1: Learn the Basics)
create table if not exists public.curriculum_topics (
  id uuid default gen_random_uuid() primary key,
  sheet_id uuid references public.curriculum_sheets(id) on delete cascade not null,
  step_number int not null,
  title text not null,
  slug text not null,
  order_index int not null,
  expected_problems int default 0,
  created_at timestamptz default now(),
  unique (sheet_id, step_number)
);

-- 3. CURRICULUM SECTIONS (e.g. 1.1 Things to Know in a Language)
create table if not exists public.curriculum_sections (
  id uuid default gen_random_uuid() primary key,
  topic_id uuid references public.curriculum_topics(id) on delete cascade not null,
  title text not null,
  slug text not null,
  order_index int not null,
  problem_count int default 0,
  created_at timestamptz default now(),
  unique (topic_id, title)
);

-- 4. CURRICULUM PROBLEMS (e.g. User Input / Output)
create table if not exists public.curriculum_problems (
  id uuid default gen_random_uuid() primary key,
  sheet_id uuid references public.curriculum_sheets(id) on delete cascade not null,
  topic_id uuid references public.curriculum_topics(id) on delete cascade not null,
  section_id uuid references public.curriculum_sections(id) on delete cascade not null,
  problem_number int not null,
  title text not null,
  difficulty text not null default 'Easy',
  external_url text default '',
  order_index int not null,
  default_pattern text default '',
  created_at timestamptz default now(),
  unique (sheet_id, problem_number)
);

-- 5. USER CURRICULUM TOPIC PROGRESS (Marking whole topic as studied)
create table if not exists public.user_curriculum_topic_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  topic_id uuid references public.curriculum_topics(id) on delete cascade not null,
  is_studied boolean default false,
  studied_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, topic_id)
);

-- 6. USER CURRICULUM PROBLEM PROGRESS (Not started, Attempted, Solved, Needs revision)
create table if not exists public.user_curriculum_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  problem_id uuid references public.curriculum_problems(id) on delete cascade not null,
  status text not null default 'Not started' check (status in ('Not started', 'Attempted', 'Solved', 'Needs revision')),
  first_attempted_at timestamptz,
  solved_at timestamptz,
  last_activity_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, problem_id)
);

-- 7. USER CURRICULUM PROBLEM NOTES & CODE (Private to user)
create table if not exists public.user_curriculum_notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  problem_id uuid references public.curriculum_problems(id) on delete cascade not null,
  code text default '',
  language text default 'javascript',
  pattern_used text default '',
  pattern_cues text default '',
  key_points text default '',
  brute_force_approach text default '',
  optimized_approach text default '',
  intuition text default '',
  time_complexity text default '',
  space_complexity text default '',
  mistakes text default '',
  edge_cases text default '',
  personal_notes text default '',
  confidence_rating int default 3 check (confidence_rating between 1 and 5),
  tags text[] default array[]::text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, problem_id)
);

-- 8. USER CURRICULUM REVISION SCHEDULES (Spaced Repetition for curriculum problems)
create table if not exists public.user_curriculum_review_schedules (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  problem_id uuid references public.curriculum_problems(id) on delete cascade not null,
  next_review_date date not null default current_date,
  review_stage int default 1,
  ease_factor float default 2.5,
  interval_days int default 1,
  repetitions int default 0,
  last_reviewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, problem_id)
);

-- 9. USER CURRICULUM REVISION HISTORY (Independent real review attempts)
create table if not exists public.user_curriculum_review_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  problem_id uuid references public.curriculum_problems(id) on delete cascade not null,
  review_date timestamptz default now(),
  recall_rating text not null check (recall_rating in ('forgot', 'difficult', 'good', 'easy')),
  time_spent_seconds int default 0,
  pattern_recalled boolean default false,
  notes_recalled text default '',
  created_at timestamptz default now()
);

-- 10. USER CURRICULUM BOOKMARKS
create table if not exists public.user_curriculum_bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  problem_id uuid references public.curriculum_problems(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (user_id, problem_id)
);

-- 11. USER ONBOARDING PREFERENCES & PROGRESS
create table if not exists public.user_onboarding_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  completed_onboarding boolean default false,
  mode text default 'beginning' check (mode in ('beginning', 'current_progress', 'skipped')),
  last_step int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- INDEXES for High-Performance Queries
create index if not exists idx_curriculum_topics_sheet on public.curriculum_topics(sheet_id);
create index if not exists idx_curriculum_sections_topic on public.curriculum_sections(topic_id);
create index if not exists idx_curriculum_problems_section on public.curriculum_problems(section_id);
create index if not exists idx_curriculum_problems_topic on public.curriculum_problems(topic_id);
create index if not exists idx_curriculum_problems_order on public.curriculum_problems(sheet_id, order_index);
create index if not exists idx_user_curriculum_progress_user on public.user_curriculum_progress(user_id);
create index if not exists idx_user_curriculum_progress_problem on public.user_curriculum_progress(problem_id);
create index if not exists idx_user_curriculum_notes_user on public.user_curriculum_notes(user_id, problem_id);
create index if not exists idx_user_curriculum_review_schedules_due on public.user_curriculum_review_schedules(user_id, next_review_date);
create index if not exists idx_user_curriculum_review_history_user on public.user_curriculum_review_history(user_id, problem_id);

-- ENABLE ROW LEVEL SECURITY
alter table public.curriculum_sheets enable row level security;
alter table public.curriculum_topics enable row level security;
alter table public.curriculum_sections enable row level security;
alter table public.curriculum_problems enable row level security;
alter table public.user_curriculum_topic_progress enable row level security;
alter table public.user_curriculum_progress enable row level security;
alter table public.user_curriculum_notes enable row level security;
alter table public.user_curriculum_review_schedules enable row level security;
alter table public.user_curriculum_review_history enable row level security;
alter table public.user_curriculum_bookmarks enable row level security;
alter table public.user_onboarding_progress enable row level security;

-- POLICIES: Shared Curriculum (Read-only to all authenticated and anonymous users)
create policy "Allow read on curriculum_sheets" on public.curriculum_sheets for select using (true);
create policy "Allow read on curriculum_topics" on public.curriculum_topics for select using (true);
create policy "Allow read on curriculum_sections" on public.curriculum_sections for select using (true);
create policy "Allow read on curriculum_problems" on public.curriculum_problems for select using (true);

-- POLICIES: Personal User Data (Strict User Isolation)
create policy "Users can CRUD own topic progress" on public.user_curriculum_topic_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can CRUD own problem progress" on public.user_curriculum_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can CRUD own problem notes" on public.user_curriculum_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can CRUD own review schedules" on public.user_curriculum_review_schedules
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can CRUD own review history" on public.user_curriculum_review_history
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can CRUD own curriculum bookmarks" on public.user_curriculum_bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can CRUD own onboarding progress" on public.user_onboarding_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


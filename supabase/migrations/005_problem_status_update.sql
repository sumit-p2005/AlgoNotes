-- 005_problem_status_update.sql
-- Expand status check constraint on problems table to support 4 canonical statuses:
-- 'Not started', 'Attempted', 'Solved', 'Needs revision' (preserving 'Saved' for backward compatibility)

do $$
begin
  if exists (
    select 1 from information_schema.tables 
    where table_schema = 'public' and table_name = 'problems'
  ) then
    alter table public.problems drop constraint if exists problems_status_check;
    alter table public.problems add constraint problems_status_check 
      check (status in ('Not started', 'Saved', 'Attempted', 'Solved', 'Needs revision'));
  end if;
end $$;

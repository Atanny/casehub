-- ════════════════════════════════════════════════════════
-- CaseHub Session Tracking Migration
-- Run this in your Supabase SQL editor
-- ════════════════════════════════════════════════════════

-- Sessions table: one row per Time In / Time Out pair
create table if not exists sessions (
  id          uuid default gen_random_uuid() primary key,
  email       text not null,
  time_in     timestamptz default now(),
  time_out    timestamptz,
  status      text default 'active', -- 'active' | 'completed'
  created_at  timestamptz default now()
);

-- Cases worked per session
create table if not exists session_cases (
  id          uuid default gen_random_uuid() primary key,
  session_id  uuid references sessions(id) on delete cascade,
  email       text,
  case_num    text,
  case_type   text, -- 'siteComment' | 'inbound'
  note        text,
  started_at  timestamptz default now(),
  ended_at    timestamptz,
  status      text default 'in_progress' -- 'in_progress' | 'saved' | 'draft'
);

-- Breaks per session
create table if not exists session_breaks (
  id          uuid default gen_random_uuid() primary key,
  session_id  uuid references sessions(id) on delete cascade,
  email       text,
  break_type  text, -- '15 min' | '30 min' | 'Lunch'
  started_at  timestamptz default now(),
  ended_at    timestamptz
);

-- RLS: allow all (same as other tables)
alter table sessions enable row level security;
alter table session_cases enable row level security;
alter table session_breaks enable row level security;

create policy "allow all sessions" on sessions for all using (true) with check (true);
create policy "allow all session_cases" on session_cases for all using (true) with check (true);
create policy "allow all session_breaks" on session_breaks for all using (true) with check (true);

-- Indexes for fast lookups
create index if not exists idx_sessions_email on sessions(email);
create index if not exists idx_sessions_time_in on sessions(time_in);
create index if not exists idx_session_cases_session on session_cases(session_id);
create index if not exists idx_session_breaks_session on session_breaks(session_id);

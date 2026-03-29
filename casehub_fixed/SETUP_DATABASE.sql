-- ============================================================
-- CaseHub — Full Database Setup
-- Paste this entire script into:
-- Supabase → SQL Editor → New Query → Run
-- ============================================================

-- ── Drop existing tables (clean slate) ──
drop table if exists drafts cascade;
drop table if exists cases cascade;
drop table if exists announcements cascade;
drop table if exists links cascade;
drop table if exists requestors cascade;
drop table if exists profiles cascade;

-- ── Create tables ──

create table cases (
  id          uuid default gen_random_uuid() primary key,
  user_email  text not null,
  mode        text,
  case_num    text,
  account_num text,
  amend_type  text,
  inbound_num text,
  in_progress boolean default false,
  entries     jsonb default '[]',
  devices     jsonb default '{}',
  checklist   jsonb default '{}',
  email_address text,
  email_type  text default 'clarification',
  image_urls  jsonb default '[]',
  saved_at    timestamptz default now(),
  ended_at    text        default null
);

create table announcements (
  id         uuid default gen_random_uuid() primary key,
  title      text not null,
  body       text,
  badge      text default 'info',
  author     text,
  created_at timestamptz default now()
);

create table links (
  id         uuid default gen_random_uuid() primary key,
  user_email text,
  title      text not null,
  url        text not null,
  icon       text default '🔗'
);

create table requestors (
  id   uuid default gen_random_uuid() primary key,
  name text unique not null
);

create table drafts (
  id         uuid default gen_random_uuid() primary key,
  user_email text not null,
  mode       text not null,
  draft_data jsonb default '{}',
  saved_at   timestamptz default now(),
  unique(user_email, mode)
);

-- ── Profiles table — stores name, role, file names, avatar, etc. ──
-- Safe upsert by email — fields are merged, never wiped
create table profiles (
  id            uuid default gen_random_uuid() primary key,
  email         text unique not null,
  name          text,
  role          text,
  avatar_url    text,
  before_name   text,
  after_name    text,
  screenshot_name text,
  greeting_msg    text default 'Hi po Ms. Tina, magpapacheck lang po (Case #)',
  greeting_messages jsonb default '[]'::jsonb,
  updated_at    timestamptz default now()
);

-- ── Seed default requestors ──
insert into requestors (name) values
  ('James Burd'),
  ('John Farnsworth'),
  ('Parker Thomas')
on conflict (name) do nothing;

-- ── Enable Row Level Security ──
alter table cases         enable row level security;
alter table announcements enable row level security;
alter table links         enable row level security;
alter table requestors    enable row level security;
alter table drafts        enable row level security;
alter table profiles      enable row level security;

-- ── RLS Policies (allow all for anon key) ──
create policy "allow all" on cases         for all using (true) with check (true);
create policy "allow all" on announcements for all using (true) with check (true);
create policy "allow all" on links         for all using (true) with check (true);
create policy "allow all" on requestors    for all using (true) with check (true);
create policy "allow all" on drafts        for all using (true) with check (true);
create policy "allow all" on profiles      for all using (true) with check (true);

-- ── Storage bucket for images ──
insert into storage.buckets (id, name, public)
values ('case-images', 'case-images', true)
on conflict (id) do nothing;

-- Drop old storage policy if it exists, then recreate
drop policy if exists "allow all images" on storage.objects;
create policy "allow all images" on storage.objects
  for all using (bucket_id = 'case-images')
  with check (bucket_id = 'case-images');

-- ── Migrations (safe to run on existing DB) ──
alter table cases add column if not exists ended_at text default null;
alter table profiles add column if not exists greeting_messages jsonb default '[]'::jsonb;

-- ── Done! ──
select 'CaseHub database ready ✅' as status;

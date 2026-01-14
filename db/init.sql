-- Project Nexus Supabase 初始化脚本
create table if not exists public.guestbook (
  id bigint generated always as identity primary key,
  nickname text not null,
  content text not null,
  created_at timestamptz not null default now(),
  constraint nickname_len check (char_length(nickname) between 1 and 20),
  constraint content_len check (char_length(content) between 1 and 50)
);

alter table public.guestbook enable row level security;

create policy "Allow anon insert"
on public.guestbook for insert
to anon
with check (true);

create policy "Allow anon select"
on public.guestbook for select
to anon
using (true);

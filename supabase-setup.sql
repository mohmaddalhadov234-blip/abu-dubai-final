-- Выполни этот SQL в Supabase → SQL Editor

create table reviews (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text not null,
  created_at timestamptz default now()
);

-- Разрешаем читать всем
alter table reviews enable row level security;

create policy "Anyone can read reviews"
  on reviews for select
  using (true);

create policy "Anyone can insert reviews"
  on reviews for insert
  with check (true);

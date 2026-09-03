-- LaunchKit Phase 5: admin role on profiles
-- Run after 001_profiles.sql.

alter table public.profiles
  add column if not exists role text not null default 'user';

drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

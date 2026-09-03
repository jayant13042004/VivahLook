-- LaunchKit Phase 3: payments, subscriptions, provider customer IDs
-- Run in Supabase SQL Editor after 001_profiles.sql.

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  provider text not null,
  kind text not null,
  status text not null default 'pending',
  product_id text not null,
  amount integer not null default 0,
  currency text not null default 'usd',
  provider_session_id text,
  provider_payment_id text,
  provider_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payments_provider_payment_id_idx
  on public.payments (provider, provider_payment_id)
  where provider_payment_id is not null;

create index if not exists payments_user_id_idx on public.payments (user_id);

create table if not exists public.billing_subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  provider text not null,
  product_id text not null,
  status text not null,
  provider_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.billing_customers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text unique,
  razorpay_customer_id text unique,
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;
alter table public.billing_subscriptions enable row level security;
alter table public.billing_customers enable row level security;

drop policy if exists "Users can view own payments" on public.payments;
create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can view own subscription" on public.billing_subscriptions;
create policy "Users can view own subscription"
  on public.billing_subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "Users can view own billing customer" on public.billing_customers;
create policy "Users can view own billing customer"
  on public.billing_customers for select
  using (auth.uid() = user_id);

create or replace function public.set_payments_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists payments_updated_at on public.payments;
create trigger payments_updated_at
  before update on public.payments
  for each row execute function public.set_payments_updated_at();

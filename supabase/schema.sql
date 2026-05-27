-- Caarps Appraisal OS functional starter schema
-- Run this in Supabase SQL Editor before deploying the app.

create extension if not exists "uuid-ossp";

do $$ begin
  create type app_role as enum ('administrator','operations_manager','appraiser_manager','staff_appraiser','reviewer','accounting','vendor_client','borrower_limited');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type order_status as enum ('new','assigned','inspection_scheduled','inspection_complete','report_uploaded','review_hold','revision_requested','portal_ready','delivered','completed','cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type document_visibility as enum ('internal','assigned_appraiser','reviewer','accounting','vendor_client','lender_client','borrower_limited');
exception when duplicate_object then null;
end $$;

create table if not exists organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  kind text not null default 'appraisal_firm',
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  full_name text,
  role app_role not null default 'staff_appraiser',
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  organization_id uuid not null references organizations(id) on delete cascade,
  client text not null,
  borrower text,
  property_address text not null,
  amc text,
  status order_status not null default 'new',
  priority text default 'Normal',
  due_date text,
  fee_amount numeric(10,2),
  tech_fee_amount numeric(10,2) default 0 check (tech_fee_amount <= 9.99),
  progress int default 0 check (progress >= 0 and progress <= 100),
  warning text,
  assigned_appraiser_id uuid references profiles(id),
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  order_id text references orders(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  filename text not null,
  storage_path text not null,
  document_type text not null,
  visibility document_visibility not null default 'internal',
  uploaded_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists review_findings (
  id uuid primary key default uuid_generate_v4(),
  order_id text references orders(id) on delete cascade,
  severity text not null check (severity in ('critical','warning','info')),
  rule_name text not null,
  detail text not null,
  status text not null default 'open',
  owner_role app_role,
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  order_id text references orders(id) on delete set null,
  actor_id uuid references profiles(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function touch_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_touch_updated_at on orders;
create trigger orders_touch_updated_at before update on orders for each row execute function touch_updated_at();

create or replace function current_profile_org() returns uuid language sql stable security definer set search_path = public as $$
  select organization_id from profiles where id = auth.uid()
$$;

create or replace function current_profile_role() returns app_role language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid()
$$;

create or replace function is_management_role() returns boolean language sql stable as $$
  select current_profile_role() in ('administrator','operations_manager','appraiser_manager')
$$;

create or replace function can_access_accounting() returns boolean language sql stable as $$
  select current_profile_role() in ('administrator','accounting')
$$;

create or replace function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
declare
  org_id uuid;
  org_name text;
  requested_role app_role;
begin
  org_name := coalesce(new.raw_user_meta_data->>'organization_name', 'New Appraisal Company');
  requested_role := coalesce((new.raw_user_meta_data->>'role')::app_role, 'administrator'::app_role);
  insert into organizations (name) values (org_name) returning id into org_id;
  insert into profiles (id, organization_id, full_name, role)
  values (new.id, org_id, coalesce(new.raw_user_meta_data->>'full_name', new.email), requested_role);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table orders enable row level security;
alter table documents enable row level security;
alter table review_findings enable row level security;
alter table audit_events enable row level security;

drop policy if exists "organizations own org" on organizations;
drop policy if exists "profiles own org" on profiles;
drop policy if exists "profiles self insert" on profiles;
drop policy if exists "profiles admin update" on profiles;
drop policy if exists "orders scoped select" on orders;
drop policy if exists "orders scoped insert" on orders;
drop policy if exists "orders scoped update" on orders;
drop policy if exists "documents scoped select" on documents;
drop policy if exists "documents scoped insert" on documents;
drop policy if exists "review findings scoped select" on review_findings;
drop policy if exists "review findings scoped write" on review_findings;
drop policy if exists "audit scoped select" on audit_events;
drop policy if exists "audit scoped insert" on audit_events;

create policy "organizations own org" on organizations for select using (id = current_profile_org());

create policy "profiles own org" on profiles for select using (
  id = auth.uid() or organization_id = current_profile_org()
);
create policy "profiles admin update" on profiles for update using (
  organization_id = current_profile_org() and current_profile_role() = 'administrator'
) with check (organization_id = current_profile_org());

create policy "orders scoped select" on orders for select using (
  organization_id = current_profile_org()
  and (
    current_profile_role() in ('administrator','operations_manager','appraiser_manager','reviewer','accounting')
    or assigned_appraiser_id = auth.uid()
    or created_by = auth.uid()
    or current_profile_role() = 'vendor_client'
  )
);
create policy "orders scoped insert" on orders for insert with check (
  organization_id = current_profile_org()
  and current_profile_role() in ('administrator','operations_manager','appraiser_manager','vendor_client')
);
create policy "orders scoped update" on orders for update using (
  organization_id = current_profile_org()
  and (is_management_role() or assigned_appraiser_id = auth.uid() or current_profile_role() in ('reviewer','accounting'))
) with check (organization_id = current_profile_org());

create policy "documents scoped select" on documents for select using (
  organization_id = current_profile_org()
  and visibility <> 'borrower_limited'
  and (
    current_profile_role() in ('administrator','operations_manager','appraiser_manager','reviewer','accounting','vendor_client')
    or uploaded_by = auth.uid()
    or exists (select 1 from orders o where o.id = order_id and o.assigned_appraiser_id = auth.uid())
  )
);
create policy "documents scoped insert" on documents for insert with check (
  organization_id = current_profile_org()
  and current_profile_role() <> 'borrower_limited'
);

create policy "review findings scoped select" on review_findings for select using (
  exists (select 1 from orders o where o.id = order_id and o.organization_id = current_profile_org())
  and current_profile_role() in ('administrator','operations_manager','appraiser_manager','reviewer','staff_appraiser')
);
create policy "review findings scoped write" on review_findings for all using (
  current_profile_role() in ('administrator','operations_manager','reviewer')
  and exists (select 1 from orders o where o.id = order_id and o.organization_id = current_profile_org())
) with check (
  current_profile_role() in ('administrator','operations_manager','reviewer')
);

create policy "audit scoped select" on audit_events for select using (
  organization_id = current_profile_org()
  and current_profile_role() in ('administrator','operations_manager')
);
create policy "audit scoped insert" on audit_events for insert with check (organization_id = current_profile_org());

-- Optional storage bucket for documents. Run once if using Supabase Storage.
insert into storage.buckets (id, name, public) values ('appraisal-documents', 'appraisal-documents', false) on conflict (id) do nothing;

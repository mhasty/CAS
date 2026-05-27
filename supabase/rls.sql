-- RLS policies are included in schema.sql for this build.
-- This file is intentionally light so Supabase setup still has a clear step 2.
-- Run schema.sql first. Then run this file if you want to ensure the new functional tables have RLS enabled.

alter table if exists organizations enable row level security;
alter table if exists profiles enable row level security;
alter table if exists orders enable row level security;
alter table if exists documents enable row level security;
alter table if exists review_findings enable row level security;
alter table if exists audit_events enable row level security;
alter table if exists order_notes enable row level security;
alter table if exists order_status_history enable row level security;

# Caarps Appraisal OS

Functional Next.js + Supabase starter for appraisal order tracking, open-order manager views, order detail pages, notes, status history, document records, billing fields, review findings, and role-based Supabase security.

## What is functional now

- Supabase email signup/sign-in
- Protected app routes
- Open orders manager table at `/orders/open`
- Click-through order detail pages at `/orders/[id]`
- Create orders at `/orders/new`
- Edit and save order details
- Add internal notes to an order
- Add document records to an order
- Status history records
- Audit event inserts
- Dashboard pipeline links into order details
- SEO landing page, sitemap, and robots

## Vercel environment variables

Add these in Vercel Project Settings -> Environment Variables:

```txt
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

## Supabase setup

In Supabase SQL Editor, run these in order:

1. `supabase/schema.sql`
2. `supabase/rls.sql`
3. `supabase/seed.sql`

If you already ran an older schema, run the new `schema.sql` again. It uses `create table if not exists` and `alter table add column if not exists` for the new order detail fields.

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Production notes

This is now a usable starter application, but the following still need deeper implementation before regulated production use:

- Real Supabase Storage file uploads instead of document records only
- Full appraiser assignment engine
- Payment processing / ACH payouts
- XML parsing workers
- AI review job queue
- AMC portal automation / browser extension
- Formal legal/compliance/security review

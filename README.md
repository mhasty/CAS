# Caarps Appraisal OS

A GitHub/Vercel/Supabase-ready starter for appraisal order management, AMC portal autofill, legacy URAR XML, UAD 3.6 XML, review automation, lender delivery, vendor portals, accounting, and role-based access.

## Status

Functional starter v0.5. This is no longer just a static prototype: it includes a production-style Next.js structure, Supabase auth actions, protected routes, a Supabase-backed dashboard with mock fallback, order creation, SEO landing page, schema, RLS policies, and Vercel deployment setup.

It is still not finished regulated production software. Before using it for live appraisal work, add compliance review, production storage policies, final AI/review governance, backup/retention policies, and real integrations.

## Included

- Next.js 16 App Router project
- React 19
- Vercel-ready folder structure
- Public SEO landing page at `/`
- Login and signup pages using Supabase Auth server actions
- Protected dashboard routes through Next.js `proxy.ts`
- Supabase browser/server clients
- Appraisal order dashboard with Supabase query and mock fallback
- Functional new order form at `/orders/new`
- Supabase schema with organizations, profiles, orders, documents, review findings, and audit events
- Starter RLS policies for administrator, operations, appraiser manager, appraiser, reviewer, accounting, vendor client, and borrower-limited roles
- Tech fee cap enforced in the database with `tech_fee_amount <= 9.99`
- SEO metadata, Open Graph metadata, sitemap, robots, and SoftwareApplication JSON-LD
- Feature pages for PDF autofill, XML intake, review, lender experience, vendor portal, and accounting

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Optionally run `supabase/seed.sql` for demo orders.
4. Add these to `.env.local` and Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Vercel setup

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables above.
4. Deploy.

## Useful commands

```bash
npm run typecheck
npm run build
npm run dev
```

## Remaining production work

- Add Supabase Storage upload UI and storage RLS policies for appraisal documents.
- Add actual XML parsing and validation worker for legacy URAR and UAD 3.6 XML.
- Add review-engine background jobs and rule-pack management.
- Add Playwright-based portal automation workers outside Vercel serverless.
- Add payment processor, QuickBooks sync, ACH payout workflow, and accounting exports.
- Add admin UI for permissions and user invitations.
- Add complete test suite before live usage.

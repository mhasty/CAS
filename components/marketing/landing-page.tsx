import Link from "next/link";
import { ArrowRight, Bot, Building2, CheckCircle2, Database, FileCode2, LockKeyhole, ShieldCheck, Workflow, Zap } from "lucide-react";
import { Button, buttonClassName } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featureCards = [
  [Workflow, "Order tracking", "Track every appraisal from order intake through lender delivery with SLA visibility."],
  [Bot, "AMC portal autofill", "Extract order details from PDFs and prepare portal submissions with review controls."],
  [FileCode2, "UAD XML review", "Normalize legacy URAR XML and UAD 3.6 appraisal data for automated checks."],
  [ShieldCheck, "Pre-submit review", "Run configurable rule packs before reports are delivered to lenders or AMCs."],
  [Building2, "Lender experience", "Fast ordering, secure delivery, enterprise reporting, and controlled borrower visibility."],
  [Database, "Accounting workflows", "Track fees, payouts, receivables, split payments, tech fees, and profitability."],
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_30%),linear-gradient(180deg,#ffffff,#f8fafc)]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Building2 size={22} /></span>
          <span><span className="block font-semibold tracking-tight">Caarps</span><span className="text-xs text-slate-500">Appraisal OS</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-950">Sign in</Link>
          <Link href="/login" className={buttonClassName("default", "flex items-center gap-2")}>Launch app <ArrowRight size={16} /></Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">Appraisal order management software for appraisers, AMCs, and lenders</div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">The faster way to order, review, track, and deliver appraisals.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Caarps combines appraisal order tracking, AMC workflow automation, UAD XML review, vendor portals, lender delivery, accounting, and role-based permissions in one modern platform.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login" className={buttonClassName("default", "flex items-center gap-2")}>Get started <ArrowRight size={16} /></Link>
            <Link href="#features" className={buttonClassName("outline")}>Explore features</Link>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 text-sm text-slate-600 md:grid-cols-3">
            {['No monthly appraiser fee strategy', 'Restricted borrower visibility', 'Built for UAD 3.6 XML'].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> {item}</div>)}
          </div>
        </div>
        <Card className="shadow-soft">
          <CardContent className="p-5">
            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between"><span className="text-sm text-slate-300">Submission readiness</span><Zap size={20} /></div>
              <p className="mt-4 text-6xl font-semibold">92%</p>
              <p className="mt-2 text-sm text-slate-300">AI-assisted review cleared 14 of 16 checks before delivery.</p>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ['Order CA-10482', 'UAD XML mismatch flagged before lender delivery'],
                ['ClearView AMC', '40 of 42 portal fields mapped'],
                ['Accounting', '$42,880 appraiser payouts scheduled'],
              ].map(([a,b]) => <div key={a} className="rounded-2xl border border-slate-200 p-4"><p className="font-medium">{a}</p><p className="text-sm text-slate-500">{b}</p></div>)}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl"><h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Everything appraisal teams wish their portal already did.</h2><p className="mt-4 text-slate-600">Designed for speed, transparency, compliance, and better collaboration between appraisers, AMCs, and lenders.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map(([Icon, title, body]) => <Card key={String(title)}><CardContent><Icon size={22} /><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{body as string}</p></CardContent></Card>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Card className="bg-slate-950 text-white shadow-soft"><CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center"><div><h2 className="text-3xl font-semibold">Built for balanced adoption.</h2><p className="mt-3 max-w-2xl text-slate-300">Low transparent appraiser fees, premium lender workflows, and operational automation that helps both sides move faster.</p></div><Link href="/login" className={buttonClassName("default", "bg-white text-slate-950 hover:bg-slate-100")}>Open dashboard</Link></CardContent></Card>
      </section>
    </main>
  );
}

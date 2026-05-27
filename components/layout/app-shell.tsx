import Link from "next/link";
import { Bell, Bot, BrainCircuit, Building2, ClipboardList, Database, DollarSign, FileCode2, Search, Settings, ShieldCheck, Users, Workflow, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";

const nav = [
  ["/dashboard", ClipboardList, "Orders"],
  ["/orders", Bot, "PDF Autofill"],
  ["/xml", FileCode2, "XML Intake"],
  ["/review", BookOpenCheck, "Review Engine"],
  ["/dashboard#automation", Workflow, "Automation"],
  ["/dashboard#intelligence", BrainCircuit, "Intelligence"],
  ["/lenders", Building2, "Lender Experience"],
  ["/vendors", Users, "Vendor Portal"],
  ["/accounting", DollarSign, "Accounting"],
  ["/dashboard#archive", Database, "Legacy Archive"],
];

export function AppShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white p-5 lg:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Building2 size={22}/></div>
          <div><h1 className="font-semibold tracking-tight">Caarps Appraisal OS</h1><p className="text-xs text-slate-500">v0.5 · Supabase functional</p></div>
        </Link>
        <nav className="mt-8 space-y-2">{nav.map(([href, Icon, label]) => <Link key={String(href)} href={href as string} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-100"><Icon size={18}/>{label as string}</Link>)}</nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-sm font-medium"><ShieldCheck size={16}/> Audit-safe automation</div><p className="mt-2 text-xs leading-5 text-slate-500">Every extraction, review finding, edit, override, and portal submission is designed to be logged.</p></div>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur lg:px-8"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-sm text-slate-500">{subtitle ?? "Appraisal operations platform"}</p><h2 className="text-2xl font-semibold tracking-tight">{title}</h2></div><div className="flex items-center gap-2"><div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex"><Search size={16}/> Search orders, XML, borrowers, portals</div><Button><Link href="/orders/new">New Order</Link></Button><Button variant="outline"><Bell size={16}/></Button><form action={signOut}><Button variant="ghost" title="Sign out"><Settings size={16}/></Button></form></div></div></header>
        <div className="p-5 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

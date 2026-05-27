import Link from "next/link";
import { Building2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signIn } from "@/lib/actions/auth";

export const metadata = { title: "Sign in", description: "Sign in to Caarps Appraisal OS." };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string; redirectedFrom?: string }> }) {
  const params = await searchParams;
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><Card className="w-full max-w-md shadow-soft"><CardContent className="p-8"><Link href="/" className="mb-8 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Building2 size={22}/></span><span><span className="block font-semibold">Caarps Appraisal OS</span><span className="text-xs text-slate-500">Secure sign in</span></span></Link><div className="rounded-2xl bg-slate-100 p-4"><div className="flex gap-3"><LockKeyhole size={20}/><div><p className="font-medium">Supabase Auth connected</p><p className="mt-1 text-sm text-slate-500">Use email/password auth once your Supabase env vars and schema are loaded.</p></div></div></div>{params.error && <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{params.error}</div>}{params.message && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{params.message}</div>}<form action={signIn} className="mt-6 space-y-4"><input type="hidden" name="redirectedFrom" value={params.redirectedFrom ?? "/dashboard"}/><input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email" type="email" required/><input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="password" placeholder="Password" type="password" required/><Button className="w-full">Sign in</Button></form><p className="mt-6 text-center text-xs text-slate-500">Need an account? <Link className="font-medium text-slate-950" href="/signup">Create one</Link>.</p></CardContent></Card></main>;
}

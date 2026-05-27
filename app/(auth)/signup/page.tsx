import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signUp } from "@/lib/actions/auth";

export const metadata = { title: "Create account", description: "Create a Caarps Appraisal OS account." };

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><Card className="w-full max-w-md shadow-soft"><CardContent className="p-8"><Link href="/" className="mb-8 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Building2 size={22}/></span><span><span className="block font-semibold">Caarps Appraisal OS</span><span className="text-xs text-slate-500">Create workspace</span></span></Link>{params.error && <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{params.error}</div>}<form action={signUp} className="space-y-4"><input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="full_name" placeholder="Your name" required/><input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="organization_name" placeholder="Company name" required/><input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email" type="email" required/><input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="password" placeholder="Password" type="password" minLength={8} required/><Button className="w-full">Create account</Button></form><p className="mt-6 text-center text-xs text-slate-500">Already have an account? <Link className="font-medium text-slate-950" href="/login">Sign in</Link>.</p></CardContent></Card></main>;
}

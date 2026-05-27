import { Activity, BrainCircuit, CheckCircle2, ClipboardList, ExternalLink, FileCode2, Mail, TriangleAlert } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Metric } from "@/components/dashboard/metric";
import { OrderPipeline } from "@/components/orders/order-pipeline";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { mockOrders } from "@/lib/data/mock";

export const metadata = { title: "Dashboard", description: "Appraisal order dashboard with SLA, XML, review, and portal automation metrics." };

async function getOrders() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return mockOrders;
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("id,client,borrower,property_address,amc,status,priority,due_date,fee_amount,progress,warning").order("created_at", { ascending: false }).limit(20);
    if (error || !data?.length) return mockOrders;
    return data;
  } catch { return mockOrders; }
}

export default async function DashboardPage() {
  const orders = await getOrders();
  return <AppShell title="Order Command Center" subtitle="Supabase-ready functional dashboard"><div className="space-y-6"><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Metric icon={ClipboardList} label="Active orders" value="128" helper="17 require attention"/><Metric icon={FileCode2} label="XML files parsed" value="1,842" helper="Legacy + UAD 3.6"/><Metric icon={BrainCircuit} label="Review saves" value="41.2 hrs" helper="Estimated this month"/><Metric icon={CheckCircle2} label="Pre-submit pass" value="92%" helper="Rolling 30 days"/></section><section className="grid gap-6 xl:grid-cols-[1.5fr_.9fr]"><OrderPipeline orders={orders}/><Card><CardContent><h3 className="font-semibold">Today’s exception queue</h3><div className="mt-4 space-y-3">{[[TriangleAlert,"4 critical review findings","Open review queue"],[FileCode2,"9 XML/PDF mismatches","Reconcile fields"],[Mail,"11 restricted borrower coordination tasks","Send scheduling reminders"],[ExternalLink,"5 portals need submission","Launch autofill"]].map(([Icon,title,action]) => <div key={String(title)} className="rounded-2xl border border-slate-200 p-4"><div className="flex gap-3"><Icon className="mt-0.5 text-slate-600" size={18}/><div><p className="text-sm font-medium">{String(title)}</p><p className="mt-1 text-xs text-slate-500">{String(action)}</p></div></div></div>)}</div></CardContent></Card></section><section id="intelligence" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Metric icon={BrainCircuit} label="Predicted SLA risks" value="12" helper="Next 48 hours"/><Metric icon={Activity} label="Revision risk score" value="18%" helper="Below historical average"/><Metric icon={CheckCircle2} label="Ready for delivery" value="31" helper="Passed review"/><Metric icon={ClipboardList} label="Automation rules" value="42" helper="Active workflows"/></section></div></AppShell>;
}

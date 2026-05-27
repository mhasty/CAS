import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { mockOrders } from "@/lib/data/mock";
import { CalendarDays, Filter, MapPin, Plus, Search } from "lucide-react";

export const metadata = { title: "Open Appraisal Orders", description: "Manager view of open appraisal orders across appraisers, statuses, due dates, and reviewers." };

type Order = Record<string, any>;
function statusLabel(value: string) { return value?.replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase()) ?? "New"; }
async function getOrders() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("id,client,borrower,property_address,city,state,zip,product,amc,status,priority,due_date,fee_amount,progress,warning,created_at").order("created_at", { ascending: false }).limit(100);
    if (error || !data?.length) return mockOrders.map((o: any) => ({ ...o, property_address: o.property_address, product: "APPRAISAL FLEX 1004" }));
    return data;
  } catch { return mockOrders.map((o: any) => ({ ...o, product: "APPRAISAL FLEX 1004" })); }
}
export default async function OpenOrdersPage() {
  const orders = await getOrders() as Order[];
  return <AppShell title="View Open Orders" subtitle={`Showing ${orders.length} open appraisal orders`}><div className="space-y-6"><Card><CardContent className="p-5"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h3 className="text-lg font-semibold">Office manager order board</h3><p className="text-sm text-slate-500">Clean replacement for the legacy open-orders table with full click-through order management.</p></div><div className="flex flex-wrap gap-2"><Button variant="outline"><Search size={16} className="mr-2"/>Search</Button><Button variant="outline"><Filter size={16} className="mr-2"/>Filter</Button><Button><Link className="flex items-center" href="/orders/new"><Plus size={16} className="mr-2"/>Add New Order</Link></Button></div></div></CardContent></Card><Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">File #</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Client</th><th className="px-4 py-3">Borrower</th><th className="px-4 py-3">Address</th><th className="px-4 py-3">Appraiser</th><th className="px-4 py-3">Due</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Priority</th></tr></thead><tbody className="divide-y divide-slate-100">{orders.map((order, index) => <tr key={order.id} className={index % 2 ? "bg-slate-50/80" : "bg-white"}><td className="whitespace-nowrap px-4 py-3 font-medium"><Link className="text-blue-700 hover:underline" href={`/orders/${order.id}`}>{order.id}</Link></td><td className="px-4 py-3">{order.product ?? "APPRAISAL FLEX 1004"}</td><td className="px-4 py-3 text-blue-700">{order.client}</td><td className="px-4 py-3">{order.borrower ?? "N/A"}</td><td className="px-4 py-3"><div className="flex gap-2"><MapPin size={14} className="mt-0.5 text-slate-400"/><span>{order.property_address}{order.city ? `, ${order.city}` : ""}{order.state ? `, ${order.state}` : ""}</span></div></td><td className="px-4 py-3 text-blue-700">Assigned Appraiser</td><td className="whitespace-nowrap px-4 py-3"><div className="flex gap-2"><CalendarDays size={14} className="mt-0.5 text-slate-400"/>{order.due_date ?? "—"}</div></td><td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{statusLabel(order.status)}</span></td><td className="px-4 py-3">{order.priority ?? "0"}</td></tr>)}</tbody></table></div></CardContent></Card></div></AppShell>;
}

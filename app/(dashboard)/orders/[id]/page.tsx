import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { OrderDetail } from "@/components/orders/order-detail";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Order Details", description: "View, update, note, document, and manage a single appraisal order." };

export default async function OrderDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const supabase = await createClient();
  const { data: order } = await supabase.from("orders").select("*").eq("id", id).single();
  if (!order) notFound();
  const [{ data: notes }, { data: history }, { data: documents }, { data: findings }] = await Promise.all([
    supabase.from("order_notes").select("id,body,visibility,created_at").eq("order_id", id).order("created_at", { ascending: false }),
    supabase.from("order_status_history").select("id,status,message,created_at").eq("order_id", id).order("created_at", { ascending: false }).limit(50),
    supabase.from("documents").select("id,filename,document_type,visibility,created_at").eq("order_id", id).order("created_at", { ascending: false }),
    supabase.from("review_findings").select("id,severity,rule_name,detail,status").eq("order_id", id).order("created_at", { ascending: false })
  ]);
  return <AppShell title={`Order ${id}`} subtitle="Full order detail, notes, status history, billing, documents, and review"><OrderDetail order={order} notes={notes ?? []} history={history ?? []} documents={documents ?? []} findings={findings ?? []} message={sp.saved} error={sp.error}/></AppShell>;
}

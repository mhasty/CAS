"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : null;
}

export async function createOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single();
  const organizationId = profile?.organization_id;
  if (!organizationId) redirect("/orders/new?error=Your profile is missing an organization. Run the Supabase schema and create a profile first.");

  const id = getString(formData, "id") || `CA-${Date.now().toString().slice(-6)}`;
  const techFee = Math.min(getNumber(formData, "tech_fee_amount") ?? 0, 9.99);
  const { error } = await supabase.from("orders").insert({
    id,
    organization_id: organizationId,
    client: getString(formData, "client"),
    borrower: getString(formData, "borrower"),
    property_address: getString(formData, "property_address"),
    amc: getString(formData, "amc"),
    status: getString(formData, "status") || "new",
    priority: getString(formData, "priority") || "Normal",
    due_date: getString(formData, "due_date"),
    fee_amount: getNumber(formData, "fee_amount"),
    tech_fee_amount: techFee,
    progress: 0,
    created_by: user.id
  });

  if (error) redirect(`/orders/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
function getNumber(formData: FormData, key: string) {
  const raw = String(formData.get(key) ?? "").replace(/[$,]/g, "").trim();
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}
async function requireProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile, error } = await supabase.from("profiles").select("id, organization_id, role, full_name").eq("id", user.id).single();
  if (error || !profile?.organization_id) redirect("/orders/new?error=Your profile is missing an organization. Run the Supabase schema and create a profile first.");
  return { supabase, user, profile };
}
function auditMetadata(formData: FormData, fields: string[]) {
  return fields.reduce<Record<string, string>>((acc, key) => {
    const value = getString(formData, key);
    if (value) acc[key] = value;
    return acc;
  }, {});
}

export async function createOrder(formData: FormData) {
  const { supabase, user, profile } = await requireProfile();
  const id = getString(formData, "id") || `CA-${Date.now().toString().slice(-6)}`;
  const techFee = Math.min(getNumber(formData, "tech_fee_amount") ?? 0, 9.99);
  const status = getString(formData, "status") || "new";

  const { error } = await supabase.from("orders").insert({
    id,
    organization_id: profile.organization_id,
    client: getString(formData, "client"),
    client_user: getString(formData, "client_user"),
    borrower: getString(formData, "borrower"),
    property_address: getString(formData, "property_address"),
    city: getString(formData, "city"),
    state: getString(formData, "state"),
    zip: getString(formData, "zip"),
    county: getString(formData, "county"),
    product: getString(formData, "product") || "1004 (UAD) - URAR",
    loan_type: getString(formData, "loan_type"),
    intended_use: getString(formData, "intended_use"),
    occupancy: getString(formData, "occupancy"),
    sale_price: getNumber(formData, "sale_price"),
    amc: getString(formData, "amc"),
    status,
    current_status: getString(formData, "current_status"),
    priority: getString(formData, "priority") || "Normal",
    due_date: getString(formData, "due_date"),
    date_needed: getString(formData, "date_needed"),
    inspection_scheduled_at: getString(formData, "inspection_scheduled_at"),
    fee_amount: getNumber(formData, "fee_amount"),
    appraiser_fee: getNumber(formData, "appraiser_fee"),
    tech_fee_amount: techFee,
    progress: 0,
    warning: getString(formData, "warning"),
    contact_name: getString(formData, "contact_name"),
    contact_phone: getString(formData, "contact_phone"),
    contact_email: getString(formData, "contact_email"),
    notes: getString(formData, "notes"),
    created_by: user.id
  });

  if (error) redirect(`/orders/new?error=${encodeURIComponent(error.message)}`);

  await supabase.from("order_status_history").insert({
    order_id: id,
    organization_id: profile.organization_id,
    status,
    message: "Order created.",
    actor_id: user.id
  });
  await supabase.from("audit_events").insert({
    organization_id: profile.organization_id,
    order_id: id,
    actor_id: user.id,
    event_type: "order.created",
    metadata: auditMetadata(formData, ["client", "borrower", "property_address", "fee_amount"])
  });

  revalidatePath("/dashboard");
  revalidatePath("/orders/open");
  redirect(`/orders/${id}`);
}

export async function updateOrder(formData: FormData) {
  const { supabase, user, profile } = await requireProfile();
  const id = getString(formData, "id");
  if (!id) redirect("/orders/open");
  const status = getString(formData, "status") || "new";
  const progress = getNumber(formData, "progress");
  const techFee = Math.min(getNumber(formData, "tech_fee_amount") ?? 0, 9.99);

  const payload = {
    client: getString(formData, "client"),
    client_user: getString(formData, "client_user"),
    borrower: getString(formData, "borrower"),
    property_address: getString(formData, "property_address"),
    city: getString(formData, "city"),
    state: getString(formData, "state"),
    zip: getString(formData, "zip"),
    county: getString(formData, "county"),
    product: getString(formData, "product"),
    loan_type: getString(formData, "loan_type"),
    intended_use: getString(formData, "intended_use"),
    occupancy: getString(formData, "occupancy"),
    sale_price: getNumber(formData, "sale_price"),
    amc: getString(formData, "amc"),
    status,
    current_status: getString(formData, "current_status"),
    priority: getString(formData, "priority") || "Normal",
    due_date: getString(formData, "due_date"),
    date_needed: getString(formData, "date_needed"),
    inspection_scheduled_at: getString(formData, "inspection_scheduled_at"),
    fee_amount: getNumber(formData, "fee_amount"),
    appraiser_fee: getNumber(formData, "appraiser_fee"),
    tech_fee_amount: techFee,
    progress: progress ?? 0,
    warning: getString(formData, "warning"),
    contact_name: getString(formData, "contact_name"),
    contact_phone: getString(formData, "contact_phone"),
    contact_email: getString(formData, "contact_email"),
    notes: getString(formData, "notes")
  };

  const { error } = await supabase.from("orders").update(payload).eq("id", id).eq("organization_id", profile.organization_id);
  if (error) redirect(`/orders/${id}?error=${encodeURIComponent(error.message)}`);

  await supabase.from("order_status_history").insert({
    order_id: id,
    organization_id: profile.organization_id,
    status,
    message: getString(formData, "history_message") || "Order details updated.",
    actor_id: user.id
  });
  await supabase.from("audit_events").insert({ organization_id: profile.organization_id, order_id: id, actor_id: user.id, event_type: "order.updated", metadata: { status } });

  revalidatePath(`/orders/${id}`);
  revalidatePath("/orders/open");
  revalidatePath("/dashboard");
  redirect(`/orders/${id}?saved=1`);
}

export async function addOrderNote(formData: FormData) {
  const { supabase, user, profile } = await requireProfile();
  const orderId = getString(formData, "order_id");
  const body = getString(formData, "body");
  const visibility = getString(formData, "visibility") || "internal";
  if (!orderId || !body) redirect(`/orders/${orderId}`);
  const { error } = await supabase.from("order_notes").insert({ order_id: orderId, organization_id: profile.organization_id, body, visibility, created_by: user.id });
  if (error) redirect(`/orders/${orderId}?error=${encodeURIComponent(error.message)}`);
  await supabase.from("order_status_history").insert({ order_id: orderId, organization_id: profile.organization_id, status: getString(formData, "status") || "new", message: body, actor_id: user.id });
  await supabase.from("audit_events").insert({ organization_id: profile.organization_id, order_id: orderId, actor_id: user.id, event_type: "order.note_added", metadata: { visibility } });
  revalidatePath(`/orders/${orderId}`);
  redirect(`/orders/${orderId}?saved=1`);
}

export async function addDocumentRecord(formData: FormData) {
  const { supabase, user, profile } = await requireProfile();
  const orderId = getString(formData, "order_id");
  const filename = getString(formData, "filename");
  const documentType = getString(formData, "document_type") || "Other";
  const visibility = getString(formData, "visibility") || "internal";
  if (!orderId || !filename) redirect(`/orders/${orderId}`);
  const { error } = await supabase.from("documents").insert({
    order_id: orderId,
    organization_id: profile.organization_id,
    filename,
    storage_path: `${profile.organization_id}/${orderId}/${filename}`,
    document_type: documentType,
    visibility,
    uploaded_by: user.id
  });
  if (error) redirect(`/orders/${orderId}?error=${encodeURIComponent(error.message)}`);
  await supabase.from("order_status_history").insert({ order_id: orderId, organization_id: profile.organization_id, status: "new", message: `Document added: ${filename}`, actor_id: user.id });
  await supabase.from("audit_events").insert({ organization_id: profile.organization_id, order_id: orderId, actor_id: user.id, event_type: "document.added", metadata: { filename, documentType, visibility } });
  revalidatePath(`/orders/${orderId}`);
  redirect(`/orders/${orderId}?saved=1`);
}

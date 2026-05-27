import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { OrderForm } from "@/components/forms/order-form";

export const metadata = { title: "Create Appraisal Order", description: "Create a new appraisal order in Caarps Appraisal OS." };

export default async function NewOrderPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return <AppShell title="Create New Order" subtitle="Functional Supabase order intake"><Card><CardContent className="p-6"><OrderForm error={params.error}/></CardContent></Card></AppShell>;
}

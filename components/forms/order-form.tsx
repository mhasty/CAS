import { createOrder } from "@/lib/actions/orders";
import { Button } from "@/components/ui/button";

export function OrderForm({ error }: { error?: string }) {
  const input = "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400";
  return (
    <form action={createOrder} className="space-y-5">
      {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">Order ID<input name="id" className={input} placeholder="CA-10500" /></label>
        <label className="space-y-2 text-sm font-medium">Client / lender<input name="client" required className={input} placeholder="Northstar Lending" /></label>
        <label className="space-y-2 text-sm font-medium">Borrower<input name="borrower" required className={input} placeholder="Borrower name" /></label>
        <label className="space-y-2 text-sm font-medium">AMC / source<input name="amc" className={input} placeholder="Direct, AMC, VMS import" /></label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">Property address<input name="property_address" required className={input} placeholder="123 Main St, City, ST" /></label>
        <label className="space-y-2 text-sm font-medium">Due date<input name="due_date" className={input} placeholder="2026-06-01" /></label>
        <label className="space-y-2 text-sm font-medium">Fee amount<input name="fee_amount" type="number" step="0.01" className={input} placeholder="625.00" /></label>
        <label className="space-y-2 text-sm font-medium">Tech fee<input name="tech_fee_amount" type="number" step="0.01" max="9.99" className={input} placeholder="9.99" /></label>
        <label className="space-y-2 text-sm font-medium">Priority<select name="priority" className={input} defaultValue="Normal"><option>Normal</option><option>High</option><option>Rush</option></select></label>
      </div>
      <div className="flex justify-end gap-3"><Button type="submit">Create order</Button></div>
    </form>
  );
}

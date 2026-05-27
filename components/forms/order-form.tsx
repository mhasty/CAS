import { createOrder } from "@/lib/actions/orders";
import { Button } from "@/components/ui/button";

export function OrderForm({ error }: { error?: string }) {
  const input = "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400";
  return (
    <form action={createOrder} className="space-y-6">
      {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
      <section>
        <h3 className="font-semibold">Reference + Client</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm font-medium">Order ID<input name="id" className={input} placeholder="CA-10500" /></label>
          <label className="space-y-2 text-sm font-medium">Client / lender<input name="client" required className={input} placeholder="Northstar Lending" /></label>
          <label className="space-y-2 text-sm font-medium">Client user / ordered by<input name="client_user" className={input} placeholder="Adam Coston" /></label>
          <label className="space-y-2 text-sm font-medium">Borrower<input name="borrower" required className={input} placeholder="Borrower name" /></label>
          <label className="space-y-2 text-sm font-medium">AMC / source<input name="amc" className={input} placeholder="Direct, AMC, VMS import" /></label>
          <label className="space-y-2 text-sm font-medium">Status<select name="status" className={input} defaultValue="new"><option value="new">New</option><option value="assigned">Assigned</option><option value="inspection_scheduled">Inspection Scheduled</option><option value="review_hold">Review Hold</option><option value="portal_ready">Portal Ready</option></select></label>
        </div>
      </section>
      <section>
        <h3 className="font-semibold">Subject Property</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <label className="space-y-2 text-sm font-medium md:col-span-2">Property address<input name="property_address" required className={input} placeholder="123 Main St" /></label>
          <label className="space-y-2 text-sm font-medium">City<input name="city" className={input} placeholder="Greenville" /></label>
          <label className="space-y-2 text-sm font-medium">State<input name="state" className={input} placeholder="SC" /></label>
          <label className="space-y-2 text-sm font-medium">Zip<input name="zip" className={input} placeholder="29601" /></label>
          <label className="space-y-2 text-sm font-medium">County<input name="county" className={input} placeholder="Greenville" /></label>
          <label className="space-y-2 text-sm font-medium">Product<input name="product" className={input} placeholder="1004 (UAD) - URAR" /></label>
          <label className="space-y-2 text-sm font-medium">Loan Type<input name="loan_type" className={input} placeholder="VA / FHA / Conventional" /></label>
          <label className="space-y-2 text-sm font-medium">Intended Use<input name="intended_use" className={input} placeholder="Purchase" /></label>
          <label className="space-y-2 text-sm font-medium">Occupancy<input name="occupancy" className={input} placeholder="Primary Residence" /></label>
          <label className="space-y-2 text-sm font-medium">Sale Price<input name="sale_price" type="number" step="0.01" className={input} placeholder="985000" /></label>
        </div>
      </section>
      <section>
        <h3 className="font-semibold">Scheduling + Billing</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <label className="space-y-2 text-sm font-medium">Due date<input name="due_date" className={input} placeholder="2026-06-01" /></label>
          <label className="space-y-2 text-sm font-medium">Date needed<input name="date_needed" className={input} placeholder="6/2/2026" /></label>
          <label className="space-y-2 text-sm font-medium">Inspection scheduled<input name="inspection_scheduled_at" className={input} placeholder="5/28/2026 10:30 AM" /></label>
          <label className="space-y-2 text-sm font-medium">Priority<select name="priority" className={input} defaultValue="Normal"><option>Normal</option><option>High</option><option>Rush</option><option>On Hold</option></select></label>
          <label className="space-y-2 text-sm font-medium">Fee amount<input name="fee_amount" type="number" step="0.01" className={input} placeholder="650.00" /></label>
          <label className="space-y-2 text-sm font-medium">Appraiser fee<input name="appraiser_fee" type="number" step="0.01" className={input} placeholder="292.50" /></label>
          <label className="space-y-2 text-sm font-medium">Tech fee<input name="tech_fee_amount" type="number" step="0.01" max="9.99" className={input} placeholder="9.99" /></label>
          <label className="space-y-2 text-sm font-medium">Contact name<input name="contact_name" className={input} placeholder="Trish Hollon" /></label>
          <label className="space-y-2 text-sm font-medium">Contact phone<input name="contact_phone" className={input} placeholder="(864)590-6337" /></label>
          <label className="space-y-2 text-sm font-medium">Contact email<input name="contact_email" className={input} placeholder="name@example.com" /></label>
        </div>
      </section>
      <section className="grid gap-4">
        <label className="space-y-2 text-sm font-medium">Current status<textarea name="current_status" rows={3} className={input} placeholder="Client asked us to pause working on this assignment." /></label>
        <label className="space-y-2 text-sm font-medium">Office notes / instructions<textarea name="notes" rows={4} className={input} placeholder="Special instructions, property access, prior work, or client details." /></label>
      </section>
      <div className="flex justify-end gap-3"><Button type="submit">Create order</Button></div>
    </form>
  );
}

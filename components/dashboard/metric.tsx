import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
export function Metric({ icon: Icon, label, value, helper }: { icon: LucideIcon; label: string; value: string; helper: string }) {
  return <Card><CardContent><div className="flex items-start justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-500">{helper}</p></div><div className="rounded-2xl bg-slate-100 p-3 text-slate-700"><Icon size={20}/></div></div></CardContent></Card>;
}

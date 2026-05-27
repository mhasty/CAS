import { AlertTriangle, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const findings = [
  { sev: "Critical", rule: "Subject/contract mismatch", detail: "Purchase price in XML is $418,000; engagement letter shows $410,000.", owner: "Reviewer" },
  { sev: "Warning", rule: "Comparable distance", detail: "Comp 4 is 7.8 miles away and lacks narrative support for market distance.", owner: "Appraiser" },
  { sev: "Warning", rule: "UAD 3.6 completeness", detail: "Quality rating rationale present, but condition rating support is thin.", owner: "Appraiser" },
  { sev: "Info", rule: "Legacy URAR parse", detail: "Old 1004 XML detected and normalized to canonical Caarps fields.", owner: "System" }
];

export function ReviewFindings() {
  return <Card><CardContent className="p-0"><div className="border-b border-slate-200 p-5"><h3 className="font-semibold">Pre-submit appraisal review</h3><p className="text-sm text-slate-500">Critical findings block submission; warnings require acknowledgement.</p></div><div className="divide-y divide-slate-100">{findings.map((f, i) => <div key={i} className="p-5"><div className="flex items-start gap-3"><div className={`mt-1 rounded-xl p-2 ${f.sev === "Critical" ? "bg-rose-50 text-rose-700" : f.sev === "Warning" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{f.sev === "Critical" ? <AlertTriangle size={18}/> : <ClipboardCheck size={18}/>}</div><div className="flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">{f.rule}</p><span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{f.owner}</span></div><p className="mt-1 text-sm leading-6 text-slate-500">{f.detail}</p><div className="mt-3 flex gap-2"><Button variant="outline" className="px-3 py-1 text-xs">Assign</Button><Button variant="outline" className="px-3 py-1 text-xs">Acknowledge</Button><Button variant="outline" className="px-3 py-1 text-xs">Request revision</Button></div></div></div></div>)}</div></CardContent></Card>;
}

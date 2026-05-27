import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" };
export function Button({ className, variant = "default", ...props }: Props) {
  return <button className={cn("inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition disabled:opacity-50", variant === "default" && "bg-slate-950 text-white hover:bg-slate-800", variant === "outline" && "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50", variant === "ghost" && "text-slate-700 hover:bg-slate-100", className)} {...props} />;
}
export function buttonClassName(variant: Props["variant"] = "default", className?: string) {
  return cn("inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition disabled:opacity-50", variant === "default" && "bg-slate-950 text-white hover:bg-slate-800", variant === "outline" && "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50", variant === "ghost" && "text-slate-700 hover:bg-slate-100", className);
}

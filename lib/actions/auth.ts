"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function signIn(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const redirectedFrom = getString(formData, "redirectedFrom") || "/dashboard";
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect(redirectedFrom.startsWith("/") ? redirectedFrom : "/dashboard");
}

export async function signUp(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const fullName = getString(formData, "full_name");
  const organizationName = getString(formData, "organization_name") || "My Appraisal Company";
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, organization_name: organizationName, role: "administrator" } }
  });
  if (error) redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  redirect("/login?message=Check your email to confirm your account, then sign in.");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

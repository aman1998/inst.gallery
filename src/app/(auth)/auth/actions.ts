"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@shared/config/supabase/server";

export async function signInWithOAuth(provider: Provider, redirectTo: string, scopes?: string) {
  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      scopes,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) {
    throw new Error("error");
  }
  if (data.url) {
    redirect(data.url);
  }
}

export async function loginAnonymously() {
  const supabase = createClient();
  const { error: signInError } = await supabase.auth.signInAnonymously();
  const { error: updateUserError } = await supabase.auth.updateUser({
    email: `anonymous+${Date.now().toString(36)}@example.com`,
  });

  if (signInError || updateUserError) {
    return { error: true };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

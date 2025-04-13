"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@shared/config/supabase/server";
import { ROUTES } from "@shared/config/routes";

export const restoreEmailServer = async (email: string, emailRedirectTo: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: emailRedirectTo,
  });

  if (error) {
    console.log("error =>", error.message);
    throw new Error(error.message);
  }
  revalidatePath("/", "layout");
  redirect(ROUTES.signUpConfirm);
};

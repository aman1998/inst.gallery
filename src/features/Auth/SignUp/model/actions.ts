"use server";

import { redirect } from "next/navigation";

import { ISignUp } from "@features/Auth/SignUp/model/types";

import { createClient } from "@shared/config/supabase/server";
import { ROUTES } from "@shared/config/routes";

export const signUpServer = async (data: ISignUp, emailRedirectTo: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    console.log("error.message =>", error.message);
    throw new Error(error.message);
  }
  // revalidatePath(ROUTES.signUp, "Block");
  redirect(ROUTES.signUpConfirm);
};

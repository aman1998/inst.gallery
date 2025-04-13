"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@shared/config/supabase/server";

export const newPasswordEmailServer = async (new_password: string) => {
  const supabase = createClient();

  const {
    error,
    data: { user },
  } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (error) {
    throw new Error("error");
  }
  revalidatePath("/", "layout");

  return user;
};

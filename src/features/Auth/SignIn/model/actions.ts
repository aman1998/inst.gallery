"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { TUser } from "@entities/User/model/types";

import { createClient } from "@shared/config/supabase/server";
import { TNullable } from "@shared/types/common";

import { ISignIn } from "./types";

export const loginServer = async (data: ISignIn): Promise<TNullable<TUser>> => {
  const supabase = createClient();

  const {
    error,
    data: { user },
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");

  return user;
};

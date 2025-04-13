"use client";

import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";

import { TUser } from "@entities/User/model/types";

import { TNullable } from "@shared/types/common";

interface ISupabaseContextType {
  supabase: SupabaseClient;
}

export const SupabaseContext = React.createContext<ISupabaseContextType | undefined>(undefined);

export const useSupabase = (): ISupabaseContextType => {
  const context = React.useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};

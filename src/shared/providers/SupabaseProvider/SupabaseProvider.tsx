"use client";

import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";

import { SupabaseContext } from "@shared/providers/SupabaseProvider/lib/useSupabase";

interface Props {
  children: React.ReactNode;
  supabase: SupabaseClient;
}
const SupabaseProvider: React.FC<Props> = ({ children, supabase }) => (
  <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
);

export default SupabaseProvider;

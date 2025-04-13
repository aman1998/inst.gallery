import React from "react";
import { redirect } from "next/navigation";

import { createClient } from "@shared/config/supabase/server";
import { ROUTES } from "@shared/config/routes";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = async ({ children }) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect(ROUTES.signIn);
  }
  return <>{children}</>;
};

export default ProtectedLayout;

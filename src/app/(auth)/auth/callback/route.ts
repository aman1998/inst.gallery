import { NextResponse } from "next/server";

import { createClient } from "@shared/config/supabase/server";
import { EQueryParam } from "@shared/types/query";
import { ROUTES } from "@shared/config/routes";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get(EQueryParam.code);
  const next = searchParams.get("next") ?? ROUTES.customize;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error Block with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}

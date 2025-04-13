import { type NextRequest } from "next/server";

import { updateSession } from "@shared/config/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/profile/:path*", "/customize/:path*", "/auth/:path*", "/api/:path*"],
};

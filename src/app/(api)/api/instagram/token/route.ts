import { NextResponse } from "next/server";

import { EStorageKey } from "@shared/types/storage";
import { deleteCookie, setCookie } from "@shared/utils/cookies";

export async function DELETE() {
  try {
    await setCookie({
      name: EStorageKey.instagram_token,
      value: "",
      path: "/api",
      maxAge: 0,
    });

    await setCookie({
      name: EStorageKey.instagram_token_expired,
      value: "",
      path: "/api",
      maxAge: 0,
    });

    return NextResponse.json({ message: "Instagram token removed successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

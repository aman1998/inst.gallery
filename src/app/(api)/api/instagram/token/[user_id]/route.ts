import { NextResponse } from "next/server";

import { EStorageKey } from "@shared/types/storage";
import { deleteCookie, setCookie } from "@shared/utils/cookies";

export async function DELETE(_request: Request, { params }: { params: { user_id: string } }) {
  try {
    const { user_id } = params;

    await setCookie({
      name: EStorageKey.instagram_token + user_id,
      value: "",
      path: "/api",
      maxAge: 0,
    });

    await setCookie({
      name: EStorageKey.instagram_token_expired + user_id,
      value: "",
      path: "/api",
      maxAge: 0,
    });

    return NextResponse.json({ message: "Instagram token removed successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

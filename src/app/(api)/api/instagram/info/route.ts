import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getRefreshInstagramToken } from "@entities/Instagram/model/actions";

import { EStorageKey } from "@shared/types/storage";
import { ROUTES } from "@shared/config/routes";
import { getCookie } from "@shared/utils/cookies";
import { FIFTY_DAYS_IN_SECONDS } from "@shared/constants/times";

export async function GET() {
  try {
    let token = await getCookie(EStorageKey.instagram_token);
    const tokenIssueTime = await getCookie(EStorageKey.instagram_token_expired);

    if (!token || !tokenIssueTime) {
      return NextResponse.json({ error: "No valid token found." }, { status: 401 });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeElapsed = currentTime - parseInt(tokenIssueTime as string);

    if (timeElapsed > FIFTY_DAYS_IN_SECONDS) {
      token = await getRefreshInstagramToken(token);
      revalidatePath(ROUTES.customize);
    }

    // eslint-disable-next-line max-len
    const userInfoUrl = `https://graph.instagram.com/me?fields=id,username,media_count,profile_picture_url&access_token=${token}`;
    const response = await fetch(userInfoUrl, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getRefreshInstagramToken } from "@entities/Instagram/model/actions";

import { EStorageKey } from "@shared/types/storage";
import { ROUTES } from "@shared/config/routes";
import { getCookie } from "@shared/utils/cookies";
import { FIFTY_DAYS_IN_SECONDS } from "@shared/constants/times";

export async function GET(_request: Request, { params }: { params: { user_id: string } }) {
  try {
    const { user_id } = params;

    const { searchParams } = new URL(_request.url);
    const afterCursor = searchParams.get("after") || "";

    let token = await getCookie(EStorageKey.instagram_token + user_id);
    const tokenIssueTime = await getCookie(EStorageKey.instagram_token_expired + user_id);

    if (!token || !tokenIssueTime) {
      return NextResponse.json({ error: "No valid token found." }, { status: 401 });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeElapsed = currentTime - parseInt(tokenIssueTime as string);

    if (timeElapsed > FIFTY_DAYS_IN_SECONDS) {
      token = await getRefreshInstagramToken(token, user_id);
      revalidatePath(ROUTES.customize);
    }

    const fields = [
      "id",
      "username",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "timestamp",
      "permalink",
      "children{id,media_url,media_type,thumbnail_url}",
    ];

    // eslint-disable-next-line max-len
    let instagramApiUrl = `https://graph.instagram.com/me/media?fields=${fields.join(",")}&access_token=${token}&limit=50`;

    if (afterCursor) {
      instagramApiUrl += `&after=${afterCursor}`;
    }

    const response = await fetch(instagramApiUrl, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

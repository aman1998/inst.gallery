import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { IInstagramAccessToken } from "@entities/Instagram/model/types";

import { EStorageKey } from "@shared/types/storage";
import { ROUTES } from "@shared/config/routes";
import { setCookie } from "@shared/utils/cookies";

const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const INSTAGRAM_LONG_LIVED_TOKEN_URL = "https://graph.instagram.com/access_token";
const CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID!;
const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET!;
const REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI!;

// Работа с несколькими инстаграм аккаунтами

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code not found" }, { status: 400 });
  }

  const cleanedCode = code.replace(/#_$/, "");

  try {
    // Получение короткоживущего токена
    const response = await fetch(INSTAGRAM_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code: cleanedCode,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("error 1111111111", errorData.error_message || "Failed to exchange code for token");
      throw new Error(errorData.error_message || "Failed to exchange code for token");
    }

    const data = await response.json();
    const shortLivedToken = data.access_token;
    const userId = data.user_id;

    // Обмен короткоживущего токена на долгоживущий токен
    const longLivedResponse = await fetch(
      `${INSTAGRAM_LONG_LIVED_TOKEN_URL}?${new URLSearchParams({
        grant_type: "ig_exchange_token",
        client_secret: CLIENT_SECRET,
        access_token: shortLivedToken,
      })}`,
      {
        cache: "no-store",
      }
    );

    if (!longLivedResponse.ok) {
      const errorData = await longLivedResponse.json();
      console.log("error 22222222222", errorData.error_message || "Failed to exchange code for token");
      throw new Error(errorData.error_message || "Failed to exchange token for long-lived token");
    }

    const longLivedData = await longLivedResponse.json();

    if (!longLivedData?.access_token || !userId) {
      throw new Error("Failed to retrieve access token or user ID from Instagram");
    }

    const instagramToken = {
      access_token: longLivedData.access_token,
      expires_in: longLivedData.expires_in,
      user_id: userId,
    } as IInstagramAccessToken;

    // Сохраняем токен и user_id в куки
    await setCookie({
      name: EStorageKey.instagram_token + userId,
      value: instagramToken.access_token,
      path: "/api",
      maxAge: instagramToken.expires_in,
    });

    await setCookie({
      name: EStorageKey.instagram_token_expired + userId,
      value: instagramToken.expires_in.toString(),
      path: "/api",
      maxAge: instagramToken.expires_in,
    });

    revalidatePath(ROUTES.profile);

    return NextResponse.json({ user_id: userId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

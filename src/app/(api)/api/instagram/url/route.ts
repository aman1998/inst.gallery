import { NextResponse } from "next/server";

const INSTAGRAM_AUTH_URL = "https://api.instagram.com/oauth/authorize";

const CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID!;
const REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI!;
const SCOPES = ["instagram_business_basic", "instagram_business_content_publish"].join(",");

export async function GET() {
  const params = new URLSearchParams({
    enable_fb_login: "0", // Отключение входа через Facebook
    force_authentication: "1", // Принудительный вход через Instagram
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES,
  });

  const redirectUrl = `${INSTAGRAM_AUTH_URL}?${params.toString()}`;
  return NextResponse.redirect(redirectUrl);
}

import { setCookie } from "@shared/utils/cookies";
import { EStorageKey } from "@shared/types/storage";

const INSTAGRAM_LONG_LIVED_TOKEN_URL = "https://graph.instagram.com/refresh_access_token";

export const getRefreshInstagramToken = async (oldToken: string, user_id?: string) => {
  const response = await fetch(
    `${INSTAGRAM_LONG_LIVED_TOKEN_URL}?grant_type=ig_refresh_token&access_token=${oldToken}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error_message || "Failed to refresh token");
  }

  const refreshedToken = await response.json();

  await setCookie({
    name: user_id ? EStorageKey.instagram_token + user_id : EStorageKey.instagram_token,
    value: refreshedToken.access_token,
    path: "/api",
    maxAge: refreshedToken.expires_in,
  });

  await setCookie({
    name: user_id ? EStorageKey.instagram_token_expired + user_id : EStorageKey.instagram_token_expired,
    value: refreshedToken.expires_in.toString(),
    path: "/api",
    maxAge: refreshedToken.expires_in,
  });

  return refreshedToken.access_token;
};

export const handleInstagramTokenError = (errorData: any) => {
  if (errorData.error && errorData.error.code === 190) {
    switch (errorData.error.error_subcode) {
      case 460: // Токен истек
      case 463: // Токен истек
        return { message: "Token expired. Please refresh.", status: 401 };
      case 467: // Токен невалидный
        return { message: "Invalid token. Please log in again.", status: 401 };
      default:
        return { message: "Token error: " + errorData.error.message, status: 400 };
    }
  }
  return { message: "Unexpected error: " + errorData.error.message, status: 400 };
};

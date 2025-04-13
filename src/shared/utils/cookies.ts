import { cookies } from "next/headers";

interface ICookies {
  name: string;
  value: string;
  maxAge?: number;
  path?: string;
}

export const setCookie = async ({ value, path, maxAge, name }: ICookies) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value,
    path,
    maxAge,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();

  const token = cookieStore.get(key);

  return token?.value;
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();

  cookieStore.delete(key);
};

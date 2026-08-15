import { cookies } from "next/headers";

const PENDING_AUTH_COOKIE = "pending_auth_id";
const COOKIE_MAX_AGE_SECONDS = 300; // match OTP_TTL_SECONDS

export async function setPendingAuthCookie(pendingAuthId: string) {
  const cookieStore = await cookies();
  cookieStore.set(PENDING_AUTH_COOKIE, pendingAuthId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function getPendingAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(PENDING_AUTH_COOKIE)?.value ?? null;
}

export async function clearPendingAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(PENDING_AUTH_COOKIE);
}

// Auth session cookies (access + refresh)
const ACCESS_TOKEN_MAX_AGE = 60 * 15; // 15 min
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

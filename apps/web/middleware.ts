import {
  isSessionValid,
  rotateRefreshToken,
} from "@/features/auth/services/session.service";
import {
  signAccessToken,
  verifyAccessToken,
} from "@/features/auth/services/token.service";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const AUTH_ROUTES = ["/signin", "/signup", "/verify-otp"];
const PROTECTED_PREFIXES = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  let isAuthenticated = false;
  let newCookies: { accessToken: string; refreshToken: string } | null = null;

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);
      isAuthenticated = await isSessionValid(payload.userId, payload.sessionId);
    } catch {
      // expired/invalid — fall through to rotation attempt below
    }
  }

  if (!isAuthenticated && refreshToken) {
    const rotated = await rotateRefreshToken(refreshToken);
    if (rotated) {
      isAuthenticated = true;
      newCookies = {
        accessToken: signAccessToken({
          userId: rotated.userId,
          sessionId: rotated.sessionId,
        }),
        refreshToken: rotated.refreshToken,
      };
    }
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname);
    const response = NextResponse.redirect(signInUrl);
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  const response = NextResponse.next();

  if (newCookies) {
    response.cookies.set("access_token", newCookies.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });
    response.cookies.set("refresh_token", newCookies.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};

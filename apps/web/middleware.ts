import { isSessionValid } from "@/features/auth/services/session.service";
import { verifyAccessToken } from "@/features/auth/services/token.service";
import { NextRequest, NextResponse } from "next/server";

// Run on Node.js runtime, not Edge — required since jsonwebtoken and
// ioredis (@repo/redis) both use Node APIs unavailable on Edge.
export const runtime = "nodejs";

// Pages a logged-in user should NOT be able to visit (redirect to /dashboard)
const AUTH_ROUTES = ["/signin", "/signup", "/verify-otp"];

// Prefix for routes that require a logged-in user (redirect to /signin)
const PROTECTED_PREFIXES = ["/dashboard"];

async function getValidSession(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  if (!accessToken) return null;

  try {
    const payload = verifyAccessToken(accessToken); // throws if expired/invalid signature
    const valid = await isSessionValid(payload.userId, payload.sessionId);
    return valid ? payload : null;
  } catch {
    return null; // expired or tampered token
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getValidSession(request);

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Requirement 1: logged-in users can't reach signup/signin/verify-otp
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Requirement 2: logged-out users can't reach protected routes
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/signin", request.url);
    // Preserve where they were trying to go, so we can send them back
    // after a successful login instead of always landing on /dashboard.
    signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Only run middleware on routes that actually need it — skips static
// assets, images, and Next internals for performance.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};

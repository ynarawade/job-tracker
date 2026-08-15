import { rotateRefreshToken } from "@/features/auth/services/session.service";
import { signAccessToken } from "@/features/auth/services/token.service";
import { clearAuthCookies, setAuthCookies } from "@/lib/cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "Not logged in" },
      { status: 401 }
    );
  }

  const rotated = await rotateRefreshToken(refreshToken);

  if (!rotated) {
    await clearAuthCookies();
    return NextResponse.json(
      { success: false, message: "Session expired. Please sign in again." },
      { status: 401 }
    );
  }

  const accessToken = signAccessToken({
    userId: rotated.userId,
    sessionId: rotated.sessionId,
  });

  await setAuthCookies(accessToken, rotated.refreshToken);

  return NextResponse.json({ success: true, message: "Token refreshed" });
}

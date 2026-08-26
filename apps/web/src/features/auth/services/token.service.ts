import jwt from "jsonwebtoken";
import { ApiError } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY = "15m";

export type AccessTokenPayload = {
  userId: string;
  sessionId: string;
};

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

/**
 * Verifies signature + expiry only. Does NOT check Redis — that's a
 * separate step (isSessionValid) done by whoever calls this, since
 * this function has no knowledge of the current "active" session.
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
}

export async function getCurrentUserId(): Promise<string> {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    throw new ApiError(401, "Not authenticated");
  }

  try {
    const payload = verifyAccessToken(accessToken);
    return payload.userId;
  } catch {
    throw new ApiError(401, "Session expired or invalid");
  }
}

import jwt from "jsonwebtoken";

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

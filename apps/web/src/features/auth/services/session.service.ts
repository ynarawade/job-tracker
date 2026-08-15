import { redis } from "@repo/redis";
import crypto from "node:crypto";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days — matches refresh token lifetime

type SessionRecord = {
  sessionId: string;
  refreshTokenHash: string;
  createdAt: number; // set once at login, never touched by token rotation
};

const sessionKey = (userId: string) => `session:${userId}`;

// hashes the refresh token
const hashToken = (token: string): string =>
  crypto.createHash("sha256").update(token).digest("hex");

// builds refresh token {userid.random sting}
const buildRefreshToken = (userId: string): string =>
  `${userId}.${crypto.randomBytes(32).toString("hex")}`;

// parses the token and return the userid if exist
function parseRefreshToken(refreshToken: string): { userId: string } | null {
  const [userId, random] = refreshToken.split(".");
  if (!userId || !random) return null;
  return { userId };
}

// create session
export const createSession = async (userId: string) => {
  // create an session id for user
  const sessionId = crypto.randomUUID();

  // create refresh token for user, non jwt
  const refreshToken = buildRefreshToken(userId);

  // creating the record
  const record: SessionRecord = {
    sessionId,
    refreshTokenHash: hashToken(refreshToken),
    createdAt: Date.now(),
  };

  // store the session record in redis
  await redis.set(
    sessionKey(userId),
    JSON.stringify(record),
    "EX",
    SESSION_TTL_SECONDS
  );

  return { sessionId, refreshToken };
};

// Confirms the given sessionId is still the active one for this user. used by middlewares
export const isSessionValid = async (
  userId: string,
  sessionId: string
): Promise<boolean> => {
  const raw = await redis.get(sessionKey(userId));
  if (!raw) return false;

  const record: SessionRecord = JSON.parse(raw);
  return record.sessionId === sessionId;
};

// Validates + rotates a refresh token in one step
export const rotateRefreshToken = async (submittedRefreshToken: string) => {
  // parse the token and get userID
  const parsed = parseRefreshToken(submittedRefreshToken);
  if (!parsed) return null;

  // confirms its hash matches the stored session
  const raw = await redis.get(sessionKey(parsed.userId));
  if (!raw) return false;

  const record: SessionRecord = JSON.parse(raw);
  if (record.refreshTokenHash !== hashToken(submittedRefreshToken)) {
    return null; // stale/reused token — doesn't match current session
  }

  // issues a NEW refresh token, overwrites the hash
  const newRefreshToken = buildRefreshToken(parsed.userId);

  const updatedRecord: SessionRecord = {
    sessionId: record.sessionId, // same session
    createdAt: record.createdAt, // original login time
    refreshTokenHash: hashToken(newRefreshToken),
  };

  await redis.set(
    sessionKey(parsed.userId),
    JSON.stringify(updatedRecord),
    "EX",
    SESSION_TTL_SECONDS // reset TTL — sliding expiry
  );

  return {
    userId: parsed.userId,
    sessionId: record.sessionId,
    refreshToken: newRefreshToken,
  };
};

export const destroySession = async (userId: string) => {
  await redis.del(sessionKey(userId));
};

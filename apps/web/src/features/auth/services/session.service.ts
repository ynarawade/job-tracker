import { redis } from "@repo/redis";
import crypto from "node:crypto";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days — matches refresh token lifetime

type SessionRecord = {
  sessionId: string;
  refreshTokenHash: string;
  createdAt: number;
};

const sessionKey = (userId: string) => `session:${userId}`;

// hashes the refresh token
const hashToken = (token: string): string =>
  crypto.createHash("sha256").update(token).digest("hex");

// create session

export const createSession = async (userId: string) => {
  // create an session id for user
  const sessionId = crypto.randomUUID();

  // create refresh token for user, non jwt
  const refreshToken = crypto.randomBytes(32).toString("hex");

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

// Validates a refresh token against the stored session — used by the  /refresh flow to mint a new access token without re-verifying OTP
export const validateRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<boolean> => {
  const raw = await redis.get(sessionKey(userId));
  if (!raw) return false;

  const record: SessionRecord = JSON.parse(raw);
  return record.refreshTokenHash === hashToken(refreshToken);
};

export const destroySession = async (userId: string) => {
  await redis.del(sessionKey(userId));
};

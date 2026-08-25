import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
  bullmqConnection: Redis | undefined;
};

export const redis =
  globalForRedis.redis ?? new Redis(process.env.REDIS_URL as string);

export const bullmqConnection =
  globalForRedis.bullmqConnection ??
  new Redis(process.env.REDIS_URL as string, {
    maxRetriesPerRequest: null,
  });

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
  globalForRedis.bullmqConnection = bullmqConnection;
}

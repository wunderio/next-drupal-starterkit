import { CacheHandler } from '@neshca/cache-handler';
import createLruHandler from '@neshca/cache-handler/local-lru';
import createRedisHandler from '@neshca/cache-handler/redis-strings';
import { createClient } from 'redis';

CacheHandler.onCreation(async () => {
  let redisHandler;
  // check if Redis is available
  if (process.env.REDIS_AVAILABLE === "True") {
    // always create a Redis client inside the `onCreation` callback
    const client = createClient({
      url: process.env.REDIS_CACHE_HOST ?? 'redis://localhost:6379',
    });

    client.on("error", (error) => {
      console.error("Redis error:", error.message);
    });

    await client.connect();

    redisHandler = await createRedisHandler({
      client,
      keyPrefix: `nextjs-cache:`,
      sharedTagsKey: '_sharedTags_',
      // timeout for the Redis client operations like `get` and `set`
      // after this timeout, the operation will be considered failed and the `localHandler` will be used
      timeoutMs: 2000,
    });
  }

  const localHandler = createLruHandler();

  return {
    handlers: [redisHandler, localHandler],
  };
});

export default CacheHandler;
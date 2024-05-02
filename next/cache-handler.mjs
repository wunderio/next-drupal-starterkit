import { CacheHandler } from '@neshca/cache-handler';
import createLruHandler from '@neshca/cache-handler/local-lru';
import createRedisHandler from '@neshca/cache-handler/redis-strings';
import { createClient } from 'redis';

CacheHandler.onCreation(async () => {
  let redisHandler;
  // TEMPORARY: log the Redis environment variables
  console.log('REDIS_HOST:', process.env.REDIS_HOST);
  console.log('REDIS_PASS:', process.env.REDIS_PASS);
  // Check if the Redis environment variables are set:
  if (process.env.REDIS_HOST) {
    console.log("going with Redis");
    // always create a Redis client inside the `onCreation` callback
    const client = createClient({
      password: process.env.REDIS_PASS,
      socket: {
        port: 6379,
        host: process.env.REDIS_HOST,
      },
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
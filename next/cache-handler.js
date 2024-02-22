// cache-handler.js

const { IncrementalCache } = require("@neshca/cache-handler");
const createRedisCache = require("@neshca/cache-handler/redis-stack").default;
const { createClient } = require("redis");

IncrementalCache.onCreation(async () => {
  let redisCache;

  // check if Redis is available
  if (process.env.REDIS_AVAILABLE) {
    // always create a Redis client inside the `onCreation` callback
    const client = createClient({
      url: process.env.REDIS_CACHE_HOST,
    });
    client.on("error", (error) => {
      console.error("Redis error:", error.message);
    });

    await client.connect();

    // read more about TTL limitations https://caching-tools.github.io/next-shared-cache/configuration/ttl
    // https://github.com/caching-tools/next-shared-cache/blob/canary/packages/cache-handler/src/common-types.ts
    function useTtl(maxAge) {
      // As a default we set this to one day.
      // the maxAge can also be used to calculate the TTL dynamically based on what the
      // revalidate value is set to in getStaticProps for more control.
      return 60 * 60 * 24;
    }

    // https://github.com/caching-tools/next-shared-cache/blob/canary/packages/cache-handler/src/handlers/redis-stack.ts
    redisCache = await createRedisCache({
      client,
      useTtl,
      // prefix for the Redis keys
      keyPrefix: `next-cache:`,
      // timeout for the Redis client operations like `get` and `set`
      timeoutMs: 2000,
    });
  }

  return {
    cache: [redisCache],
    useFileSystem: !redisCache,
  };
});

module.exports = IncrementalCache;

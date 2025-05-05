// @ts-check

import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";

// This should match the REVALIDATE_LONG value in src/lib/constants.ts
const defaultStaleAge = 60 * 10;

CacheHandler.onCreation(async ({ buildId }) => {
  /** @type {import("redis").RedisClientType | undefined} */
  let client;
  /** @type {import("@neshca/cache-handler").Handler | undefined} */
  let handler;

  if (
    // Do not create the Redis handler during the build phase.
    // It has little benefit and can cause issues: https://github.com/caching-tools/next-shared-cache/issues/284
    process.env.NEXT_PHASE !== "phase-production-build" &&
    // Ensure redis env vars are set:
    process.env.REDIS_HOST &&
    process.env.REDIS_PASS
  ) {
    try {
      // Create a Redis client.
      client = createClient({
        socket: {
          port: 6379,
          host: process.env.REDIS_HOST,
        },
        password: process.env.REDIS_PASS,
      });

      // Redis won't work without error handling.
      client.on("error", (e) => {
        console.error("Redis client error:", e);
      });
    } catch (error) {
      console.warn("Failed to create Redis client:", error);
    }

    if (client) {
      try {
        console.info("Connecting Redis client...");

        // Wait for the client to connect.
        // Caveat: This will block the server from starting until the client is connected.
        // And there is no timeout. Make your own timeout if needed.
        await client.connect();
        console.info("Redis client connected.");
      } catch (error) {
        console.warn("Failed to connect Redis client:", error);

        console.warn("Disconnecting the Redis client...");
        // Try to disconnect the client to stop it from reconnecting.
        client
          .disconnect()
          .then(() => {
            console.info("Redis client disconnected.");
          })
          .catch(() => {
            console.warn(
              "Failed to quit the Redis client after failing to connect.",
            );
          });
      }
    }

    if (client?.isReady) {
      /** @type {import("@neshca/cache-handler/redis-strings").CreateRedisStringsHandlerOptions} */
      const redisHandlerOptions = {
        client,
        keyPrefix: `cache-${buildId}:`,
        sharedTagsKey: "_sharedTags_",
        // timeout for the Redis client operations like `get` and `set`
        // after this timeout, the operation will be considered failed and the `localHandler` will be used
        timeoutMs: 3000,
      };

      // Create the Redis Handler if the client is available and connected.
      handler = await createRedisHandler(redisHandlerOptions);
      console.info("Redis handler created.");
    } else {
      // Fallback to LRU handler if Redis client is not available.
      // The application will still work, but the cache will be in memory only and not shared.
      handler = createLruHandler();
      console.warn(
        "Falling back to LRU handler because Redis client is not available.",
      );
    }
  }

  return {
    handlers: [handler],
    ttl: {
      defaultStaleAge,
      estimateExpireAge: (staleAge) => staleAge * 2,
    },
  };
});

export default CacheHandler;

// @ts-check

import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";

// This should match the REVALIDATE_LONG value in src/lib/constants.ts
const defaultStaleAge = 60 * 10;

// Retry connection to Redis up to 5 times with a delay of 2 seconds between each attempt.
const maxRetries = 10;
const retryDelay = 2000;

CacheHandler.onCreation(async ({ buildId }) => {
  /** @type {import("redis").RedisClientType | undefined} */
  let client;
  /** @type {import("@neshca/cache-handler").Handler | undefined} */
  let handler;

  if (
    process.env.NEXT_PHASE !== "phase-production-build" &&
    process.env.REDIS_HOST &&
    process.env.REDIS_PASS
  ) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Create a Redis client.
        client = createClient({
          socket: {
            port: 6379,
            host: process.env.REDIS_HOST,
          },
          password: process.env.REDIS_PASS,
        });

        client.on("error", (e) => {
          throw e;
        });

        console.info("Connecting Redis client...");

        // Wait for the client to connect.
        await client.connect();
        console.info("Redis client connected.");
        break; // Exit the loop if connection is successful
      } catch (error) {
        console.warn(
          `Attempt ${attempt} to connect Redis client failed:`,
          error,
        );
        if (attempt < maxRetries) {
          console.info(`Retrying in ${retryDelay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          console.warn("Max retries reached. Falling back to LRU handler.");
          client = null; // Reset the client to null
        }
      }
    }

    if (client?.isReady) {
      /** @type {import("@neshca/cache-handler/redis-strings").CreateRedisStringsHandlerOptions} */
      const redisHandlerOptions = {
        client,
        keyPrefix: `cache-${buildId}:`,
        sharedTagsKey: "_sharedTags_",
        timeoutMs: 3000,
      };

      handler = await createRedisHandler(redisHandlerOptions);
      console.info("Redis handler created.");
    } else {
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

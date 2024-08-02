// @ts-check

import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";
import fs from "fs/promises";

// We set this to a high value so redis will not automatically delete data on expiration, but keep it
// as stale for a long period. This way, Next will be able to use it for its stale-while-revalidate logic.
const defaultStaleAge = 3600 * 24 * 7;

// This should be set to the same value of the constant of the same name in lib/constants.ts.
const REVALIDATE_LONG = 60 * 10;

const REDIS_CACHE_PREPOPULATE_STATUS_KEY = "CACHE_PREPOPULATE_STATUS_";
const REDIS_CACHE_PREPOPULATE_STATUS_VALUE_STARTED = "STARTED";
const REDIS_CACHE_PREPOPULATE_STATUS_VALUE_COMPLETED = "COMPLETED";
const REDIS_CACHE_PREPOPULATE_STATUS_VALUE_ERRORED = "ERRORED";

CacheHandler.onCreation(async ({ buildId, serverDistDir }) => {
  let client;

  if (
    // Ensure redis env vars are set:
    process.env.REDIS_HOST &&
    process.env.REDIS_PASS &&
    // Do not create the Redis handler during the build phase.
    // It has little benefit and can cause issues: https://github.com/caching-tools/next-shared-cache/issues/284
    process.env.NEXT_PHASE !== "phase-production-build"
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
        throw e;
      });
    } catch (error) {
      console.warn("Failed to create Redis client:", error);
    }
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

  /** @type {import("@neshca/cache-handler").Handler | undefined} */
  let handler;

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

    /**
     * This code will run only when the cache handler is created, so it's a good place to populate the cache.
     * We want to do this only once per deployment even if there are more than one nodejs container running, unless
     * a previous attempt failed. For this reason we store in Redis a special key that stores the status of the cache population process,
     * and use it to determine if the operation should be skipped.
     */

    // Get the status of the initial cache population from Redis:
    const statusKey = REDIS_CACHE_PREPOPULATE_STATUS_KEY + buildId;
    const prepopulateCacheStatus = await client
      .get(REDIS_CACHE_PREPOPULATE_STATUS_KEY + buildId)
      .catch((error) => {
        console.error(
          "Redis handler: error while reading from Redis. error:",
          error.message,
        );
      });

    // If the cache population was already started or completed, we skip the operation altogether:
    if (
      prepopulateCacheStatus &&
      prepopulateCacheStatus !== REDIS_CACHE_PREPOPULATE_STATUS_VALUE_ERRORED
    ) {
      console.log(
        `Redis handler: Skipping initial cache population, because status is: ${prepopulateCacheStatus}`,
      );
    } else {
      try {
        // Set Redis switch to indicate that the initial cache population has started:
        await client.set(
          statusKey,
          REDIS_CACHE_PREPOPULATE_STATUS_VALUE_STARTED,
        );

        // Pages files are stored in the `pages` folder in the build cache:
        const pagesDir = serverDistDir + "/pages/";
        // Find all HTML files in the pages folder:
        const pageHtmlFiles = await findAllHtmlFilesInFolder(pagesDir);

        console.log(
          `Redis handler: ${pageHtmlFiles.length} HTML page files found in build cache`,
        );

        // Each HTML file corresponds to a cached page. We will read the HTML content, the modification date of the file, and the
        // corresponding JSON file with the page data. With this information we can create a cache entry for each page.
        pageHtmlFiles.forEach(async (file) => {
          fs.readFile(pagesDir + file, "utf8").then(async (html) => {
            // Get the modification time of the file:
            const stats = await fs.stat(pagesDir + file);
            const htmlFileLastModifiedTime = Math.round(stats.mtimeMs / 1000);

            // If the file was created more than REVALIDATE_LONG seconds ago, there's little value in caching it in REDIS, so we skip it:
            if (
              htmlFileLastModifiedTime <
              Math.round(Date.now() / 1000) - REVALIDATE_LONG
            ) {
              console.log(
                `Redis handler: file ${file} was modified more than ${REVALIDATE_LONG} seconds ago, so it would need revalidation already, skipping it`,
              );
              return;
            }

            const path = file.replace(".html", "");
            // The JSON file has the same path as the HTML file, but with a .json extension:
            const jsonPath = path + ".json";
            console.log(
              `Redis handler: creating a redis cache key for ${path}`,
            );

            // The redis key is the path of the page, with a leading slash:
            await handler?.set("/" + path, {
              value: {
                kind: "PAGE", // hard coded value
                html,
                // For pageData, we need to read the contents of the JSON file to an object:
                pageData: JSON.parse(
                  await fs.readFile(pagesDir + jsonPath, "utf8"),
                ),
                // We do not need to override these here, but they are required according to the types:
                postponed: undefined,
                headers: undefined,
                status: undefined,
              },
              tags: [], // No tags in pages
              lastModified: htmlFileLastModifiedTime * 1000, // Unlike values below, this should be in milliseconds
              lifespan: {
                lastModifiedAt: htmlFileLastModifiedTime,
                staleAge: defaultStaleAge,
                expireAge: defaultStaleAge,
                staleAt: htmlFileLastModifiedTime + defaultStaleAge,
                expireAt: htmlFileLastModifiedTime + defaultStaleAge,
                revalidate: REVALIDATE_LONG,
              },
            });
          });
        });

        // Set a switch in Redis to indicate that the initial cache population completed successfully:
        await client.set(
          statusKey,
          REDIS_CACHE_PREPOPULATE_STATUS_VALUE_COMPLETED,
        );
      } catch (error) {
        // Set a switch in Redis to indicate that the initial cache population errored:
        await client
          .set(statusKey, REDIS_CACHE_PREPOPULATE_STATUS_VALUE_ERRORED)
          .catch((error) => {
            console.error(
              "Error while writing to redis. error:",
              error.message,
            );
          });

        console.error(
          "Error while populating initial redis cache. Error message:",
          error.message,
        );
      }
    }
  }

  /**
   * Fallback to LRU handler if Redis is not available.
   *
   * The application will "work", but the cache will be in memory only and not shared.
   * If this happens in an environment with multiple containers, it will result
   * in various issues such as 404s during clientside navigation due to missing page data.
   *
   * It's recommended to set up an automated alert here, so it can be fixed as soon as possible.
   */
  if (!client?.isReady || !handler) {
    handler = createLruHandler();
    console.warn(
      "Falling back to LRU handler because Redis client is not available.",
    );
  }

  return {
    handlers: [handler],
    ttl: {
      defaultStaleAge,
      estimateExpireAge: () => defaultStaleAge,
    },
  };
});

export default CacheHandler;

// Helper function to find all HTML files in a folder recursively
const findAllHtmlFilesInFolder = async (folderPath) => {
  const files = await fs.readdir(folderPath, {
    recursive: true,
  });
  return files.filter((file) => file.endsWith(".html"));
};

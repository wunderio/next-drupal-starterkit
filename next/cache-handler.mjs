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

const REDIS_CACHE_PREPOPULATE_STATUS = "CACHE_PREPOPULATE_STATUS-";

CacheHandler.onCreation(async (context) => {
  let redisHandler;

  // Check if the Redis environment variables are set:
  if (process.env.REDIS_HOST) {
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
      keyPrefix: `nextjs-cache-${context.buildId}:`,
      sharedTagsKey: "_sharedTags_",
      // timeout for the Redis client operations like `get` and `set`
      // after this timeout, the operation will be considered failed and the `localHandler` will be used
      timeoutMs: 3000,
    });

    // This code will run only when the cache handler is created, so it's a good place to populate the cache.
    // We want to do this only once per deployment even if there are more than one nodejs container running, unless
    // a previous attempt failed. For this reason we store in Redis a special key that stores the status of the cache population process,
    // and use it to determine if the operation should be skipped.

    // Get the status of the initial cache population from Redis:
    const prepopulateCacheStatus = await client
      .get(REDIS_CACHE_PREPOPULATE_STATUS + context.buildId)
      .catch((error) => {
        console.error(
          "Redis handler: error while reading from Redis. error:",
          error.message,
        );
      });

    // If the cache population was already started or completed, we skip the operation altogether:
    if (prepopulateCacheStatus && prepopulateCacheStatus !== "error") {
      console.log(
        `Redis handler: Skipping initial cache population, because status is: ${prepopulateCacheStatus}`,
      );
    } else {
      try {
        // Set Redis switch to indicate that the initial cache population has started:
        await client.set(
          REDIS_CACHE_PREPOPULATE_STATUS + context.buildId,
          "started",
        );

        // Pages files are stored in the `pages` folder in the build cache:
        const pagesDir = context.serverDistDir + "/pages/";
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
            // the JSON file has the same path as the HTML file, but with a .json extension:
            const jsonPath = path + ".json";
            console.log(
              `Redis handler: creating a redis cache key for ${path}`,
            );
            // The redis jey is the path of the page, with a leading slash:
            await redisHandler.set("/" + path, {
              value: {
                kind: "PAGE", // hard coded value
                html,
                // For PageData, we need to fetch the content of the JSON file as an object:
                pageData: JSON.parse(
                  await fs.readFile(pagesDir + jsonPath, "utf8"),
                ),
              },
              tags: [], // no tags in pages
              lifespan: {
                lastModifiedAt: htmlFileLastModifiedTime,
                staleAge: defaultStaleAge,
                expireAge: defaultStaleAge,
                expireAt: htmlFileLastModifiedTime + defaultStaleAge,
                revalidate: REVALIDATE_LONG,
              },
            });
          });
        });

        // Set a switch in Redis to indicate that the initial cache population was completed:
        await client.set(
          REDIS_CACHE_PREPOPULATE_STATUS + context.buildId,
          "completed",
        );
      } catch (error) {
        // Set a switch in Redis to indicate that the initial cache population got an error:
        await client
          .set(REDIS_CACHE_PREPOPULATE_STATUS + context.buildId, "error")
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

  const localHandler = createLruHandler();

  return {
    handlers: [redisHandler, localHandler],
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

/* eslint-disable n/no-process-env */

import { registerOTel } from "@vercel/otel";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerInitialCache } = await import(
      "@neshca/cache-handler/instrumentation"
    );

    // Assuming that your CacheHandler configuration is in the root of the project and the instrumentation is in the src directory.
    // Please adjust the path accordingly.
    // CommonJS CacheHandler configuration is also supported.
    const CacheHandler = (await import("../cache-handler.mjs")).default;

    await registerInitialCache(CacheHandler, {
      // By default, it populates the cache with pre-rendered pages, routes, and fetch calls.
      // You can disable these features by setting the options to false.
      // For example, if you want to populate the cache with only pre-rendered pages, you can set the options as follows:
      // fetch: false,
      // routes: false,
    });

    // Register OpenTelemetry
    registerOTel({ serviceName: "next-drupal-starterkit" });
  }
}

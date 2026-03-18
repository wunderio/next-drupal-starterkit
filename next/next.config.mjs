// @ts-check

import { randomUUID } from "node:crypto";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: process.env.CIRCLECI ? "standalone" : undefined,

  cacheHandler:
    // Only use the cache handler in production
    process.env.NODE_ENV === "production"
      ? new URL("./cache-handler.mjs", import.meta.url).pathname
      : undefined,
  cacheMaxMemorySize: 0, // Disable in-memory cache

  images: {
    remotePatterns: [
      process.env.DRUPAL_BASE_URL_INTERNAL_IMAGES,
      process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    ].map((url = "") => {
      const [protocol, hostname] = url.split("://");
      if (!hostname || (protocol !== "https" && protocol !== "http")) {
        throw new Error(`Invalid images URL "${url}" in next.config.ts`);
      }
      return {
        protocol,
        hostname,
        pathname: "**",
      };
    }),
  },

  experimental: {
    instrumentationHook: true,
    swrDelta: 31536000, // 1 year
  },

  async generateBuildId() {
    return process.env.CIRCLECI
      ? String(process.env.CIRCLE_BUILD_NUM)
      : randomUUID().split("-")[0];
  },

  async rewrites() {
    return [
      // Expose health check endpoint at /_ping:
      {
        source: "/_ping",
        destination: "/api/health",
      },
    ];
  },

  // More: https://nextjs.org/docs/api-reference/next.config.js/headers
  async headers() {
    return [
      // Add security headers for each page.
      {
        // This will match all pages. Examples: "/", "/uk", "/uk/node/1".
        source: "/:path*",
        headers: [
          {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },

      // Enable caching for all pages, setting a short max-age
      // and stale-while-revalidate to allow for quick updates.
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=60",
          },
          // Set Surrogate-Control header to allow Fastly to cache the page.
          // https://www.fastly.com/documentation/guides/concepts/edge-state/cache/stale/#applying-staleness-directives-only-to-fastlys-cache
          {
            key: "Surrogate-Control",
            value:
              "max-age=300, stale-while-revalidate=60, stale-if-error=86400",
          },
        ],
      },

      // Disable cache for all pages when the "next_drupal_draft_data" cookie is present.
      {
        source: "/:path*",
        has: [{ type: "cookie", key: "next_drupal_draft_data" }],
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },

      // Disable cache for requests containing "_rsc" query parameter.
      // Caching RSC requests would show JSON response for end user when they visit this cached page.
      {
        source: "/:path*",
        has: [{ type: "query", key: "_rsc" }],
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },

      // Disable cache for API endpoint.
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Convert *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  eslint: {
    ignoreDuringBuilds: Boolean(process.env.NEXT_BUILD_SKIP_CHECKS),
  },
  typescript: {
    ignoreBuildErrors: Boolean(process.env.NEXT_BUILD_SKIP_CHECKS),
  },
};

export default withNextIntl(nextConfig);

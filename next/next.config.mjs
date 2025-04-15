// @ts-check

import { randomUUID } from "node:crypto";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// We have to have three different image hostnames here, because of the
// Circle CI build process. While in CI, the internal and external hostname
// will be set to the same value. For this reason we also have another env
// variable for the internal images hostname, which will be the same in CI and
// in production.

const imageHostnameInternal = String(
  process.env.DRUPAL_BASE_URL_INTERNAL,
).split("://");

if (imageHostnameInternal.length < 2) {
  throw new Error(
    "Invalid DRUPAL_BASE_URL_INTERNAL. Expected a valid URL with protocol and hostname.",
  );
}

const imageHostnameInternalImages = String(
  process.env.DRUPAL_BASE_URL_INTERNAL_IMAGES,
).split("://");

if (imageHostnameInternalImages.length < 2) {
  throw new Error(
    "Invalid DRUPAL_BASE_URL_INTERNAL_IMAGES. Expected a valid URL with protocol and hostname.",
  );
}

const imageHostnameExternal = String(
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
).split("://");

if (imageHostnameExternal.length < 2) {
  throw new Error(
    "Invalid NEXT_PUBLIC_DRUPAL_BASE_URL. Expected a valid URL with protocol and hostname.",
  );
}

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
      {
        protocol: imageHostnameInternal[0] === "https" ? "https" : "http",
        hostname: imageHostnameInternal[1],
        pathname: "**",
      },
      {
        protocol: imageHostnameExternal[0] === "https" ? "https" : "http",
        hostname: imageHostnameExternal[1],
        pathname: "**",
      },
      // Allow images from the internal images URL, this is used while building
      // in the CI/CD pipeline.
      {
        protocol: imageHostnameInternalImages[0] === "https" ? "https" : "http",
        hostname: imageHostnameInternalImages[1],
        pathname: "**",
      },
    ],
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

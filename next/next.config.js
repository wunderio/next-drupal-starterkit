const crypto = require("crypto");

const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only generate standalone output in circle ci:
  output: process.env.CIRCLECI ? "standalone" : undefined,
  generateBuildId: async () => {
    // This environment variable is set by CircleCI.
    // adjust this to your needs if you use another CI/CD tool.
    return process.env.CIRCLE_BUILD_NUM
      ? `build-id-${process.env.CIRCLE_BUILD_NUM}`
      : // If no build number is available, we generate a random build ID.
        crypto.randomBytes(20).toString("hex");
  },
  cacheHandler:
    // Only use the cache handler in production
    process.env.NODE_ENV === "production"
      ? require.resolve("./cache-handler.mjs")
      : undefined,
  cacheMaxMemorySize: 0, // Disable in-memory cache
  experimental: {
    // This is required for the experimental feature of pre-populating the cache with the initial data
    instrumentationHook: true,
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        pathname: "**",
      },
    ],
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
};

module.exports = withNextIntl(nextConfig);

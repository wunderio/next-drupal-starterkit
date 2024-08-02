const { i18n } = require("./next-i18next.config");
const crypto = require("crypto");

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
    // If the environment has a redis host set, we use a cache handler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cache-handler.mjs")
      : undefined,
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
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx$/i,
      loader: "@svgr/webpack",
    });
    return config;
  },
};

module.exports = nextConfig;

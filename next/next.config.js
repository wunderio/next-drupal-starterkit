const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only generate standalone output in circle ci:
  output: process.env.CIRCLECI ? "standalone" : undefined,
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

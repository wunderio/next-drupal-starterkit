const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  i18n,
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;

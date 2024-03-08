const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/sitemap.xml",
          destination: `https://${process.env.NEXT_IMAGE_DOMAIN}/sites/default/files/sitemap.xml`,
        },
      ],
    };
  },
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

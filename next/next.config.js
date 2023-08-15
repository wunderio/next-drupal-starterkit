const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  i18n,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/sitemap.xml",
          destination: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/sites/default/files/sitemap.xml`,
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

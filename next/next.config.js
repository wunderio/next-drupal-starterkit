const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
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
      loader: "@svgr/webpack",
    });
    return config;
  },
};

module.exports = withNextIntl(nextConfig);

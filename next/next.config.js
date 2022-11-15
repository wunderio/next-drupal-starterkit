/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  i18n: {
    locales: ["en", "fi", "sv"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig

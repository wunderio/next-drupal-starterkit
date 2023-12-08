/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "https://example.com",
  generateRobotsTxt: true, // (optional)
  exclude: [
    "/500",
    "/fi/500",
    "/404",
    "/fi/404",
    "/sv/404",
    "/sv/500",
    "/auth/login",
    "/auth/register",
    "/dashboard",
  ],
};

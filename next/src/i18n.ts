import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));

export const i18nConfig = {
  locales: ["en", "fi", "sv"],
  defaultLocale: "en",
};

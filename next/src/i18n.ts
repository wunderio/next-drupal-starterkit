import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));

export const i18nConfig = {
  locales: ["en", "fi", "sv"],
  defaultLocale: "en",
  languageLinks: {
    en: {
      name: "English",
      path: "/en",
    },
    fi: {
      name: "Suomi",
      path: "/fi",
    },
    sv: {
      name: "Svenska",
      path: "/sv",
    },
  },
};

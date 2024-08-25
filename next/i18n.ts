import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

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

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18nConfig.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

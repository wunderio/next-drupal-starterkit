import { LocalePrefix } from "next-intl/routing";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
export const locales = ["en", "fi", "sv"];
export const defaultLocale = "en";

export const i18nConfig = {
  locales,
  defaultLocale,
  localePrefix: "as-needed" as LocalePrefix<string[]>,
  alternateLinks: false,
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

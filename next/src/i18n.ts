import { notFound } from "next/navigation";
import { Pathnames } from "next-intl/routing";
import { getRequestConfig } from "next-intl/server";

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

export const pathnames = {
  // If locales use different paths, you can
  // specify each external path per locale
  "/all-articles": {
    en: "/articles",
    fi: "/artikkelit",
    sv: "/artiklar",
  },

  "/auth/login": {
    en: "/login",
    fi: "/kirjaudu",
    sv: "/logga-in",
  },

  "/auth/register": {
    en: "/register",
    fi: "/rekisteröidy",
    sv: "/registrera",
  },

  "/dashboard": {
    en: "/dashboard",
    fi: "/hallintapaneeli",
    sv: "/instrumentpanel",
  },

  "/dashboard/webforms/[webformName]/[webformSubmissionUuid]": {
    en: "/dashboard/webforms/[webformName]/[webformSubmissionUuid]",
    fi: "/hallintapaneeli/lomakkeet/[webformName]/[webformSubmissionUuid]",
    sv: "/instrumentpanel/formulär/[webformName]/[webformSubmissionUuid]",
  },
} satisfies Pathnames<typeof i18nConfig.locales>;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18nConfig.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

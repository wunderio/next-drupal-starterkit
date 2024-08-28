import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fi", "sv"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
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
  },
});

export const {
  Link: LinkWithLocale,
  redirect: redirectWithLocale,
  permanentRedirect: permanentRedirectWithLocale,
  usePathname: usePathnameWithoutLocale,
  useRouter: useRouterWithoutLocale,
  getPathname,
} = createLocalizedPathnamesNavigation({
  locales: routing.locales,
  // eslint-disable-next-line
  pathnames: routing.pathnames as typeof routing.pathnames &
    Record<string & NonNullable<unknown>, string>,
});

import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { i18nConfig, pathnames } from "./i18n";

export const {
  Link: LinkWithLocale,
  redirect: redirectWithLocale,
  permanentRedirect: permanentRedirectWithLocale,
  usePathname: usePathnameWithoutLocale,
  useRouter: useRouterWithoutLocale,
} = createLocalizedPathnamesNavigation({
  locales: i18nConfig.locales,
  // eslint-disable-next-line
  pathnames: pathnames as typeof pathnames & Record<string & {}, string>,
});

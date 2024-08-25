import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { i18nConfig } from "@/i18n";

export const {
  Link: LinkWithLocale,
  redirect: redirectWithLocale,
  permanentRedirect: permanentRedirectWithLocale,
  usePathname: usePathnameWithoutLocale,
  useRouter: useRouterWithoutLocale,
} = createSharedPathnamesNavigation({
  locales: i18nConfig.locales,
});

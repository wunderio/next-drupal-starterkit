import { FragmentNodeTranslationFragment } from "@/lib/gql/graphql";

import { locales } from "@/i18n";
import siteConfig from "@/site.config";

export type LanguageLinks = typeof siteConfig.locales;

/**
 * From the site config and available node translations, create links to be used in the language switcher.
 */
export function createLanguageLinks(
  nodeTranslations: FragmentNodeTranslationFragment[],
): LanguageLinks {
  const languageLinks = getStandardLanguageLinks();
  Object.values(nodeTranslations).forEach(({ langcode, path }) => {
    languageLinks[langcode.id].path = path;
  });
  return languageLinks;
}

/**
 * Get the standard language links from the site config.
 */
export const getStandardLanguageLinks = () =>
  JSON.parse(JSON.stringify(siteConfig.locales));

/**
 * Generates a language links object for a page that is created in next only.
 * @param path
 *   The path of the page.
 * @param locales
 *   The locales from i18n.ts.
 */
export function createLanguageLinksForNextOnlyPage(
  path: string,
): LanguageLinks {
  const languageLinks = getStandardLanguageLinks();
  locales.forEach((locale) => {
    languageLinks[locale].path =
      languageLinks[locale].path === "/"
        ? path
        : `${languageLinks[locale].path}${path}`;
  });

  return languageLinks;
}

import { FragmentNodeTranslationFragment } from "@/lib/gql/graphql";

import { i18nConfig } from "@/i18n";

export type LanguageLinks = (typeof i18nConfig)["languageLinks"];

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
  JSON.parse(JSON.stringify(i18nConfig.languageLinks));

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
  i18nConfig.locales.forEach((locale) => {
    languageLinks[locale].path =
      languageLinks[locale].path === "/"
        ? path
        : `${languageLinks[locale].path}${path}`;
  });

  return languageLinks;
}

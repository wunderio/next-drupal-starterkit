import { FragmentNodeTranslationFragment } from "@/lib/gql/graphql";

import { routing } from "@/routing";

export const languageLinks = {
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
};

export type LanguageLinks = typeof languageLinks;

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
  JSON.parse(JSON.stringify(languageLinks));

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
  routing.locales.forEach((locale) => {
    languageLinks[locale].path =
      languageLinks[locale].path === "/"
        ? path
        : `${languageLinks[locale].path}${path}`;
  });

  return languageLinks;
}

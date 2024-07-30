import { GetStaticPropsContext } from "next";
import { createContext, useContext } from "react";

import { FragmentNodeTranslationFragment } from "@/lib/gql/graphql";

import siteConfig from "@/site.config";

export type LanguageLinks = typeof siteConfig.locales;

const LanguageLinksContext = createContext(siteConfig.locales);

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
 * @param context
 *   The context.
 */
export function createLanguageLinksForNextOnlyPage(
  path: string,
  locales: GetStaticPropsContext["locales"],
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

/**
 * Provide the language links context.
 */
export function LanguageLinksProvider({
  languageLinks,
  children,
}: {
  languageLinks?: typeof siteConfig.locales;
  children: React.ReactNode;
}) {
  return (
    <LanguageLinksContext.Provider value={languageLinks || siteConfig.locales}>
      {children}
    </LanguageLinksContext.Provider>
  );
}

/**
 * Access the language links from the language links context.
 */
export function useLanguageLinks() {
  return useContext(LanguageLinksContext);
}

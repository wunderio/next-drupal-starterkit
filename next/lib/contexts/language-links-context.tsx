import { createContext, useContext } from "react";

import siteConfig from "@/site.config";

export type LanguageLinks = typeof siteConfig.locales;
export type Translations = Readonly<
  Partial<Record<keyof LanguageLinks, `/${string}`>>
>;

const LanguageLinksContext = createContext(siteConfig.locales);

/**
 * From the site config and available node translations, create links to be used in the language switcher.
 */
export function createLanguageLinks(nodeTranslations?: Translations) {
  const languageLinks = JSON.parse(JSON.stringify(siteConfig.locales));
  Object.entries(nodeTranslations).forEach(([key, path]) => {
    languageLinks[key].path = path;
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

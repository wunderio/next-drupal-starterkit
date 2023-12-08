"use client";

import { GetStaticPropsContext } from "next";
import { createContext, useContext } from "react";

import { i18nConfig } from "@/i18n";

export type LanguageLinks = (typeof i18nConfig)["languageLinks"];
export type Translations = Readonly<
  Partial<Record<keyof LanguageLinks, `/${string}`>>
>;

const LanguageLinksContext = createContext<LanguageLinks>(
  i18nConfig.languageLinks,
);

/**
 * From the site config and available node translations, create links to be used in the language switcher.
 */
export function createLanguageLinks(
  nodeTranslations?: Translations,
): LanguageLinks {
  const languageLinks = JSON.parse(JSON.stringify(i18nConfig.locales));
  Object.entries(nodeTranslations).forEach(([key, path]) => {
    languageLinks[key].path = path;
  });
  return languageLinks;
}

/**
 * Generates a language links object for a page that is created in next only.
 * @param path
 *   The path of the page.
 * @param context
 *   The context.
 */
export function createLanguageLinksForNextOnlyPage(
  path: string,
  context: GetStaticPropsContext,
): LanguageLinks {
  const languageLinks = JSON.parse(JSON.stringify(i18nConfig.locales));
  context.locales.forEach((locale) => {
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
  languageLinks?: LanguageLinks;
  children: React.ReactNode;
}) {
  return (
    <LanguageLinksContext.Provider
      value={languageLinks || i18nConfig.languageLinks}
    >
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

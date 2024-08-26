"use client";

import { createContext, useContext } from "react";

import { createLanguageLinksForNextOnlyPage } from "./language-links";

import { i18nConfig } from "@/i18n";
import { usePathnameWithoutLocale } from "@/navigation";

export type LanguageLinks = (typeof i18nConfig)["languageLinks"];

const LanguageLinksContext = createContext<LanguageLinks>(
  i18nConfig.languageLinks,
);

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
  const pathname = usePathnameWithoutLocale();

  // If the language links are not provided, create them for the current page.
  const locales = languageLinks ?? createLanguageLinksForNextOnlyPage(pathname);

  return (
    <LanguageLinksContext.Provider value={locales}>
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

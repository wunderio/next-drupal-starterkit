"use client";

import { createContext, useContext } from "react";

import { createLanguageLinksForNextOnlyPage } from "./language-links";

import { usePathnameWithoutLocale } from "@/navigation";
import siteConfig from "@/site.config";

export type LanguageLinks = typeof siteConfig.locales;

const LanguageLinksContext = createContext(siteConfig.locales);

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

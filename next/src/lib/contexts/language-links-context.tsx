"use client";

import { createContext, useContext } from "react";

import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
  languageLinks,
} from "./language-links";

import { usePathnameWithoutLocale } from "@/routing";

const LanguageLinksContext = createContext<LanguageLinks>(languageLinks);

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

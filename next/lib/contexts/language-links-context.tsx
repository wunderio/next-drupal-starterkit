import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

import siteConfig from "@/site.config";

const DEFAULT_LANGUAGE_LINKS = siteConfig.locales;

type LanguageLinks = typeof siteConfig.locales;
export type Translations = Partial<Record<keyof LanguageLinks, `/${string}`>>;
interface LanguageLinksContext {
  languageLinks: LanguageLinks;
  updateLanguageLinks: (translations: Translations) => void;
}

export const LanguageLinksContext = createContext({
  languageLinks: siteConfig.locales,
  updateLanguageLinks: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
} as LanguageLinksContext);

export function LanguageLinksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [languageLinks, setLanguageLinks] = useState(DEFAULT_LANGUAGE_LINKS);

  // Update language links when the path changes
  const { pathname } = useRouter();
  useEffect(() => {
    if (pathname === "/[...slug]") {
      // Nothing to do here - this dynamic path sets the language links based on available translations
    } else {
      setLanguageLinks(DEFAULT_LANGUAGE_LINKS);
    }
  }, [pathname]);

  // Provide a function to update the language links when translations are available
  const updateLanguageLinks = (translations: Translations) => {
    const updatedLinks = structuredClone(DEFAULT_LANGUAGE_LINKS);
    Object.entries(translations).forEach(([key, path]) => {
      updatedLinks[key].path = path;
    });
    setLanguageLinks(updatedLinks);
  };

  return (
    <LanguageLinksContext.Provider
      value={{ languageLinks, updateLanguageLinks }}
    >
      {children}
    </LanguageLinksContext.Provider>
  );
}

export function useLanguageLinksContext() {
  return useContext(LanguageLinksContext);
}

import "@/styles/globals.css";

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { createContext } from "react";

import siteConfig from "@/site.config";

const defaultLanguageLinks = siteConfig.locales;

export const LangContext = createContext({
  languageLinks: defaultLanguageLinks,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <LangContext.Provider
      value={{
        languageLinks: defaultLanguageLinks,
      }}
    >
      <Component {...pageProps} />
    </LangContext.Provider>
  );
}

export default appWithTranslation(App);

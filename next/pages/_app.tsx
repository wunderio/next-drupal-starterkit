import "@/styles/globals.css";

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import React from "react";

import siteConfig from "@/site.config";

const defaultLanguageLinks = siteConfig.locales;

export const LangContext = React.createContext({
  languageLinks: defaultLanguageLinks,
});

const App = ({ Component, pageProps }: AppProps) => (
  <LangContext.Provider
    value={{
      languageLinks: defaultLanguageLinks,
    }}
  >
    <Component {...pageProps} />
  </LangContext.Provider>
);

export default appWithTranslation(App);

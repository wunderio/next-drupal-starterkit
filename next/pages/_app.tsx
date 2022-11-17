import "styles/globals.css";
import React from 'react';

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

const default_langs = {
  en: "/",
  sv: "/sv",
  fi: "/fi"
}

export const LangContext = React.createContext(default_langs);

const App = ({ Component, pageProps }: AppProps) => (
  <LangContext.Provider value={default_langs}>
    <Component {...pageProps} />
  </LangContext.Provider>
);

export default appWithTranslation(App);

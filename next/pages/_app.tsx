import "@/styles/globals.css";

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Overpass } from "@next/font/google";
import { createContext } from "react";

import { Layout } from "@/components/layout";
import { CommonPageProps } from "@/lib/get-common-page-props";

import siteConfig from "@/site.config";

interface AppPropsWithCommonPageProps extends AppProps {
  pageProps: CommonPageProps & Record<string, unknown>;
}

// Language context
const defaultLanguageLinks = siteConfig.locales;
export const LangContext = createContext({
  languageLinks: defaultLanguageLinks,
});

// Add fonts
const overpass = Overpass({ subsets: ["latin"], variable: "--font-overpass" });
function Fonts({ children }: { children: React.ReactNode }) {
  return <div className={`${overpass.variable} font-sans`}>{children}</div>;
}

function App({ Component, pageProps }: AppPropsWithCommonPageProps) {
  return (
    <Fonts>
      <LangContext.Provider
        value={{
          languageLinks: defaultLanguageLinks,
        }}
      >
        <Layout menus={pageProps.menus}>
          <Component {...pageProps} />
        </Layout>
      </LangContext.Provider>
    </Fonts>
  );
}

export default appWithTranslation(App);

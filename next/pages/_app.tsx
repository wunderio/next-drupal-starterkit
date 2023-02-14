import "@/styles/globals.css";

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Overpass } from "@next/font/google";

import { Layout } from "@/components/layout";
import { LanguageLinksProvider } from "@/lib/contexts/language-links-context";
import { CommonPageProps } from "@/lib/get-common-page-props";

// Add fonts
const overpass = Overpass({ subsets: ["latin"], variable: "--font-overpass" });
function Fonts({ children }: { children: React.ReactNode }) {
  return <div className={`${overpass.variable} font-sans`}>{children}</div>;
}

function App({ Component, pageProps }: AppProps<CommonPageProps>) {
  return (
    <LanguageLinksProvider>
      <Fonts>
        <Layout menus={pageProps.menus}>
          <Component {...pageProps} />
        </Layout>
      </Fonts>
    </LanguageLinksProvider>
  );
}

export default appWithTranslation(App);

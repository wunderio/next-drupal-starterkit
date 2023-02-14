import "@/styles/globals.css";

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Inter, Overpass } from "@next/font/google";

import { Layout } from "@/components/layout";
import { LanguageLinksProvider } from "@/lib/contexts/language-links-context";
import { CommonPageProps } from "@/lib/get-common-page-props";
import { Fonts } from "@/styles/fonts";

function App({ Component, pageProps }: AppProps<CommonPageProps>) {
  return (
    <Fonts>
      <LanguageLinksProvider>
        <Layout menus={pageProps.menus}>
          <Component {...pageProps} />
        </Layout>
      </LanguageLinksProvider>
    </Fonts>
  );
}

// Add fonts (see https://nextjs.org/docs/basic-features/font-optimization#google-fonts)
// Fonts must be exported from _app.tsx to be available on every page.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
});

export default appWithTranslation(App);

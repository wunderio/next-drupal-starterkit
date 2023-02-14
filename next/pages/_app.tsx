import "@/styles/globals.css";

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Inter, Overpass } from "@next/font/google";
import clsx from "clsx";

import { Layout } from "@/components/layout";
import { LanguageLinksProvider } from "@/lib/contexts/language-links-context";
import { CommonPageProps } from "@/lib/get-common-page-props";

// Add fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const overpass = Overpass({ subsets: ["latin"], variable: "--font-overpass" });
const fontVariableClasses = `${overpass.variable} ${inter.variable}`;
function Fonts({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        fontVariableClasses, // Add font variables so they can be used in CSS (see tailwind.config.js)
        "font-overpass" // Set the default font
      )}
    >
      {children}
    </div>
  );
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

import "@/styles/globals.css";

import { AppProps } from "next/app";
import { Inter, Overpass } from "next/font/google";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";

import { Layout } from "@/components/layout";
import {
  LanguageLinks,
  LanguageLinksProvider,
} from "@/lib/contexts/language-links-context";
import { CommonPageProps } from "@/lib/get-common-page-props";

interface PageProps extends CommonPageProps {
  dehydratedState: any;
  languageLinks?: LanguageLinks;
  session?: Session;
}

function App({ Component, pageProps }: AppProps<PageProps>) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { menus, languageLinks, session, ...restPageProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Fonts>
          <LanguageLinksProvider languageLinks={languageLinks}>
            <Layout menus={menus}>
              <Component {...restPageProps} />
            </Layout>
          </LanguageLinksProvider>
        </Fonts>
      </QueryClientProvider>
    </SessionProvider>
  );
}

// Add fonts (see https://nextjs.org/docs/basic-features/font-optimization#google-fonts)
// Note that fonts must be created in _app.tsx to be available on every page.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
});
const fontVariables = [inter, overpass].map((font) => font.variable);
function Fonts({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        fontVariables, // Add font variables so they can be used in CSS
        "font-overpass" // Set default font
      )}
    >
      {children}
    </div>
  );
}

export default appWithTranslation(App);

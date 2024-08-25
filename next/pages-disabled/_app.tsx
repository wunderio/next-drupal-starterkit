import "@/styles/globals.css";

import { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Layout } from "@/components/layout";
import {
  LanguageLinks,
  LanguageLinksProvider,
} from "@/lib/contexts/language-links-context";
import { CommonPageProps } from "@/lib/get-common-page-props";
import { inter, overpass } from "@/styles/fonts";

interface PageProps extends CommonPageProps {
  languageLinks?: LanguageLinks;
  session?: Session;
}

function App({ Component, pageProps }: AppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient());
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Fonts({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${overpass.variable} font-overpass antialiased`}
    >
      {children}
    </div>
  );
}

export default appWithTranslation(App);

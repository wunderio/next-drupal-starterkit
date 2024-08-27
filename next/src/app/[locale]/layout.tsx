import "@/styles/globals.css";

import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AuthProvider from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";
import ReactQueryClientProvider from "@/components/query-client-provider";
import { inter, overpass } from "@/styles/fonts";

import { i18nConfig } from "@/i18n";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
export const viewport: Viewport = {
  width: "device-width, shrink-to-fit=no",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <ReactQueryClientProvider>
              <Fonts>
                <div className="flex flex-col min-h-screen">
                  {children}
                  <Footer />
                </div>
              </Fonts>
              <ReactQueryDevtools />
            </ReactQueryClientProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
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

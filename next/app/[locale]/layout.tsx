import "styles/globals.css";

import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import { inter, overpass } from "@/styles/fonts";

import AuthProvider from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { locales } from "@/i18n";
import { getMenu } from "@/lib/drupal/get-menus";
import { MenuAvailable } from "@/lib/gql/graphql";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
  const menu = await getMenu(MenuAvailable.Footer, locale);

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <Fonts>
              <div className="flex flex-col min-h-screen">
                <Header />
                {children}
                <Footer menu={menu} />
              </div>
            </Fonts>
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

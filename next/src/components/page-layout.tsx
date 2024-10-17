import { getLocale } from "next-intl/server";

import { Header } from "@/components/header/header";
import { LanguageLinks } from "@/lib/contexts/language-links";
import { LanguageLinksProvider } from "@/lib/contexts/language-links-context";
import { getMenus } from "@/lib/drupal/get-menus";

export default async function PageLayout({
  children,
  languageLinks,
}: {
  children: React.ReactNode;
  languageLinks?: LanguageLinks;
}) {
  const locale = await getLocale();
  const { main } = await getMenus(locale);

  return (
    <LanguageLinksProvider languageLinks={languageLinks}>
      <Header menu={main} />
      <main className="grow bg-mischka" id="main-content">
        <div className="max-w-6xl px-6 py-8 mx-auto">{children}</div>
      </main>
    </LanguageLinksProvider>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { DrupalMenuLinkContent } from "next-drupal";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { LanguageSwitcher } from "@/components/language-switcher";
import HamburgerIcon from "@/styles/icons/hamburger.svg";
import MagnifierIcon from "@/styles/icons/magnifier.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

// We have applied a patch on the Drupal side that adds the langcode
// property to the response of jsonapi menus, so we extend the type here:
export interface DrupalMenuLinkContentWithLangcode
  extends DrupalMenuLinkContent {
  langcode?: string;
  items?: DrupalMenuLinkContentWithLangcode[];
}

interface HeaderProps {
  links: DrupalMenuLinkContentWithLangcode[];
}

export function Header({ links }: HeaderProps) {
  return (
    <header className="z-50 flex-shrink-0 border-b bg-white text-wunderpurple-700 md:sticky md:top-0">
      <nav className="mx-auto flex max-w-6xl flex-row items-center justify-between px-6 py-4">
        <HomeLink />
        <div className="flex flex-row items-center justify-end gap-8">
          <LanguageSwitcher />
          <SearchLink />
          <Menu items={links} />
        </div>
      </nav>
    </header>
  );
}

function HomeLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/" locale={locale} className="inline">
      <WunderIcon className="w-32" />
      <span className="sr-only">{t("homepage-link")}</span>
    </Link>
  );
}

function SearchLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/search" locale={locale} className="hover:underline">
      <span className="hidden sm:mr-2 sm:inline">{t("search")}</span>
      <MagnifierIcon className="inline-block h-6 w-6" />
    </Link>
  );
}

function Menu({ items }: { items: DrupalMenuLinkContentWithLangcode[] }) {
  // todo: menu functionality
  return (
    <button onClick={() => alert("Toggle menu")}>
      <HamburgerIcon className="inline h-6 w-6" />
    </button>
  );

  // Only show the menu items that match the current locale:
  const { locale } = useRouter();
  const filteredItems = items.filter((link) => link.langcode == locale);
  return (
    <ul className="mx-auto mt-6 grid auto-cols-auto grid-flow-col gap-4 md:mt-0 md:auto-rows-auto md:gap-8 lg:gap-12">
      {filteredItems.map((item) => (
        <MenuLink link={item} key={item.id} />
      ))}
    </ul>
  );
}

function MenuLink({ link }: { link: DrupalMenuLinkContentWithLangcode }) {
  const { asPath, locale } = useRouter();
  const actualPath = `/${locale}${asPath}`;

  return (
    <li>
      <Link
        href={link.url}
        locale={locale}
        className={clsx(
          "py-4 text-sm hover:underline md:text-base",
          link.url === actualPath ? "font-semibold" : "font-normal"
        )}
      >
        {link.title}
      </Link>
      {link.items ? <Menu items={link.items} /> : null}
    </li>
  );
}

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { DrupalMenuLinkContent } from "next-drupal";
import clsx from "clsx";

import LocaleSwitcher from "@/components/locale-switcher";
import SearchBoxHeader from "@/components/search/search-box-header";
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
  const { locale } = useRouter();
  return (
    <header className="z-50 flex-shrink-0 border-b bg-white md:sticky md:top-0">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" locale={locale}>
          <WunderIcon className="w-32 text-wunderpurple-700" />
        </Link>
        {links && <Menu items={links} />}
        <div className="absolute top-2 right-4 flex justify-end md:static">
          <SearchBoxHeader />
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}

function Menu({ items }: { items: DrupalMenuLinkContentWithLangcode[] }) {
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

import Link from "next/link";
import { useRouter } from "next/router";
import { DrupalMenuLinkContent } from "next-drupal";
import clsx from "clsx";

import LocaleSwitcher from "@/components/locale-switcher";
import SearchBoxNavbar from "@/components/search/search-box-navbar";

// We have applied a patch on the Drupal side that adds the langcode
// property to the response of jsonapi menus, so we extend the type here:
export interface DrupalMenuLinkContentWithLangcode
  extends DrupalMenuLinkContent {
  langcode?: string;
  items?: DrupalMenuLinkContentWithLangcode[];
}

interface NavbarProps {
  links: DrupalMenuLinkContentWithLangcode[];
}

export function Navbar({ links, ...props }: NavbarProps) {
  const { locale } = useRouter();

  return (
    <header
      className="static top-0 z-50 flex-shrink-0 bg-white py-4 md:sticky"
      {...props}
    >
      <div className="container mx-auto flex flex-col items-start justify-between px-6 md:flex-row md:items-center">
        <Link href="/" locale={locale} className="text-lg font-bold">
          Home
        </Link>
        {links ? <Menu items={links} /> : null}
        <div className="absolute top-2 right-4 flex justify-end md:static">
          <SearchBoxNavbar />
          <LocaleSwitcher />
        </div>
      </div>
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

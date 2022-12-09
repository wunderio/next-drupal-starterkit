import Link from "next/link";
import { useRouter } from "next/router";
import { DrupalMenuLinkContent } from "next-drupal";
import React from "react";
import classNames from "classnames";
import LocaleSwitcher from "components/locale-switcher";

// We have applied a patch on the Drupal side that adds the langcode
// property to the response of jsonapi menus, so we extend the type here:
interface DrupalMenuLinkContentWithLangcode extends DrupalMenuLinkContent {
  langcode: string;
  items: DrupalMenuLinkContentWithLangcode[];
}

interface NavbarProps {
  links: DrupalMenuLinkContentWithLangcode[];
}

export function Navbar({ links, ...props }: NavbarProps) {
  const { locale } = useRouter();

  return (
    <header
      className="static top-0 z-50 flex-shrink-0 py-4 bg-white md:sticky"
      {...props}
    >
      <div className="container flex flex-col items-start justify-between px-6 mx-auto md:flex-row md:items-center">
        <Link href="/" locale={locale} className="text-lg font-bold">
          Home
        </Link>
        {links ? <Menu items={links} /> : null}
        <div className="absolute flex justify-end md:static top-2 right-4">
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
    <ul
      className="grid grid-flow-col gap-4 mx-auto mt-6 md:mt-0 auto-cols-auto md:auto-rows-auto md:gap-8 lg:gap-12"
      data-cy="navbar-menu"
    >
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
        passHref
        className={classNames(
          "py-4 hover:underline text-sm md:text-base",
          link.url === actualPath ? "font-semibold" : "font-normal"
        )}>

        {link.title}

      </Link>
      {link.items ? <Menu items={link.items} /> : null}
    </li>
  );
}

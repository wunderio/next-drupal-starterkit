import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import { Menu } from "@/lib/zod/menu";
import MenuIcon from "@/styles/icons/menu.svg";
import { DrupalMenuLinkContentWithLangcode } from "@/types";

interface NavigationProps {
  menu: Menu;
}

export function MainMenu({ menu }: NavigationProps) {
  // todo: implement
  return (
    <button onClick={() => console.log("Toggle menu", menu)}>
      <MenuIcon className="inline h-6 w-6" />
    </button>
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
          "py-4 text-md hover:underline md:text-lg",
          link.url === actualPath && "font-bold"
        )}
      >
        {link.title}
      </Link>
      {link.items ? <Menu items={link.items} /> : null}
    </li>
  );
}

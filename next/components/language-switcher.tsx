import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useLanguageLinksContext } from "@/lib/contexts/language-links-context";
import GlobeIcon from "@/styles/icons/globe.svg";

export function LanguageSwitcher() {
  const { locale, locales } = useRouter();
  const { languageLinks } = useLanguageLinksContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  useEffect(close, [locale]);

  // todo: close on click outside

  return (
    <nav>
      <button type="button" className="hover:underline" onClick={toggle}>
        <span>{languageLinks[locale]?.name}</span>
        <GlobeIcon className="ml-2 hidden h-6 w-6 sm:inline-block" />
      </button>
      <ul
        className={clsx(
          "absolute mt-1 w-fit border bg-white",
          !isOpen && "hidden"
        )}
      >
        {locales
          .filter((l) => l !== locale)
          .map((l) => {
            const { name, path } = languageLinks[l];
            return (
              <li key={l}>
                <Link
                  className="block p-2 hover:bg-gray-100"
                  locale={l}
                  href={path}
                >
                  {name}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

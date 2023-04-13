import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import LanguageIcon from "@/styles/icons/language.svg";

export function LanguageSwitcher() {
  const languageLinks = useLanguageLinks();
  const { locale, locales } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  // Close on locale change
  useEffect(close, [locale]);

  // Close on click outside
  const listRef = useRef<HTMLUListElement>(null);
  useOnClickOutside(listRef, close, "mousedown");

  return (
    <nav>
      <button type="button" className="group" onClick={toggle}>
        <span className="inline-block group-hover:underline">
          {languageLinks[locale].name}
        </span>
        <LanguageIcon className="ml-2 hidden h-6 w-6 sm:inline-block" />
      </button>
      <ul
        ref={listRef}
        className={clsx(
          "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
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
                  className="block p-2 hover:bg-primary-50"
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

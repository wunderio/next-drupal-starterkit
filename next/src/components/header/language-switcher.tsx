"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import LanguageIcon from "@/styles/icons/language.svg";

import { i18nConfig } from "@/i18n";

export function LanguageSwitcher() {
  const locale = useLocale();
  const languageLinks = useLanguageLinks();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  // Close on locale change
  useEffect(close, [locale]);

  // Close on click outside
  const ref = useOnClickOutside<HTMLDivElement>(close);
  const t = useTranslations();

  return (
    <div ref={ref}>
      <span className="sr-only">{t("language-switcher")}</span>
      <button
        type="button"
        className="hover:underline"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
          {languageLinks[locale].name}
        </span>
        <LanguageIcon className="inline-block h-6 w-6" aria-hidden="true" />
      </button>
      <ul
        className={clsx(
          "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
          !isOpen && "hidden",
        )}
      >
        {i18nConfig.locales
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
    </div>
  );
}

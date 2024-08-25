"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import { cn, removeLocaleFromPath } from "@/lib/utils";
import LanguageIcon from "@/styles/icons/language.svg";

import { locales } from "@/i18n";
import { LinkWithLocale } from "@/navigation";

export function LanguageSwitcher() {
  const t = useTranslations();
  const languageLinks = useLanguageLinks();
  const activeLocale = useLocale();
  const params = useParams();
  // const [isLoading, startTransition] = useTransition();
  // const router = useRouterWithoutLocale();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((open) => !open);
  const close = () => setIsOpen(false);

  // Close on activeLocale change
  useEffect(close, [activeLocale]);

  // Close on click outside
  const ref = useOnClickOutside<HTMLDivElement>(close);

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
          {languageLinks[activeLocale].name}
        </span>
        <LanguageIcon className="inline-block w-6 h-6" aria-hidden="true" />
      </button>
      <ul
        className={cn(
          "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
          !isOpen && "hidden",
        )}
      >
        {locales
          .filter((locale) => locale !== activeLocale)
          .map((locale) => {
            const { name, path } = languageLinks[locale];
            const href = removeLocaleFromPath(locale, path);
            return (
              <li key={locale}>
                <LinkWithLocale
                  className="block p-2 hover:bg-primary-50"
                  locale={locale}
                  href={{
                    pathname: href || "/",
                    // @ts-expect-error
                    params: params,
                  }}
                >
                  {name}
                </LinkWithLocale>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

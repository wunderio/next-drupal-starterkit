"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import { cn, removeLocaleFromPath } from "@/lib/utils";
import LanguageIcon from "@/styles/icons/language.svg";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust the import path as necessary

import { LinkWithLocale, routing } from "@/i18n/routing";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="hover:underline"
            aria-expanded={isOpen}
            onClick={toggle}
          >
            <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
              {languageLinks[activeLocale].name}
            </span>
            <LanguageIcon className="inline-block w-6 h-6" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50">
          {routing.locales
            .filter((locale) => locale !== activeLocale)
            .map((locale) => {
              const { name, path } = languageLinks[locale];
              const href = removeLocaleFromPath(locale, path);
              return (
                <LinkWithLocale
                  key={locale}
                  className="hover:underline"
                  locale={locale}
                  href={{
                    pathname: href || "/",
                    // @ts-expect-error
                    params: params,
                  }}
                >
                  <DropdownMenuItem key={locale}>{name}</DropdownMenuItem>
                </LinkWithLocale>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust the import path as necessary
import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { removeLocaleFromPath } from "@/lib/utils";
import LanguageIcon from "@/styles/icons/language.svg";

import { LinkWithLocale, routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations();
  const languageLinks = useLanguageLinks();
  const activeLocale = useLocale();
  const params = useParams();

  return (
    <DropdownMenu>
      <span className="sr-only">{t("language-switcher")}</span>
      <DropdownMenuTrigger
        asChild
        data-language-name={languageLinks[activeLocale].name}
      >
        <div className="capitalize cursor-pointer hover:underline">
          <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
            {languageLinks[activeLocale].name}
          </span>
          <LanguageIcon className="inline-block w-6 h-6" aria-hidden="true" />
        </div>
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
  );
}

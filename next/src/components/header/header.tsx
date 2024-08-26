"use client";

import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";

import { MainMenu, MenuToggle } from "@/components/main-menu/main-menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";
import type { MenuType } from "@/types/graphql";

import { LanguageSwitcher } from "./language-switcher";
import { UserMenu } from "./user-menu";

import { LinkWithLocale } from "@/navigation";

interface HeaderProps {
  menu?: MenuType;
}

export function Header({ menu }: HeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  return (
    <header className="z-50 flex-shrink-0 bg-white border-b border-finnishwinter text-primary-600 md:sticky md:top-0">
      <nav className="flex flex-row items-center justify-between max-w-6xl px-6 py-4 mx-auto">
        <HomeLink />
        <div className="flex flex-row items-center justify-end gap-6 sm:gap-8">
          <SearchLink />
          <Suspense fallback={null}>
            <UserMenu />
          </Suspense>
          <LanguageSwitcher />
          <MenuToggle isOpen={isMainMenuOpen} setIsOpen={setIsMainMenuOpen} />
        </div>
      </nav>
      <MainMenu
        menu={menu}
        isOpen={isMainMenuOpen}
        setIsOpen={setIsMainMenuOpen}
      />
    </header>
  );
}

function HomeLink() {
  const t = useTranslations();

  return (
    <LinkWithLocale href="/" className="inline">
      <WunderIcon className="w-32" />
      <span className="sr-only">{t("homepage-link")}</span>
    </LinkWithLocale>
  );
}

function SearchLink() {
  const t = useTranslations();

  return (
    <LinkWithLocale href="/search" className="hover:underline">
      <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
        {t("search")}
      </span>
      <SearchIcon className="inline-block w-6 h-6" aria-hidden="true" />
    </LinkWithLocale>
  );
}

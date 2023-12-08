"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { MainMenu, MenuToggle } from "@/components/main-menu/main-menu";
import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

interface ClientHeaderProps {
  menu: Menu;
}

export function ClientHeader({ menu }: ClientHeaderProps) {
  const t = useTranslations();
  const locale = useLocale();

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  return (
    <header className="z-50 flex-shrink-0 border-b border-finnishwinter bg-white text-primary-600 md:sticky md:top-0">
      <nav className="mx-auto flex max-w-6xl flex-row items-center justify-between px-6 py-4">
        <Link href={`/${locale}/`} className="inline">
          <WunderIcon className="w-32" />
          <span className="sr-only">{t("homepage-link")}</span>
        </Link>
        <div className="flex flex-row items-center justify-end gap-6 sm:gap-8">
          <Link href={`/${locale}/search`} className="hover:underline">
            <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
              {t("search")}
            </span>
            <SearchIcon className="inline-block h-6 w-6" aria-hidden={true} />
          </Link>
          {/* <UserMenu /> */}
          {/* <LanguageSwitcher /> */}
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

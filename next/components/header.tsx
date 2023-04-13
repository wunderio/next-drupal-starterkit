import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { MainMenu, MenuToggle } from "@/components/main-menu/main-menu";
import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

interface HeaderProps {
  menu: Menu;
}

export function Header({ menu }: HeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const { data, status } = useSession();
  return (
    <header className="z-50 flex-shrink-0 border-b border-finnishwinter bg-white text-primary-600 md:sticky md:top-0">
      <nav className="mx-auto flex max-w-6xl flex-row items-center justify-between px-6 py-4">
        {status === "authenticated" && (
          <p>
            You are logged in as <strong>{data.user.name}</strong> -{" "}
            <button onClick={() => void signOut()}>Sign out</button>
          </p>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin" passHref>
            Sign in
          </Link>
        )}
        <HomeLink />
        <div className="flex flex-row items-center justify-end gap-8">
          <LanguageSwitcher />
          <SearchLink />
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
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/" locale={locale} className="inline">
      <WunderIcon className="w-32" />
      <span className="sr-only">{t("homepage-link")}</span>
    </Link>
  );
}

function SearchLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/search" locale={locale} className="hover:underline">
      <span className="hidden sm:mr-2 sm:inline">{t("search")}</span>
      <SearchIcon className="inline-block h-6 w-6" />
    </Link>
  );
}

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import AccountIcon from "@/styles/icons/account-circle.svg";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust the import path as necessary

import { LinkWithLocale } from "@/i18n/routing";
import { LogoutButton } from "../ui/logout-button";

export function UserMenu() {
  const t = useTranslations();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, status } = useSession();

  const loginUrl = {
    pathname: "/auth/login",
    query: {
      callbackUrl:
        searchParams.get("callbackUrl") ||
        `${pathname}${searchParams.size ? `?${searchParams}` : ""}`,
    },
  };

  return (
    <DropdownMenu>
      <span className="sr-only">{t("user-menu")}</span>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="hover:underline"
          aria-expanded={status === "authenticated"}
        >
          <span className="capitalize sr-only sm:not-sr-only sm:mr-2 sm:inline">
            {status === "authenticated"
              ? data.user.name
              : t("user-menu-account")}
          </span>
          <AccountIcon className="inline-block w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50">
        {status === "authenticated" ? (
          <>
            <LinkWithLocale href="/dashboard" className="hover:underline">
              <DropdownMenuItem>{t("user-dashboard")}</DropdownMenuItem>
            </LinkWithLocale>
            <LogoutButton>
              <DropdownMenuItem>{t("log-out")}</DropdownMenuItem>
            </LogoutButton>
          </>
        ) : (
          <>
            <LinkWithLocale href={loginUrl} className="hover:underline">
              <DropdownMenuItem>{t("log-in")}</DropdownMenuItem>
            </LinkWithLocale>
            <LinkWithLocale href="/auth/register" className="hover:underline">
              <DropdownMenuItem>{t("register")}</DropdownMenuItem>
            </LinkWithLocale>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

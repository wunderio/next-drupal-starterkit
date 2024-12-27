"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
  const t = useTranslations("ModeToggle");
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer capitalize hover:underline">
          <span className="sr-only dark:hidden sm:not-sr-only sm:mr-2 sm:inline">
            {t("light")}
          </span>
          <span className="sr-only dark:inline sm:not-sr-only sm:mr-2 sm:hidden">
            {t("dark")}
          </span>
          <Sun className="inline-block h-6 w-6 rotate-0 transition-all dark:hidden dark:-rotate-90" />
          <Moon className="hidden h-6 w-6 rotate-90 transition-all dark:inline-block dark:rotate-0" />
          <span className="sr-only">{t("label")}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("dark")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

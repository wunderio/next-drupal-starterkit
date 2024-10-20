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

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | undefined;

export function ThemeToggler() {
  const t = useTranslations("ModeToggle");
  const { theme, setTheme } = useTheme();

  const [hydratedTheme, setHydratedTheme] = useState<Theme>();

  useEffect(() => {
    setHydratedTheme(theme as Theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="capitalize cursor-pointer hover:underline">
          <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
            {t(hydratedTheme)}
          </span>
          <Sun className="inline-block w-6 h-6 transition-all rotate-0 dark:-rotate-90 dark:hidden" />
          <Moon className="hidden w-6 h-6 transition-all rotate-90 dark:rotate-0 dark:inline-block" />
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

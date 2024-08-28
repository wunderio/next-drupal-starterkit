"use client";

import { useLocale, useTranslations } from "next-intl";
import { Dispatch, forwardRef, ReactNode, SetStateAction } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { cn, removeLocaleFromPath } from "@/lib/utils";
import Chevron from "@/styles/icons/chevron-down.svg";
import CloseIcon from "@/styles/icons/close.svg";
import MenuIcon from "@/styles/icons/menu.svg";
import type { MenuItemType } from "@/types/graphql";

import css from "./main-menu.module.css";
import { disableHoverEvents, isMenuItemActive } from "./main-menu.utils";

import { LinkWithLocale, usePathnameWithoutLocale } from "@/routing";

export function MenuContainer({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        css.mainMenu,
        "relative mx-auto max-w-6xl font-inter tracking-wide",
        !isOpen && "hidden",
      )}
    >
      {children}
    </div>
  );
}

type MenuProps = NavigationMenu.NavigationMenuProps & {
  isOpen: boolean;
};

export const MenuRoot = forwardRef<
  React.ElementRef<typeof NavigationMenu.Root>,
  MenuProps
>(({ isOpen, ...props }, ref) => {
  return (
    <NavigationMenu.Root
      ref={ref}
      {...props}
      className={cn(
        "absolute inset-0 z-40 overflow-y-auto overflow-x-hidden border-finnishwinter lg:bottom-auto lg:min-h-[75vh]",
        isOpen && "border-t bg-white lg:border",
        isOpen &&
          "after:absolute after:left-[calc(66.67%+1px)] after:h-full after:border-r",
      )}
    />
  );
});
MenuRoot.displayName = "MenuRoot";

export function MenuToggle({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<typeof isOpen>>;
}) {
  const t = useTranslations();
  const ToggleIcon = isOpen ? CloseIcon : MenuIcon;
  return (
    <button
      onClick={() => setIsOpen((o) => !o)}
      className="hover:underline"
      aria-label={t("toggle-menu")}
      aria-expanded={isOpen ? "true" : "false"}
    >
      <ToggleIcon className="inline w-6 h-6" aria-hidden="true" />
    </button>
  );
}

export function MenuList({ children, level }) {
  return (
    <NavigationMenu.List
      className={cn(
        "fixed inset-0 top-[72px] overflow-scroll border-b border-l border-r border-white bg-white lg:absolute lg:top-0 lg:w-[min(33.334vw,384px)] lg:overflow-visible",
        level === 0 &&
          "z-10 h-full lg:left-0 lg:z-auto lg:border-primary-600 lg:bg-primary-600",
        level === 1 && "z-20 lg:left-[min(33.334vw,383px)] lg:z-auto",
        level === 2 && "z-30 lg:left-[min(33.334vw,383px)] lg:z-auto",
      )}
    >
      {children}
    </NavigationMenu.List>
  );
}

export function MenuListTitle({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <h2 className="p-6 pt-0 font-bold border-b border-finnishwinter text-heading-xs text-steelgray hover:underline lg:hidden">
      <MenuLink href={href} isTitle={true}>
        {children}
      </MenuLink>
    </h2>
  );
}

export function MenuBack({ onClick }: { onClick: () => void }) {
  const t = useTranslations();
  return (
    <button
      className="inline-flex items-center justify-center pr-2 m-6 hover:underline lg:hidden"
      onClick={onClick}
    >
      <Chevron className="w-6 h-6 rotate-90" aria-hidden="true" />
      <span className="pl-4">{t("menu-back")}</span>
    </button>
  );
}

export function MenuItem({
  value,
  isTopLevel,
  children,
}: {
  value: MenuItemType["id"];
  isTopLevel?: boolean;
  children: ReactNode;
}) {
  return (
    <NavigationMenu.Item
      className={cn(
        "flex items-stretch border-b border-finnishwinter bg-white font-bold tracking-widest text-primary-600 underline-offset-4 lg:border-b-0",
        isTopLevel && "lg:bg-primary-600 lg:text-mischka",
      )}
      value={value}
    >
      {children}
    </NavigationMenu.Item>
  );
}

export function MenuLink({
  href,
  isTitle,
  isTopLevel,
  children,
}: {
  href: string;
  isTitle?: boolean;
  isTopLevel?: boolean;
  children: ReactNode;
}) {
  const pathname = usePathnameWithoutLocale();
  const locale = useLocale();

  // TODO: Rethink this...

  /**
   * Drupal node menu  path comes with locale
   * Drupal Next.js menu routes path comes without locale
   * LinkWithLocale expects path without locale
   */

  const isActive = isMenuItemActive(locale, pathname, href);

  const hrefWithoutLocale = removeLocaleFromPath(locale, href);

  return (
    <NavigationMenu.Link
      asChild
      active={isActive}
      className={cn(
        !isTitle &&
          "aria-current:underline block h-full grow p-6 hover:underline data-[active]:underline",
        isTopLevel && "lg:ring-white",
      )}
    >
      <LinkWithLocale href={hrefWithoutLocale}>{children}</LinkWithLocale>
    </NavigationMenu.Link>
  );
}

export function MenuTrigger({
  isTopLevel,
  parent,
}: {
  isTopLevel?: boolean;
  parent?: string;
}) {
  const t = useTranslations();
  return (
    <NavigationMenu.Trigger
      {...disableHoverEvents}
      className={cn(
        "flex w-20 shrink-0 items-center justify-center ring-inset ring-primary-700 hover:ring-2 lg:border-none",
        isTopLevel
          ? "lg:ring-white lg:aria-expanded:bg-white lg:aria-expanded:text-primary-600"
          : "lg:aria-expanded:bg-primary-600 lg:aria-expanded:text-white lg:aria-expanded:ring-primary-600",
      )}
      aria-label={`${t("show-submenu", { parent })}`}
    >
      <Chevron className="-rotate-90 h-9 w-9" />
    </NavigationMenu.Trigger>
  );
}

export function MenuContent({ children }) {
  return (
    <NavigationMenu.Content {...disableHoverEvents}>
      {children}
    </NavigationMenu.Content>
  );
}

export function MenuSubmenu({
  children,
  ...props
}: NavigationMenu.NavigationMenuSubProps) {
  return <NavigationMenu.Sub {...props}>{children}</NavigationMenu.Sub>;
}

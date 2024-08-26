import { PointerEvent } from "react";

import { removeLocaleFromPath } from "@/lib/utils";

// Disable hover events so click is required - https://github.com/radix-ui/primitives/issues/1630
export const disableHoverEvents = {
  onPointerMove: (event: PointerEvent) => event.preventDefault(),
  onPointerLeave: (event: PointerEvent) => event.preventDefault(),
} as const;

export function isMenuItemActive(locale: string, path: string, href: string) {
  const pathWithoutLocale = removeLocaleFromPath(locale, path);
  const hrefWithoutLocale = removeLocaleFromPath(locale, href);
  return pathWithoutLocale === hrefWithoutLocale;
}

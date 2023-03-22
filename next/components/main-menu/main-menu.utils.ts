import { NextRouter } from "next/router";
import { PointerEvent } from "react";

// Disable hover events so click is required - https://github.com/radix-ui/primitives/issues/1630
export const disableHoverEvents = {
  onPointerMove: (event: PointerEvent) => event.preventDefault(),
  onPointerLeave: (event: PointerEvent) => event.preventDefault(),
} as const;

export function isMenuItemActive(router: NextRouter, href: string) {
  const { locale, asPath } = router;
  const actualPath = `/${locale}${asPath}`;
  return actualPath === href;
}

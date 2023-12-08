import { PointerEvent } from "react";

// Disable hover events so click is required - https://github.com/radix-ui/primitives/issues/1630
export const disableHoverEvents = {
  onPointerMove: (event: PointerEvent) => event.preventDefault(),
  onPointerLeave: (event: PointerEvent) => event.preventDefault(),
} as const;

// todo: implement for app router
export function isMenuItemActive(/* router: NextRouter, href: string */) {
  return false;
  // const { locale, asPath } = router;
  // const actualPath = `/${locale}${asPath}`;
  // return actualPath === href;
}

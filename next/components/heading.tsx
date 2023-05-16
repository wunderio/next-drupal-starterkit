import { ReactNode } from "react";

import { HeadingLevel } from "@/components/heading-level/heading-level";

export function Heading({
  children,
}: {
  children: JSX.Element | string | ReactNode;
}) {
  return (
    <HeadingLevel.H className="text-left text-heading-md font-bold text-steelgray md:text-heading-lg">
      {children}
    </HeadingLevel.H>
  );
}

export function HeadingHero({
  children,
}: {
  children: JSX.Element | string | ReactNode;
}) {
  return (
    <HeadingLevel.H className="leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 md:text-heading-lg">
      {children}
    </HeadingLevel.H>
  );
}

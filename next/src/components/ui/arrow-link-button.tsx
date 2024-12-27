import { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "./button";

import { LinkWithLocale } from "@/i18n/routing";

export interface ArrowLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export function ArrowLinkButton({
  href,
  children,
  variant = "default",
  className,
}: ArrowLinkProps) {
  return (
    <LinkWithLocale
      href={href}
      className={cn(
        buttonVariants({ variant }),
        "group inline-flex px-5 py-3 text-base",
        className,
      )}
    >
      {children}

      <ArrowIcon
        className="ml-1 h-6 w-6 -rotate-90 transition-transform duration-500 group-hover:translate-x-2"
        aria-hidden
      />
    </LinkWithLocale>
  );
}

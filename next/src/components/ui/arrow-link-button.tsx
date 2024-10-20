import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { VariantProps } from "class-variance-authority";
import { LinkWithLocale } from "@/i18n/routing";

export interface ArrowLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export function ArrowLinkButton({
  href,
  children,
  variant,
  className,
}: ArrowLinkProps) {
  return (
    <LinkWithLocale
      href={href}
      className={cn(
        buttonVariants({ variant }),
        "text-base inline-flex px-5 py-3 group",
        className,
      )}
    >
      {children}

      <ArrowIcon
        className="w-6 h-6 ml-1 transition-transform duration-500 -rotate-90 group-hover:translate-x-1"
        aria-hidden
      />
    </LinkWithLocale>
  );
}

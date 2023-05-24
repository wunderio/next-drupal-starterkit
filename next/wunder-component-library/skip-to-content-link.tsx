import NextLink from "next/link";
import React, { useRef } from "react";

interface ContentLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>;
}

export function SkipToContentLink({
  href,
  children,
  onClick,
  onKeyDown,
}: ContentLinkProps) {
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      if (mainContentRef.current) {
        mainContentRef.current.focus();
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <NextLink
      href={href}
      className="sr-only block text-center font-inter tracking-wide text-primary-600 underline-offset-4 hover:underline focus:not-sr-only"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {children}
    </NextLink>
  );
}

import Link from "next/link";
import React from "react";

interface ContentLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipToContentLink({ href, children }: ContentLinkProps) {
  return (
    <Link
      href={href}
      className="text-primary-600 sr-only tracking-wide underline-offset-4 focus-visible:not-sr-only"
      tabIndex={0}
    >
      {children}
    </Link>
  );
}

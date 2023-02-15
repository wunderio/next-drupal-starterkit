import Link from "next/link";
import { useRouter } from "next/router";

import { DrupalMenuLinkContentWithLangcode } from "@/types";
interface FooterProps {
  links: DrupalMenuLinkContentWithLangcode[];
}

export function Footer({ links }: FooterProps) {
  // Only show the menu items that match the current locale:
  const { locale } = useRouter();
  const filteredItems = links.filter((link) => link.langcode == locale);
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6">
        <nav className="flex flex-col items-center gap-2 py-8 text-lg sm:flex-row sm:justify-between">
          <ul className="flex gap-x-4">
            {filteredItems.map((link) => (
              <li key={link.id}>
                <FooterLink href={link.url}>{link.title}</FooterLink>
              </li>
            ))}
          </ul>
          <FooterLink href="https://next-drupal.org" newTab>
            Next.js for Drupal
          </FooterLink>
        </nav>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  newTab?: boolean;
  children: React.ReactNode;
}

function FooterLink({ href, newTab = false, children }: FooterLinkProps) {
  const [target, rel] = newTab ? ["_blank", "noreferrer"] : [];
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className="text-wunderpurple-500 hover:underline"
    >
      {children}
    </Link>
  );
}

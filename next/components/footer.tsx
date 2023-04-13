import Link from "next/link";
import { useRouter } from "next/router";

import { Menu } from "@/lib/zod/menu";

interface FooterProps {
  menu: Menu;
}

export function Footer({ menu }: FooterProps) {
  // Only show the menu items that match the current locale:
  const { locale } = useRouter();
  const filteredItems = menu.filter((link) => link.langcode == locale);
  return (
    <footer className="border-t border-finnishwinter">
      <div className="mx-auto max-w-6xl px-6">
        <nav className="flex flex-col items-center gap-2 py-8 text-md sm:flex-row sm:justify-between">
          <ul className="mr-4 flex flex-wrap gap-x-8 gap-y-2">
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
      className="text-primary-500 hover:underline"
    >
      {children}
    </Link>
  );
}

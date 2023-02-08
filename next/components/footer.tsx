import Link from "next/link";
import { DrupalMenuLinkContent } from "next-drupal";

interface FooterProps {
  links: DrupalMenuLinkContent[];
}

export function Footer({ links }: FooterProps) {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-2 py-8 text-lg sm:flex-row sm:justify-between">
          {links.length > 0 && (
            <nav>
              <ul className="flex gap-x-4">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-wunderpurple-500 no-underline hover:text-wunderpurple-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <p>© {new Date().getFullYear()} Wunder</p>
        </div>
      </div>
    </footer>
  );
}

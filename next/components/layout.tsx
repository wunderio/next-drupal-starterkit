import Link from "next/link";

import LocaleSwitcher from "../components/locale-switcher";
import { PreviewAlert } from "../components/preview-alert";

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-md px-6 mx-auto">
        <header>
          <div className="container flex items-center justify-between py-6 mx-auto">
            <Link href="/" passHref>
              <a className="text-2xl font-semibold no-underline">
                Next-drupal wunder template
              </a>
            </Link>
            <LocaleSwitcher />
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  );
}

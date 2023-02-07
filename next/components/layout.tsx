import { DrupalMenuLinkContent } from "next-drupal";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PreviewAlert } from "@/components/preview-alert";

export interface LayoutProps {
  menus: {
    main: DrupalMenuLinkContent[];
    footer: DrupalMenuLinkContent[];
  };
  children?: React.ReactNode;
}

export function Layout({ menus, children }: LayoutProps) {
  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-xl px-6 mx-auto">
        <Navbar links={menus.main} />

        <main className="container py-10 mx-auto">{children}</main>
        <Footer links={menus.footer} />
      </div>
    </>
  );
}

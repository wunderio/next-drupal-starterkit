import { DrupalMenuLinkContent } from "next-drupal";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
      <div className="mx-auto max-w-screen-xl px-6">
        <Header links={menus.main} />

        <main className="container mx-auto py-10">{children}</main>
        <Footer links={menus.footer} />
      </div>
    </>
  );
}

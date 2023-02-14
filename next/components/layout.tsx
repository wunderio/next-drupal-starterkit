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
    <div className="flex min-h-screen flex-col font-overpass">
      <PreviewAlert />
      <Header links={menus.main} />
      <main className="mx-auto w-full max-w-6xl grow p-6">{children}</main>
      <Footer links={menus.footer} />
    </div>
  );
}

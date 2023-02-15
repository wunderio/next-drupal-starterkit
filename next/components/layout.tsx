import { DrupalMenuLinkContent } from "next-drupal";
import clsx from "clsx";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  PreviewBanner,
  useIsPreviewBannerVisible,
} from "@/components/preview-banner";

export interface LayoutProps {
  menus: {
    main: DrupalMenuLinkContent[];
    footer: DrupalMenuLinkContent[];
  };
  children?: React.ReactNode;
}

export function Layout({ menus, children }: LayoutProps) {
  const isPreviewVisible = useIsPreviewBannerVisible();
  return (
    <>
      <div
        className={clsx(
          "flex min-h-screen flex-col",
          isPreviewVisible && "mt-10"
        )}
      >
        <Header links={menus.main} />
        <main className="mx-auto w-full max-w-6xl grow p-6">{children}</main>
        <Footer links={menus.footer} />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}

import clsx from "clsx";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  PreviewBanner,
  useIsPreviewBannerVisible,
} from "@/components/preview-banner";
import { Menu } from "@/lib/zod/menu";

export interface LayoutProps {
  menus: {
    main: Menu;
    footer: Menu;
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
        <Header menu={menus.main} />
        <main className="grow bg-mischka">
          <div className="mx-auto max-w-6xl py-8 px-6">{children}</div>
        </main>
        <Footer menu={menus.footer} />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}

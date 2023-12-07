import { useTranslation } from "next-i18next";
import React from "react";
import clsx from "clsx";

import { Menu } from "@/lib/zod/menu";

import { Footer } from "@/archived-components/footer/footer";
import { Header } from "@/archived-components/header/header";
import {
  PreviewBanner,
  useIsPreviewBannerVisible,
} from "@/archived-components/preview-banner";
import { SkipToContentLink } from "@/ui/skip-to-content-link";

export interface LayoutProps {
  menus: {
    main: Menu;
    footer: Menu;
  };
  children?: React.ReactNode;
}

export function Layout({ menus, children }: LayoutProps) {
  const isPreviewVisible = useIsPreviewBannerVisible();
  const { t } = useTranslation();

  return (
    <>
      <div
        className={clsx(
          "flex min-h-screen flex-col",
          isPreviewVisible && "mt-10",
        )}
      >
        <SkipToContentLink href="#main-content">
          {t("skip-to-main-content")}
        </SkipToContentLink>
        <Header menu={menus.main} />
        <main className="grow bg-mischka" id="main-content">
          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </main>
        <Footer menu={menus.footer} />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}

import { useTranslation } from "next-i18next";
import React, { useRef } from "react";
import clsx from "clsx";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  PreviewBanner,
  useIsPreviewBannerVisible,
} from "@/components/preview-banner";
import { Menu } from "@/lib/zod/menu";

import { SkipToContentLink } from "@/wunder-component-library/skip-to-content-link";

export interface LayoutProps {
  menus: {
    main: Menu;
    footer: Menu;
  };
  children?: React.ReactNode;
}

export function Layout({ menus, children }: LayoutProps) {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const isPreviewVisible = useIsPreviewBannerVisible();
  const { t } = useTranslation();

  return (
    <>
      <div
        className={clsx(
          "flex min-h-screen flex-col",
          isPreviewVisible && "mt-10"
        )}
      >
        <SkipToContentLink href="#main-content">
          {t("skip-to-main-content")}
        </SkipToContentLink>
        <Header menu={menus.main} />
        <main
          className="grow bg-mischka"
          id="main-content"
          ref={mainContentRef}
        >
          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </main>
        <Footer menu={menus.footer} />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}

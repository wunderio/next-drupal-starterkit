import { draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { DraftAlertClient } from "./draft-alert-client";

import { SkipToContentLink } from "@/components/ui/skip-to-content-link";

export default async function DraftAlert() {
  const { isEnabled } = draftMode();
  const t = await getTranslations();

  return (
    <>
      <Suspense fallback={null}>
        <DraftAlertClient isDraftEnabled={isEnabled} />
      </Suspense>
      <SkipToContentLink href="#main-content">
        {t("skip-to-main-content")}
      </SkipToContentLink>
    </>
  );
}

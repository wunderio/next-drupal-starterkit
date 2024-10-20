"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function DraftAlertClient({
  isDraftEnabled,
}: {
  isDraftEnabled: boolean;
}) {
  const [showDraftAlert, setShowDraftAlert] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowDraftAlert(isDraftEnabled && window.top === window.self);
  }, [isDraftEnabled]);

  if (!showDraftAlert) {
    return null;
  }

  function buttonHandler() {
    void fetch(`/api/disable-draft?callbackPath=${pathname}`);
    setShowDraftAlert(false);
  }

  return (
    <div className="sticky top-0 left-0 z-50 w-full px-2 py-2 text-center">
      <p className="mb-0">
        This page is a draft.{" "}
        <button className="underline" onClick={buttonHandler}>
          Exit draft mode
        </button>
      </p>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function PreviewAlert() {
  const { isPreview } = useRouter();
  const [showPreviewAlert, setShowPreviewAlert] = useState<boolean>(false);

  useEffect(() => {
    setShowPreviewAlert(isPreview && window.top === window.self);
  }, [isPreview]);

  if (!showPreviewAlert) {
    return null;
  }

  return (
    <div className="sticky top-0 left-0 z-50 w-full bg-black px-2 py-1 text-center text-white">
      <p className="mb-0">
        This page is a preview.{" "}
        {/* eslint-disable @next/next/no-html-link-for-pages */}
        <a href="/api/exit-preview" className="text-white underline">
          Click here
        </a>{" "}
        to exit preview mode.
      </p>
    </div>
  );
}

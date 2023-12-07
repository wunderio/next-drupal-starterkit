import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useIsPreviewBannerVisible() {
  const { isPreview } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isIframe = window.top !== window.self;
    setIsVisible(isPreview && !isIframe);
  }, [isPreview]);

  return isVisible;
}

export function PreviewBanner({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute top-0 z-50 w-full bg-steelgray px-2 py-2 text-center text-mischka">
      This page is a preview.{" "}
      {/* eslint-disable @next/next/no-html-link-for-pages */}
      <a href="/api/exit-preview" className="underline">
        Click here
      </a>{" "}
      to exit preview mode.
    </div>
  );
}

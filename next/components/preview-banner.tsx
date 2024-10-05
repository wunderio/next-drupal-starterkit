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
  const router = useRouter();

  if (!isVisible) {
    return null;
  }

  // If the current locale is the default locale, we don't need to include the locale in the callback URL
  const callbackUrl = `${router.locale === router.defaultLocale ? "" : `/${router.locale}`}${router.asPath}`;

  return (
    <div className="absolute top-0 z-50 w-full px-2 py-2 text-center bg-steelgray text-mischka">
      This page is a preview.{" "}
      {/* eslint-disable @next/next/no-html-link-for-pages */}
      <a
        href={`/api/exit-preview?callbackUrl=${encodeURIComponent(callbackUrl)}`}
        className="underline"
      >
        Click here
      </a>{" "}
      to exit preview mode.
    </div>
  );
}

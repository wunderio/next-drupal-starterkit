import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import FacebookIcon from "../styles/icons/facebook.svg";
import LinkedInIcon from "../styles/icons/linkedin.svg";
import TwitterIcon from "../styles/icons/twitter.svg";

export function SocialShare() {
  const [pageUrl, setPageUrl] = useState<string>("");
  const { t } = useTranslation();
  useEffect(() => {
    const currentUrl = window.location.href;
    setPageUrl(currentUrl);
  }, [pageUrl]);

  return (
    <div>
      <p className="text-center">{t("share-page")}</p>
      <ul className="flex flex-wrap justify-center">
        <li className="m-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              pageUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="inline-block h-16 w-16 text-primary-600" />
            <span className="sr-only">{`Share to Facebook`}</span>
          </a>
        </li>
        <li className="m-4">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              pageUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="inline-block h-16 w-16 text-primary-600" />
            <span className="sr-only">{`Share to Twitter`}</span>
          </a>
        </li>
        <li className="m-4">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              pageUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="inline-block h-16 w-16 text-primary-600" />
            <span className="sr-only">{`Share to LinkedIn`}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import FacebookIcon from "@/styles/icons/facebook.svg";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";

export function SocialShare() {
  const [pageUrl, setPageUrl] = useState<string>("");
  const t = useTranslations();

  useEffect(() => {
    const currentUrl = encodeURIComponent(window.location.href);
    setPageUrl(currentUrl);
  }, []);

  const data = [
    {
      id: 1,
      location: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      icon: <FacebookIcon className="block w-16 h-16" />,
    },
    {
      id: 2,
      location: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${pageUrl}`,
      icon: <TwitterIcon className="block w-16 h-16" />,
    },
    {
      id: 3,
      location: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`,
      icon: <LinkedInIcon className="block w-16 h-16" />,
    },
  ];

  return (
    <div>
      <p className="text-center">{t("share-page")}</p>
      <ul className="flex flex-wrap justify-center">
        {data?.map(({ id, url, icon, location }) => (
          <li className="m-4" key={id}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {icon}
              {location && (
                <span className="sr-only">
                  {t("share-to", {
                    location,
                  })}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

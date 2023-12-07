"use client";

import { useEffect, useState } from "react";

import FacebookIcon from "@/styles/icons/facebook.svg";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";

export function SocialShare({ cta }: { cta: string }) {
  const [pageUrl, setPageUrl] = useState<string>("");
  useEffect(() => {
    const currentUrl = encodeURIComponent(window.location.href);
    setPageUrl(currentUrl);
  }, []);

  const data = [
    {
      location: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      icon: <FacebookIcon className="block h-16 w-16 text-primary-600" />,
    },
    {
      location: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${pageUrl}`,
      icon: <TwitterIcon className="block h-16 w-16 text-primary-600" />,
    },
    {
      location: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`,
      icon: <LinkedInIcon className="block h-16 w-16 text-primary-600" />,
    },
  ];

  return (
    <div>
      <p className="text-center">{cta}</p>
      <ul className="flex flex-wrap justify-center">
        {data.map(({ url, icon, location }) => (
          <li className="m-4" key={location}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={location}
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

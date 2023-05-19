import { ReactElement } from "react";

import FacebookIcon from "../styles/icons/facebook.svg";
import LinkedInIcon from "../styles/icons/linkedin.svg";
import TwitterIcon from "../styles/icons/twitter.svg";

interface Social {
  icon: ReactElement;
  href: string;
  label: string;
  id: string;
}

const socials: Social[] = [
  {
    icon: <FacebookIcon className="inline-block h-16 w-16 text-primary-600" />,
    href: "https://www.facebook.com/sharer/sharer.php?u=https%3A//frontend.lndo.site/",
    label: "Share to Facebook",
    id: "facebook",
  },
  {
    icon: <TwitterIcon className="inline-block h-16 w-16 text-primary-600" />,
    href: "https://twitter.com/intent/tweet?text=https%3A//frontend.lndo.site/",
    label: "Share to Twitter",
    id: "twitter",
  },
  {
    icon: <LinkedInIcon className="inline-block h-16 w-16 text-primary-600" />,
    href: "https://www.linkedin.com/shareArticle?mini=true&url=frontend.lndo.site/",
    label: "Share to LinkedIn",
    id: "linkedIn",
  },
];

export function SocialShare() {
  return (
    <div>
      <p className="text-center">Share Page</p>
      <ul className="flex flex-wrap justify-center">
        {socials?.map((social) => (
          <li key={social.id} className="m-4">
            <a href={social.href} target="_blank" rel="noopener noreferrer">
              {social.icon}
              <span className="sr-only">{social.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

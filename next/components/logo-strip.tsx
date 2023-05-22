import { ReactElement } from "react";

import Facebook from "@/styles/icons/facebook.svg";
import LinkedIn from "@/styles/icons/linkedin.svg";
import Twitter from "@/styles/icons/twitter.svg";

interface Logo {
  image: ReactElement;
  label: string;
  id: string;
}

const logos: Logo[] = [
  {
    image: <Facebook className="inline-block h-16 w-16 text-primary-600" />,
    label: "Share to Facebook",
    id: "facebook",
  },
  {
    image: <Twitter className="inline-block h-16 w-16 text-primary-600" />,
    label: "Share to Twitter",
    id: "twitter",
  },
  {
    image: <LinkedIn className="inline-block h-16 w-16 text-primary-600" />,
    label: "Share to LinkedIn",
    id: "linkedIn",
  },
];

export function LogoStrip() {
  return (
    <section id="logo-section">
      <span className="sr-only">branding logos</span>
      <ul className="flex flex-wrap justify-center p-4">
        {logos?.map((logo) => (
          <li key={logo.id} className="p-4">
            {logo.image}
            <span className="sr-only">{logo.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

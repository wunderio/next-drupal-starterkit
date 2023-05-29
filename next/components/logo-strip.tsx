import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

import Drupal from "@/styles/icons/drupal-icon.svg";
import Lando from "@/styles/icons/lando-logo.svg";
import NextJS from "@/styles/icons/nextjs-logo.svg";
import React from "@/styles/icons/react-icon.svg";
import Tailwind from "@/styles/icons/tailwindcss.svg";

interface Logo {
  image: ReactElement;
  label: string;
  id: string;
}

const logos: Logo[] = [
  {
    image: (
      <React className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "React logo",
    id: "react-logo",
  },
  {
    image: (
      <NextJS className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "NextJS logo",
    id: "nextjs-logo",
  },
  {
    image: (
      <Tailwind className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Tailwind CSS logo",
    id: "tailwindcss-logo",
  },
  {
    image: (
      <Drupal className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Drupal logo",
    id: "drupal-logo",
  },
  {
    image: <Lando className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem]" />,
    label: "Lando logo",
    id: "lando-logo",
  },
];

export function LogoStrip() {
  const { t } = useTranslation();
  return (
    <section>
      <span className="sr-only">{t("brand-logos")}</span>
      <ul className="flex flex-wrap justify-center p-4">
        {logos?.map(({ id, image, label }) => (
          <li
            key={id}
            className="box-pack-center mb-4 flex max-w-[50%] items-center justify-center p-4"
          >
            {image}
            <span className="sr-only">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

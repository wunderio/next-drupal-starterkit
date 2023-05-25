import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

import Finavia from "@/styles/icons/finavia_logo_grey.svg";
import Fortum from "@/styles/icons/fortum_logo_grey.svg";
import HUS from "@/styles/icons/hus_logo_grey.svg";
import Traficom from "@/styles/icons/traficom_logo_eng.svg";
import Trimble from "@/styles/icons/trimble_grey.svg";

interface Logo {
  image: ReactElement;
  label: string;
  id: string;
}

const logos: Logo[] = [
  {
    image: (
      <Finavia className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Finavia logo",
    id: "finavia",
  },
  {
    image: (
      <Fortum className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Fortum logo",
    id: "fortum",
  },
  {
    image: (
      <HUS className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Hus logo",
    id: "hus",
  },
  {
    image: (
      <Traficom className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Traficom logo",
    id: "traficom",
  },
  {
    image: (
      <Trimble className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem]" />
    ),
    label: "Trimble logo",
    id: "trimble",
  },
];

export function LogoStrip() {
  const { t } = useTranslation();
  return (
    <section id="logo-section">
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

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import * as React from "react";
import { useCallback } from "react";

import { Metatag } from "@/lib/zod/metatag";

import { env } from "@/env";

interface MetaProps {
  title?: string;
  path?: string;
  metatags?: Metatag[];
}

export function Meta({ title, metatags }: MetaProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const getTag = useCallback(
    (str: string, key: keyof Metatag["attributes"] = "name") => {
      const result = metatags?.find((tag) => tag.attributes[key] === str);
      return result?.attributes;
    },
    [metatags],
  );

  // We want to determine if we need to add the language path
  // to create the canonical link for this page:
  const languagePathFragment =
    router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  const data = {
    title: getTag("title")?.content ?? title,
    description: getTag("description")?.content ?? t("meta-site-description"),
    canonical: `${env.NEXT_PUBLIC_FRONTEND_URL}${languagePathFragment}${
      router.asPath !== "/" ? router.asPath : ""
    }`,
    imageSrc:
      getTag("image_src", "rel")?.href ||
      `${env.NEXT_PUBLIC_FRONTEND_URL}/metatags_default_image.png`,
  };

  const computedTitle = data.title
    ? data.title.concat(` | ${t("meta-site-name")}`)
    : t("meta-site-name");

  return (
    <NextSeo
      title={computedTitle}
      description={data.description}
      canonical={data.canonical}
      openGraph={{
        title: computedTitle,
        description: data.description,
        type: "website",
        url: data.canonical,
        images: [
          {
            url: data.imageSrc ?? "",
            alt: computedTitle,
          },
        ],
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
      ]}
    />
  );
}

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import * as React from "react";

type Metatag = {
  tag: string;
  attributes: {
    name?: string;
    content?: string;
    href?: string;
    rel?: string;
  };
};

type Metatags = Metatag[];

interface MetaProps {
  title?: string;
  path?: string;
  metatags?: Metatags;
}

export function Meta({ title, metatags }: MetaProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const getTag = React.useCallback(
    (str: string, key: keyof Metatag["attributes"] = "name") => {
      const result = metatags?.find((tag) => tag.attributes[key] === str);
      return result?.attributes;
    },
    [metatags]
  );

  // We want to determine if we need to add the language path
  // to create the canonical link for this page:
  const languagePathFragment =
    router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  const data = {
    title: getTag("title")?.content ?? title,
    description: getTag("description")?.content ?? t("meta-site-description"),
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${languagePathFragment}${
      router.asPath !== "/" ? router.asPath : ""
    }`,
    imageSrc:
      getTag("image_src", "rel")?.href ||
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/metatags_default_image.png`,
  };

  data.title = data.title.concat(` | ${t("meta-site-name")}`);

  return (
    <NextSeo
      title={data.title}
      description={data.description}
      canonical={data.canonical}
      openGraph={{
        title: title,
        description: data.description,
        type: "website",
        url: data.canonical,
        images: [
          {
            url: data.imageSrc ?? "",
            alt: title,
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

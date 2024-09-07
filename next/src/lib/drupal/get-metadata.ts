import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { FragmentMetaTagFragment } from "@/lib/gql/graphql";

import { env } from "@/env";
import { routing } from "@/i18n/routing";

interface MetaProps {
  title?: string;
  context: { path: string; locale: string };
  metatags?: FragmentMetaTagFragment[];
}

type AttributeKey = keyof NonNullable<FragmentMetaTagFragment>["attributes"];

// todo: this should handle more meta tags, e.g. location, keywords, etc (and maybe generally arbitrary meta tags?)
export async function getMetadata({
  title,
  metatags,
  context: { path, locale },
}: MetaProps): Promise<Metadata> {
  const t = await getTranslations();

  const getTag = (str: string, key: AttributeKey = "name") => {
    const result = metatags?.find((tag) => tag.attributes?.[key] === str);
    return result?.attributes;
  };

  // We want to determine if we need to add the language path
  // to create the canonical link for this page:
  const languagePathFragment =
    locale === routing.defaultLocale ? "" : `/${locale}`;

  const data = {
    title: getTag("title")?.content ?? title,
    description: getTag("description")?.content ?? t("meta-site-description"),
    canonical: `${env.NEXT_PUBLIC_FRONTEND_URL}${languagePathFragment}${
      path !== "/" ? path : ""
    }`,
    // imageSrc:
    //   getTag("image_src", "rel")?.href ||
    //   `${env.NEXT_PUBLIC_FRONTEND_URL}/metatags_default_image.png`,
  };

  const computedTitle = data.title
    ? data.title.concat(` | ${t("meta-site-name")}`)
    : t("meta-site-name");

  const metadata = {
    title: computedTitle,
    description: data.description,
    openGraph: {
      title: computedTitle,
      description: data.description,
      type: "website",
      url: data.canonical,
      siteName: t("meta-site-name"),
      //   images: [
      //     {
      //       url: data.imageSrc ?? "",
      //       alt: computedTitle,
      //     },
      //   ]
    },
  } satisfies Metadata;

  return metadata;
}

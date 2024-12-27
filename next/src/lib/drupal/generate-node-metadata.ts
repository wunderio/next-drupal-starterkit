import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { removeLocaleFromPath } from "@/lib/utils";
import { TypedRouteEntity } from "@/types/graphql";

import { env } from "@/env";
import { routing } from "@/i18n/routing";

interface MetaProps {
  title?: string;
  path: string;
  locale: string;
  translations?: TypedRouteEntity["translations"];
  metatags?: FragmentMetaTagFragment[];
}

type AttributeKey = keyof NonNullable<FragmentMetaTagFragment>["attributes"];

// todo: this should handle more meta tags, e.g. location, keywords, etc (and maybe generally arbitrary meta tags?)
export async function generateNodeMetadata({
  title,
  metatags,
  translations,
  locale,
  path,
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
    canonical: `${languagePathFragment}${path}`,
    // imageSrc:
    //   getTag("image_src", "rel")?.href ||
    //   `${env.NEXT_PUBLIC_FRONTEND_URL}/metatags_default_image.png`,
  };

  // Generate alternate language links for the page:
  const alternateLanguages =
    translations &&
    Object.fromEntries(
      translations?.map((t) => {
        const locale = t.langcode.id;
        const href = removeLocaleFromPath(
          routing.defaultLocale,
          path === "/" ? `/${locale}` : t.path,
        );

        return [locale, href || "/"];
      }),
    );

  const metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_FRONTEND_URL),
    title: data.title,
    description: data.description,
    alternates: {
      canonical: data.canonical,
      languages: alternateLanguages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.canonical,
      type: "website",
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

import { getLocale, getTranslations } from "next-intl/server";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

import { getArticleListing } from "@/lib/drupal/get-article-listing";
import { ArticleTeaser } from "./article-teaser";

export async function ArticlesListing({ limit }: { limit: number }) {
  const locale = await getLocale();
  const t = await getTranslations();

  const data = await getArticleListing({ limit, locale, sticky: true });

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((article: FragmentArticleTeaserFragment) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      {!data?.at(0) && <p className="py-4">{t("no-content-found")}</p>}
    </>
  );
}

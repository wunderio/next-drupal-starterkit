import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";

import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";

export function LatestArticlesListing() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(["articles"], async () => {
    const response = await fetch("/api/articles-listing", {
      headers: {
        "accept-language": router.locale,
      },
    });

    return await response.json();
  });

  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {t("latest-articles")} - Client side
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          <p>Loading articles...</p>
        ) : (
          data?.map((article: ArticleTeaserType) => (
            <li key={article.id}>
              <ArticleTeaser article={article} />
            </li>
          ))
        )}
      </ul>
      {!data?.length && <p className="py-4">{t("no-content-found")}</p>}
    </>
  );
}

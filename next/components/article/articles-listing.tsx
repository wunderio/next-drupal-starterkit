import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";

import { ArticleTeaser } from "@/components/article/article-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

export function ArticlesListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [`articles-${router.locale}-${listingId}`],
    queryFn: async () => {
      const response = await fetch(
        `/api/articles-listing/${router.locale}?limit=${limit}`,
        {
          headers: {
            "accept-language": router.locale,
          },
        },
      );

      return await response.json();
    },
  });

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          data?.map((article: FragmentArticleTeaserFragment) => (
            <li key={article.id}>
              <ArticleTeaser article={article} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}

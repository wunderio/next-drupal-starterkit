import { useTranslation } from "next-i18next";

import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {t("latest-articles")}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
    </>
  );
}

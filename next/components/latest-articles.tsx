import { useTranslation } from "next-i18next";

import { ArticleTeaser } from "@/components/article-teaser";
import { Heading } from "@/components/heading";
import { HeadingLevel } from "@/components/heading-level/heading-level";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  const { t } = useTranslation();
  return (
    <HeadingLevel.Boundary levelOverride="2">
      <Heading>{t("latest-articles")}</Heading>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
    </HeadingLevel.Boundary>
  );
}

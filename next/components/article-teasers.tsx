import Link from "next/link";
import { useTranslation } from "next-i18next";

import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { withButtonStyles } from "@/wunder-component-library/button";

export const LinkButtonWithStyles = withButtonStyles<any>(Link);

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
  heading: string;
}

export function ArticleTeasers({ articles, heading }: LatestArticlesProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
        {articles?.length && (
          <LinkButtonWithStyles
            href="/all-articles"
            className="text-base mr-4 mt-4 inline-flex px-5 py-3"
            variant="primary"
          >
            {t("all-articles")}
            <ArrowIcon
              aria-hidden
              className="ml-3 h-6 w-6 -rotate-90"
            />
          </LinkButtonWithStyles>
        )}
      </div>
    </>
  );
}

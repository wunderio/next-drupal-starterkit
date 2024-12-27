import { useTranslations } from "next-intl";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

import { HeadingParagraph } from "../heading--paragraph";
import { ArrowLinkButton } from "../ui/arrow-link-button";

import { ArticleTeaser } from "./article-teaser";

interface LatestArticlesProps {
  articles?: FragmentArticleTeaserFragment[];
  heading: string;
}

export function ArticleTeasers({ articles, heading }: LatestArticlesProps) {
  const t = useTranslations();

  return (
    <>
      <HeadingParagraph>{heading}</HeadingParagraph>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
        {articles?.length && (
          <ArrowLinkButton
            variant="default"
            href="/all-articles"
            className="mt-4"
          >
            {t("all-articles")}
          </ArrowLinkButton>
        )}
      </div>
    </>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

import { HeadingPage } from "@/components/heading--page";
import { Pagination, PaginationProps } from "@/components/pagination";
import { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

import { ArticleListItem } from "./articles-list-item";

type ArticlesListingPageParams = {
  articles: FragmentArticleTeaserFragment[];
  paginationProps: PaginationProps;
};

export default function ArticlesPagination({
  articles,
  paginationProps,
}: ArticlesListingPageParams) {
  const t = useTranslations();
  const focusRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("all-articles")}</HeadingPage>
      <ul className="mt-4">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <Pagination
        paginationProps={paginationProps}
        focusRestoreRef={focusRef}
      />
    </>
  );
}

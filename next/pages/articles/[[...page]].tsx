import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

import { HeadingPage } from "@/components/heading--page";
import { LatestArticles } from "@/components/latest-articles";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import { getLatestArticlesItems } from "@/lib/get-articles";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";

interface ArticlesPageProps extends LayoutProps {
  articleTeasers: ArticleTeaser[];
  paginationProps: PaginationProps;
}

export default function ArticlesPage({
  articleTeasers = [],
  paginationProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={t("all-articles")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("all-articles")}</HeadingPage>
      {articleTeasers && <LatestArticles articles={articleTeasers} />}
      <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationProps}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { page: ["1"] },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async (
  context
) => {
  // Get the page parameter:
  const page = context.params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 2;
  const { totalPages, articles } = await getLatestArticlesItems({
    limit: PAGE_SIZE,
    offset: PAGE_SIZE * (currentPage - 1),
    locale: context.locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/articles";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  return {
    props: {
      ...(await getCommonPageProps(context)),
      articleTeasers: articles.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser)
      ),
      paginationProps: {
        currentPage,
        totalPages,
        prevEnabled,
        nextEnabled,
        prevPageHref,
        nextPageHref,
      },
    },
    revalidate: 60,
  };
};

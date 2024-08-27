import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { REVALIDATE_LONG } from "@/lib/constants";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";

import ArticlesPagination from "./_components/articles-pagination";

type ArticlesListingPageParams = {
  params: {
    locale: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("all-articles"),
  };
}

export const revalidate = REVALIDATE_LONG;

export default async function AllArticlesPage({
  params: { locale },
  searchParams,
}: ArticlesListingPageParams) {
  unstable_setRequestLocale(locale);

  // Get the query and current page from the search params
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // This has to match one of the allowed values in the article listing view
  // in Drupal.
  const PAGE_SIZE = 5;

  const variables = {
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
    query,
  };

  const { articles, totalPages } = await getLatestArticlesItems(variables);

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = `/all-articles`;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    prevEnabled &&
    `${pageRoot}?page=${prevPage}` + (query && `&query=${query}`);
  const nextPageHref =
    nextEnabled &&
    `${pageRoot}?page=${nextPage}` + (query && `&query=${query}`);

  const paginationProps = {
    currentPage,
    totalPages,
    prevEnabled,
    nextEnabled,
    prevPageHref,
    nextPageHref,
  };

  return (
    <ArticlesPagination articles={articles} paginationProps={paginationProps} />
  );
}

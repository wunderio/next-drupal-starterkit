import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { REVALIDATE_LONG } from "@/lib/constants";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";

import ArticlesPagination from "./_components/articles-pagination";

import { getPathname } from "@/i18n/routing";

type ArticlesListingPageParams = {
  params: {
    locale: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata({
  params: { locale },
}: ArticlesListingPageParams): Promise<Metadata> {
  const t = await getTranslations({ locale });

  // Example: This page accepts search params like `?page=1`.
  // A canonical link informs search engines that only the
  // version without search params should be indexed.
  const pathname = getPathname({
    //@ts-expect-error
    locale,
    href: {
      pathname: "/all-articles",
    },
  });

  return {
    title: t("all-articles"),
    alternates: {
      canonical: "/" + locale + pathname,
    },
  };
}

export const revalidate = REVALIDATE_LONG;

export default async function AllArticlesPage({
  params: { locale },
  searchParams,
}: ArticlesListingPageParams) {
  unstable_setRequestLocale(locale);

  // Get the query and current page from the search params
  const currentPage = Number(searchParams?.page) || 1;

  // This has to match one of the allowed values in the article listing view
  // in Drupal.
  const PAGE_SIZE = 5;

  const variables = {
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
  };

  const { articles, totalPages } = await getLatestArticlesItems(variables);

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = `/all-articles`;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref = prevEnabled && `${pageRoot}?page=${prevPage}`;
  const nextPageHref = nextEnabled && `${pageRoot}?page=${nextPage}`;

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

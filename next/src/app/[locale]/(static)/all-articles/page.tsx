import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getLatestArticlesItems } from "@/lib/drupal/get-articles";

import ArticlesPagination from "./_components/articles-pagination";

import { getPathname } from "@/i18n/routing";

type ArticlesListingPageParams = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

export async function generateMetadata({
  params,
}: ArticlesListingPageParams): Promise<Metadata> {
  const { locale } = await params;
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

export const revalidate = 600; // REVALIDATE_LONG — must be a static literal for Next.js build analysis

export default async function AllArticlesPage({
  params,
  searchParams,
}: ArticlesListingPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get the query and current page from the search params
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

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

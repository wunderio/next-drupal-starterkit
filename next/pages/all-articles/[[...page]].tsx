import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

import { ArticleListItem } from "@/components/article/article-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import { REVALIDATE_LONG } from "@/lib/constants";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

interface AllArticlesPageProps extends LayoutProps {
  articleTeasers: FragmentArticleTeaserFragment[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
}

export default function AllArticlesPage({
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
      <ul className="mt-4">
        {articleTeasers?.map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
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

export const getStaticProps: GetStaticProps<AllArticlesPageProps> = async ({
  locale,
  locales,
  params,
}) => {
  const commonPageProps = getCommonPageProps({ locale });

  // Get the page parameter:
  const page = params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  // This has to match one of the allowed values in the article listing view
  // in Drupal.
  const PAGE_SIZE = 5;

  const { totalPages, articles } = await getLatestArticlesItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/all-articles";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  // Create language links for this page.
  // Note: the links will always point to the first page, because we cannot guarantee that
  // the other pages will exist in all languages.
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, locales);

  return {
    props: {
      ...(await commonPageProps),
      articleTeasers: articles,
      paginationProps: {
        currentPage,
        totalPages,
        prevEnabled,
        nextEnabled,
        prevPageHref,
        nextPageHref,
      },
      languageLinks,
    },
    revalidate: REVALIDATE_LONG,
  };
};

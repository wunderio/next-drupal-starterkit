import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import { LatestArticles } from "@/components/latest-articles";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { getLatestArticlesItems } from "@/lib/get-articles";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";

interface ArticlesPageProps extends LayoutProps {
  articleTeasers: ArticleTeaser[];
}

export default function ArticlesPage({
  articleTeasers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  return (
    <>
      <Meta title="Articles" metatags={[]} />
      <HeadingPage>{t("All articles")}</HeadingPage>
      {articleTeasers && <LatestArticles articles={articleTeasers} />}
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

  console.log(totalPages);

  console.log(currentPage);
  console.log(page);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      articleTeasers: articles.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser)
      ),
    },
    revalidate: 60,
  };
};

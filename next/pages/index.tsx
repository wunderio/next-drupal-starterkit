import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";

import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Node } from "@/components/node";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  GET_ENTITY_AT_DRUPAL_PATH,
  LISTING_ARTICLES,
} from "@/lib/graphql/queries";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import type { ArticleTeaserType } from "@/types/graphql";
import type { FrontpageType } from "@/types/graphql";

import { Divider } from "@/ui/divider";

interface HomepageProps extends LayoutProps {
  frontpage: FrontpageType | null;
  stickyArticleTeasers: ArticleTeaserType[];
}

export default function IndexPage({
  frontpage,
  stickyArticleTeasers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  return (
    <>
      <Meta
        title={frontpage?.title}
        metatags={frontpage?.metatag as FragmentMetaTagFragment[]}
      />
      <Node node={frontpage} />
      <Divider className="max-w-4xl" />
      <ContactForm />
      <Divider className="max-w-4xl" />
      <ArticleTeasers
        heading={t("promoted-articles")}
        articles={stickyArticleTeasers}
      />
      <ContactList />
      <LogoStrip />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomepageProps> = async (
  context,
) => {
  const variables = {
    // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal:
    path: `frontpage-${context.locale}`,
    langcode: context.locale,
  };

  const data = await drupal.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
  );

  const frontpage = extractEntityFromRouteQueryResult(data);

  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!context.preview && frontpage.status !== true) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  // Get the last 3 sticky articles in the current language:
  const stickyArticleTeasers = await drupal.doGraphQlRequest(LISTING_ARTICLES, {
    langcode: context.locale,
    sticky: true,
    page: 0,
    pageSize: 3,
  });

  // We cast the results as the ListingArticle type to get type safety:
  const articles =
    (stickyArticleTeasers.articlesView?.results as ArticleTeaserType[]) ?? [];

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage,
      stickyArticleTeasers: articles,
    },
    revalidate: 60,
  };
};

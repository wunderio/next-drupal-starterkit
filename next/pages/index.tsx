import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { AbortError } from "p-retry";

import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Node } from "@/components/node";
import { REVALIDATE_LONG } from "@/lib/constants";
import {
  drupalClientPreviewer,
  drupalClientViewer,
} from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  GET_ENTITY_AT_DRUPAL_PATH,
  LISTING_ARTICLES,
} from "@/lib/graphql/queries";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import type { FrontpageType } from "@/types/graphql";

import { env } from "@/env";
import { Divider } from "@/ui/divider";

interface HomepageProps extends LayoutProps {
  frontpage: FrontpageType | null;
  stickyArticleTeasers: FragmentArticleTeaserFragment[];
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

export const getStaticProps: GetStaticProps<HomepageProps> = async ({
  locale,
  preview,
}) => {
  const commonPageProps = getCommonPageProps({ locale });

  const drupalClient = preview ? drupalClientPreviewer : drupalClientViewer;

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal:
  const path = `frontpage-${locale}`;

  const [nodeByPathResult, stickyArticleTeasers] = await Promise.all([
    drupalClient.doGraphQlRequest(GET_ENTITY_AT_DRUPAL_PATH, {
      path,
      langcode: locale,
    }),
    drupalClient.doGraphQlRequest(LISTING_ARTICLES, {
      langcode: locale,
      sticky: true,
      page: 0,
      pageSize: 3,
    }),
  ]).catch((error: unknown) => {
    const type =
      error instanceof AbortError
        ? "GraphQL"
        : error instanceof TypeError
          ? "Network"
          : "Unknown";

    const moreInfo =
      type === "GraphQL"
        ? `Check graphql_compose logs: ${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/admin/reports`
        : "";

    throw new Error(
      `${type} Error during GetNodeByPath query with $path: "${path}" and $langcode: "${locale}". ${moreInfo}`,
    );
  });

  const frontpage = extractEntityFromRouteQueryResult(nodeByPathResult);

  if (!frontpage || frontpage.__typename !== "NodeFrontpage") {
    throw new Error("Frontpage not found for locale " + locale);
  }

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!preview && frontpage.status !== true) {
    throw new Error("Frontpage not published for locale " + locale);
  }

  return {
    props: {
      ...(await commonPageProps),
      frontpage,
      stickyArticleTeasers:
        (stickyArticleTeasers.articlesView
          ?.results as FragmentArticleTeaserFragment[]) ?? [],
    },
    revalidate: REVALIDATE_LONG,
  };
};

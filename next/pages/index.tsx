import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { ArticleTeasers } from "@/components/article-teasers";
import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { NodeFrontPage } from "@/components/node/node--frontpage";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  GET_ENTITY_AT_DRUPAL_PATH,
  LISTING_ARTICLES,
} from "@/lib/graphql/queries";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import type { FrontpageType } from "@/types/graphql";

import { Divider } from "@/ui/divider";

interface HomepageProps extends LayoutProps {
  frontpage: FrontpageType | null;
  promotedArticleTeasers: ArticleTeaser[];
}

export default function IndexPage({
  frontpage,
  promotedArticleTeasers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Meta
        title={frontpage?.title}
        metatags={frontpage?.metatag as FragmentMetaTagFragment[]}
      />
      <NodeFrontPage page={frontpage} />
      <Divider className="max-w-4xl" />
      <ContactForm />
      <Divider className="max-w-4xl" />
      <ArticleTeasers
        articles={promotedArticleTeasers}
        heading={t("promoted-articles")}
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
    };
  }

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!context.preview && frontpage.status !== true) {
    return {
      notFound: true,
    };
  }

  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "filter[promote]": 1,
      "fields[node--article]": "title,path,field_image,uid,created",
      include: "field_image,uid",
      sort: "-sticky,-created",
      "page[limit]": 3,
    },
  });

  // Get the last 3 sticky articles in the current language:
  const stickyArticleTeasers = await drupal.doGraphQlRequest(LISTING_ARTICLES, {
    filter: {
      sticky: true,
      langcode: context.locale,
    },
    // Get the first page
    page: 0,
    // Get the last 3 items
    pageSize: 3,
  });

  // TODO: We only console.log this for now
  console.log(JSON.stringify(stickyArticleTeasers, null, 2));

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage,
      promotedArticleTeasers: promotedArticleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
      ),
    },
    revalidate: 60,
  };
};

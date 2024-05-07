import type { PreviewData, Redirect } from "next";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { Meta } from "@/components/meta";
import { Node } from "@/components/node";
import {
  createLanguageLinks,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getStandardLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  GET_ENTITY_AT_DRUPAL_PATH,
  GET_STATIC_PATHS,
} from "@/lib/graphql/queries";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "@/lib/graphql/utils";
import { TypedRouteEntity } from "@/types/graphql";

export default function CustomPage({
  node,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!node) {
    return null;
  }

  return (
    <>
      <Meta
        title={node.title}
        metatags={node.metatag as FragmentMetaTagFragment[]}
      />
      <Node node={node} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  // We want to generate static paths for all locales:
  const locales = context.locales || [];

  const staticPaths: ReturnType<typeof drupal.buildStaticPathsParamsFromPaths> =
    [];

  for (const locale of locales) {
    // Get the defined paths via graphql for the current locale:
    const data = await drupal.doGraphQlRequest(GET_STATIC_PATHS, {
      // We will query for the latest 10 items of each content type:
      number: 10,
      langcode: locale,
    });

    // Get all paths from the response:
    const pathArray = [
      ...(data?.nodePages?.nodes || []),
      ...(data?.nodeArticles?.nodes || []),
    ].map(({ path }) => path);

    // Build static paths for the current locale.
    const localePaths = drupal.buildStaticPathsParamsFromPaths(pathArray, {
      locale,
      // Because graphql returns the path with the language prefix, we strip it using the pathPrefix option:
      pathPrefix: `/${locale}`,
    });

    // Add the paths to the static paths array:
    staticPaths.push(...localePaths);
  }

  return {
    paths: staticPaths,
    fallback: "blocking",
  };
};

interface PageProps extends CommonPageProps {
  node: TypedRouteEntity;
  languageLinks: LanguageLinks;
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  // Get the path from the context:
  const path = Array.isArray(context.params.slug)
    ? `/${context.params.slug?.join("/")}`
    : context.params.slug;

  const variables = {
    path: path,
    langcode: context.locale,
  };

  // Are we in Next.js preview mode?
  const isPreview = context.preview || false;

  // Get the page data with Graphql:
  const data = await drupal.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
    // We want to use authentication only if this is a preview request:
    isPreview ? true : false,
  );

  // If the data contains a RedirectResponse, we redirect to the path:
  const redirect = extractRedirectFromRouteQueryResult(data);

  if (redirect) {
    return {
      redirect: {
        destination: redirect.url,
        // Set to temporary redirect for 302 and 307 status codes,
        // and permanent for all others.
        permanent: !(redirect.status === 307 || redirect.status === 302),
      },
    };
  }

  // Get the entity from the response:
  let nodeEntity = extractEntityFromRouteQueryResult(data);

  // If there's no node, return 404:
  if (!nodeEntity) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  // If node is a frontpage, redirect to / for the current locale:
  if (nodeEntity.__typename === "NodeFrontpage") {
    return {
      redirect: {
        destination: `/${context.locale}`,
        permanent: false,
      } satisfies Redirect,
    };
  }

  // When in preview, we could be requesting a specific revision.
  // In this case, the previewData will contain the resourceVersion property,
  // we can use that in combination with the node id to fetch the correct revision
  // This means that we will need to do a second request to Drupal.
  const { previewData } = context as {
    previewData: PreviewData & { resourceVersion?: string };
  };
  if (
    isPreview &&
    previewData &&
    typeof previewData === "object" &&
    previewData.resourceVersion &&
    // If the resourceVersion is "rel:latest-version", we don't need to fetch the revision:
    previewData.resourceVersion !== "rel:latest-version"
  ) {
    // Get the node id from the entity we already have:
    const nodeId = nodeEntity.id;
    // the revision will be in the format "id:[id]":
    const revisionId = previewData.resourceVersion.split(":").slice(1);
    // To fetch the entity at a specific revision, we need to call a specific path:
    const revisionPath = `/node/${nodeId}/revisions/${revisionId}/view`;

    // Get the node at the specific data with Graphql:
    const revisionRoutedata = await drupal.doGraphQlRequest(
      GET_ENTITY_AT_DRUPAL_PATH,
      { path: revisionPath, langcode: context.locale },
      // We need to do an authenticated request to get the revision:
      true,
    );

    // Instead of the entity at the current revision, we want now to
    // display the entity at the requested revision:
    nodeEntity = extractEntityFromRouteQueryResult(revisionRoutedata);
    if (!nodeEntity) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }
  }

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!isPreview && nodeEntity.status !== true) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  // Add information about possible other language versions of this node.
  let languageLinks;
  // Not all node types necessarily have translations enabled,
  // if so, only show the standard language links.
  if ("translations" in nodeEntity) {
    languageLinks = createLanguageLinks(nodeEntity.translations);
  } else {
    languageLinks = getStandardLanguageLinks();
  }

  return {
    props: {
      ...(await getCommonPageProps(context)),
      node: nodeEntity,
      languageLinks,
    },
    revalidate: 60,
  };
};

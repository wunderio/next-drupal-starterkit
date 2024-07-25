import type { GetStaticPathsResult, Redirect } from "next";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { Meta } from "@/components/meta";
import { Node } from "@/components/node";
import {
  createLanguageLinks,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getStandardLanguageLinks } from "@/lib/contexts/language-links-context";
import {
  drupalClientPreviewer,
  drupalClientViewer,
} from "@/lib/drupal/drupal-client";
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const staticPaths: GetStaticPathsResult["paths"] = [];

  for (const locale of locales) {
    // Get the defined paths via graphql for the current locale:
    const data = await drupalClientViewer.doGraphQlRequest(GET_STATIC_PATHS, {
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
    const localePaths = drupalClientViewer.buildStaticPathsParamsFromPaths(
      pathArray,
      {
        locale,
        // Because graphql returns the path with the language prefix, we strip it using the pathPrefix option:
        pathPrefix: `/${locale}`,
      },
    );

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

export const getStaticProps: GetStaticProps<PageProps> = async ({
  locale,
  params,
  preview,
  previewData,
}) => {
  const commonPageProps = getCommonPageProps({ locale });

  const drupalClient = preview ? drupalClientPreviewer : drupalClientViewer;
  const path = "/" + (params.slug as string[]).join("/");

  const nodeByPathResult = await drupalClient.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    {
      path,
      langcode: locale,
    },
  );

  // If the data contains a RedirectResponse, we redirect to the path:
  const redirect = extractRedirectFromRouteQueryResult(nodeByPathResult);

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

  let node = extractEntityFromRouteQueryResult(nodeByPathResult);

  // If there's no node, return 404:
  if (!node) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  // If node is a frontpage, redirect to / for the current locale:
  if (node.__typename === "NodeFrontpage") {
    return {
      redirect: {
        destination: `/${locale}`,
        permanent: false,
      } satisfies Redirect,
    };
  }

  // When in preview, we could be requesting a specific revision.
  // In this case, the previewData will contain the resourceVersion property,
  // we can use that in combination with the node id to fetch the correct revision
  // This means that we will need to do a second request to Drupal.
  if (
    preview &&
    typeof previewData === "object" &&
    "resourceVersion" in previewData &&
    typeof previewData.resourceVersion === "string" &&
    previewData.resourceVersion !== "rel:latest-version"
  ) {
    const [nodeId, revisionId] = previewData.resourceVersion.split(":");
    const path = `/node/${nodeId}/revisions/${revisionId}/view`;
    const revisionRoutedata = await drupalClient.doGraphQlRequest(
      GET_ENTITY_AT_DRUPAL_PATH,
      { path, langcode: locale },
    );

    // Instead of the entity at the current revision, we want now to
    // display the entity at the requested revision:
    node = extractEntityFromRouteQueryResult(revisionRoutedata);
    if (!node) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }
  }

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!preview && node.status !== true) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  // Add information about possible other language versions of this node.
  let languageLinks;
  // Not all node types necessarily have translations enabled,
  // if so, only show the standard language links.
  if ("translations" in node) {
    languageLinks = createLanguageLinks(node.translations);
  } else {
    languageLinks = getStandardLanguageLinks();
  }

  return {
    props: {
      ...(await commonPageProps),
      node: node,
      languageLinks,
    },
    revalidate: 60,
  };
};

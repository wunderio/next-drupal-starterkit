import type { GetStaticPathsResult, Redirect } from "next";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { AbortError } from "p-retry";

import { Meta } from "@/components/meta";
import { Node } from "@/components/node";
import { REVALIDATE_LONG, REVALIDATE_SHORT } from "@/lib/constants";
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

import { env } from "@/env";

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
  defaultLocale,
  params,
  preview,
  previewData,
  revalidateReason,
}) => {
  const commonPageProps = getCommonPageProps({ locale });

  const drupalClient = preview ? drupalClientPreviewer : drupalClientViewer;
  const path = "/" + (params.slug as string[]).join("/");

  const nodeByPathResult = await drupalClient
    .doGraphQlRequest(GET_ENTITY_AT_DRUPAL_PATH, {
      path,
      langcode: locale,
    })
    .catch((error: unknown) => {
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

  // The response will contain either a redirect or node data.
  // If it's a redirect, redirect to the new path:
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

  // Node not found:
  if (!node) {
    switch (revalidateReason) {
      case "build":
        // Pages returned from getStaticPaths should always exist. Abort the build:
        throw new Error(
          `Node not found in GetNodeByPath query response with $path: "${path}" and $langcode: "${locale}".`,
        );
      case "stale":
      case "on-demand":
      default:
        // Not an error, the requested node just doesn't exist. Return 404:
        return {
          notFound: true,
          revalidate: REVALIDATE_LONG,
        };
    }
  }

  // Node is not published:
  if (!preview && node.status !== true) {
    return {
      notFound: true,
      revalidate: REVALIDATE_LONG,
    };
  }

  // Node is actually a frontpage:
  if (!preview && node.__typename === "NodeFrontpage") {
    return {
      redirect: {
        destination: locale === defaultLocale ? "/" : `/${locale}`,
        permanent: false,
      } satisfies Redirect,
      revalidate: REVALIDATE_LONG,
    };
  }

  // When in preview, we could be requesting a specific revision.
  // In this case, the previewData will contain the resourceVersion property,
  // which we can use to fetch the correct revision:
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
        revalidate: REVALIDATE_SHORT,
      };
    }
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
      node,
      languageLinks,
    },
    revalidate: REVALIDATE_LONG,
  };
};

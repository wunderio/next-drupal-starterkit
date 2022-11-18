import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Layout } from "components/layout";
import { NodeArticle } from "components/node--article";
import { NodeBasicPage } from "components/node--basic-page";
import { drupal } from "lib/drupal";

import { setLanguageLinks } from "../utils/locale.utils";

import { LangContext } from "./_app";

const RESOURCE_TYPES = ["node--page", "node--article"];

interface NodePageProps {
  resource: DrupalNode;
}
interface NodeProps extends NodePageProps {
  translations: Array<string>;
}

export default function NodePage({ resource }: NodeProps) {
  if (!resource) return null;
  
  return (
    <LangContext.Provider
      value={{
        languageLinks: setLanguageLinks(resource.translations),
      }}
    >
      <Layout>
        <Head>
          <title>{resource.title}</title>
          <meta
            name="description"
            content="A Next.js site powered by Drupal."
          />
        </Head>
        {resource.type === "node--page" && <NodeBasicPage node={resource} />}
        {resource.type === "node--article" && <NodeArticle node={resource} />}
      </Layout>
    </LangContext.Provider>
  );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  const paths = await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context);

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName;

  let params = {};

  if (type === "node--article") {
    params = {
      include: "field_image,uid",
      "filter[langcode]": context.locale,
    };
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  );

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }

  const nodeTranslations = {};
  for (let i = 0; i < context.locales.length; i++) {
    const lang = context.locales[i];
    const translated = await drupal.getResource("node--article", resource.id, {
      locale: lang,
      defaultLocale: context.defaultLocale,
    });
    nodeTranslations[lang] = translated.path.alias;
  }

  resource.translations = nodeTranslations;

  return {
    props: {
      resource,
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ["common"]
      )),
    },
  };
}

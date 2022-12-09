import { GetStaticPropsResult } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getMenus } from "lib/get-menus";
import { setLanguageLinks } from "lib/utils";

import { Layout, LayoutProps } from "../components/layout";
import { NodeArticleTeaser } from "../components/node--article--teaser";
import { drupal } from "../lib/drupal";

import { LangContext } from "./_app";

interface IndexPageProps extends LayoutProps {
  nodes: DrupalNode[];
}

export default function IndexPage({ nodes, menus }: IndexPageProps) {
  const { t } = useTranslation("common");
  return (
    <LangContext.Provider
      value={{
        languageLinks: setLanguageLinks([]),
      }}
    >
      <Layout menus={menus}>
        <Head>
          <title>Next.js for Drupal</title>
          <meta
            name="description"
            content="A Next.js site powered by a Drupal backend."
          />
        </Head>
        <div>
          <h1 className="mb-10 text-6xl font-black">{t("latest-articles")}</h1>
          {nodes?.length ? (
            nodes.map((node) => (
              <div key={node.id}>
                <NodeArticleTeaser node={node} />
                <hr className="my-20" />
              </div>
            ))
          ) : (
            <p className="py-4">{t("no-content-found")}</p>
          )}
        </div>
      </Layout>
    </LangContext.Provider>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[langcode]": context.locale,
        "fields[node--article]": "title,path,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
    }
  );

  return {
    props: {
      nodes,
      menus: await getMenus(context),
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
    revalidate: 60,
  };
}

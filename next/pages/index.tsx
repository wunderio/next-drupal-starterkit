import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { NodeFrontpage } from "@/components/node--frontpage";
import { getMenus } from "@/lib/get-menus";
import { getNodePageJsonApiParams } from "@/lib/get-params";
import { setLanguageLinks } from "@/lib/utils";
import { LangContext } from "@/pages/_app";

import { Layout, LayoutProps } from "../components/layout";
import { NodeArticleTeaser } from "../components/node--article--teaser";
import { drupal } from "../lib/drupal";

interface IndexPageProps extends LayoutProps {
  articles: DrupalNode[];
  frontpageNode: DrupalNode;
}

export default function IndexPage({
  articles,
  frontpageNode,
  menus,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
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
          <>
            {frontpageNode && <NodeFrontpage node={frontpageNode} />}
            <h2 className="mb-10 text-4xl font-black">
              {t("latest-articles")}
            </h2>
            {articles?.length ? (
              articles.map((node) => (
                <div key={node.id}>
                  <NodeArticleTeaser node={node} />
                  <hr className="my-20" />
                </div>
              ))
            ) : (
              <p className="py-4">{t("no-content-found")}</p>
            )}
          </>
        </div>
      </Layout>
    </LangContext.Provider>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context
) => {
  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
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

  const frontPageNodes = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--frontpage", context, {
    params: getNodePageJsonApiParams("node--frontpage"),
  });

  return {
    props: {
      articles,
      frontpageNode: frontPageNodes[0] || null,
      menus: await getMenus(context),
      ...(await serverSideTranslations(context.locale)),
    },
    revalidate: 60,
  };
};

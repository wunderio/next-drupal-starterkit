import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { NodeFrontpage } from "@/components/node--frontpage";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getNodePageJsonApiParams } from "@/lib/get-params";

import { LayoutProps } from "../components/layout";
import { NodeArticleTeaser } from "../components/node--article--teaser";
import { drupal } from "../lib/drupal";

interface IndexPageProps extends LayoutProps {
  articles: DrupalNode[];
  frontpageNode: DrupalNode;
}

export default function IndexPage({
  articles,
  frontpageNode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  return (
    <>
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
          <h2 className="text-heading-md font-bold md:text-heading-lg">
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
    </>
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
      ...(await getCommonPageProps(context)),
      articles,
      frontpageNode: frontPageNodes[0] || null,
    },
    revalidate: 60,
  };
};

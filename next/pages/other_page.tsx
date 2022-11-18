import { GetStaticPropsResult } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "../components/layout";
import { NodeArticleTeaser } from "../components/node--article--teaser";
import { drupal } from "../lib/drupal";

interface IndexPageProps {
  nodes: DrupalNode[];
}

export default function OtherPage({ nodes }: IndexPageProps) {
  const { t } = useTranslation("common");
  return (
    <Layout>
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
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}

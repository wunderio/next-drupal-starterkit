import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";

import { ContactForm } from "@/components/contact-form";
import { Divider } from "@/components/divider";
import { LatestArticles } from "@/components/latest-articles";
import { Meta } from "@/components/meta";
import { NodeFrontpage } from "@/components/node--frontpage";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getNodePageJsonApiParams } from "@/lib/get-params";

import { LayoutProps } from "../components/layout";
import { drupal } from "../lib/drupal";

interface IndexPageProps extends LayoutProps {
  articles: DrupalNode[];
  frontpageNode?: DrupalNode;
}

export default function IndexPage({
  articles,
  frontpageNode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {frontpageNode && (
        <Meta title={frontpageNode.title} metatags={frontpageNode.metatag} />
      )}

      <NodeFrontpage node={frontpageNode} />
      <Divider />
      <LatestArticles articles={articles} />
      <Divider />
      <ContactForm />
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

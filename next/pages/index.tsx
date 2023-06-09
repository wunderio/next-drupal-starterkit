import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";

import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { LatestArticles } from "@/components/latest-articles";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import { drupal } from "@/lib/drupal";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getNodePageJsonApiParams } from "@/lib/get-node-page-json-api-params";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";

import { Divider } from "@/wunder-component-library/divider";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  articleTeasers: ArticleTeaser[];
}

export default function IndexPage({
  frontpage,
  articleTeasers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <div className="grid gap-4">
        {frontpage?.field_content_elements?.map((paragraph) => (
          <Paragraph paragraph={paragraph} key={paragraph.id} />
        ))}
      </div>
      <Divider className="max-w-4xl" />
      <ContactForm />
      <Divider className="max-w-4xl" />
      <LatestArticles articles={articleTeasers} />
      <ContactList />
      <LogoStrip />
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context
) => {
  const frontpage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--frontpage",
      context,
      {
        params: getNodePageJsonApiParams("node--frontpage").getQueryObject(),
      }
    )
  ).at(0);

  const articleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "fields[node--article]": "title,path,field_image,uid,created",
      include: "field_image,uid",
      sort: "-created",
      "page[limit]": 3,
    },
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      articleTeasers: articleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser)
      ),
    },
    revalidate: 60,
  };
};

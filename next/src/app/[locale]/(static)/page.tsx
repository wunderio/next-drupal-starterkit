import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";

import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import { LogoStrip } from "@/components/logo-strip";
import { Node } from "@/components/node";
import { REVALIDATE_LONG } from "@/lib/constants";
import { getArticleTeasers } from "@/lib/drupal/get-article-teasers";
import { getMetadata } from "@/lib/drupal/get-metadata";
import { getNodeQueryResult } from "@/lib/drupal/get-node";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

import { Divider } from "@/ui/divider";

type FrontpageParams = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: FrontpageParams): Promise<Metadata> {
  const path = `/frontpage-${locale}`;

  // Fetch the frontpage node from Drupal used to generate metadata.
  const data = await getNodeQueryResult(path, locale);
  const nodeEntity = extractEntityFromRouteQueryResult(data);

  // get metadata for the frontpage node.
  const metadata = await getMetadata({
    title: nodeEntity.title,
    metatags: nodeEntity.metatag as FragmentMetaTagFragment[],
    context: {
      path,
      locale,
    },
  });

  return metadata;
}

export const revalidate = REVALIDATE_LONG;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  // Here we fetch the frontpage node and the latest 3 promoted articles in parallel to
  // avoid unnecessary delays in rendering
  const [node, articleTeasers] = await Promise.all([
    getNodeQueryResult(path, locale),
    getArticleTeasers({ limit: 3, locale, sticky: true }),
  ]);

  // Extract the frontpage node from the query result
  const frontpage = extractEntityFromRouteQueryResult(node);

  // If the node does not exist or is not a frontpage, we throw an error
  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    throw new Error("Frontpage not found for locale " + locale);
  }

  // Unless we are in draftMode, we throw an error if the node is set to unpublished:
  if (!draftMode().isEnabled && frontpage.status !== true) {
    throw new Error("Frontpage not published for locale " + locale);
  }

  return (
    <>
      <Node node={frontpage} />
      <Divider className="max-w-4xl" />
      <ContactForm />
      <Divider className="max-w-4xl" />
      <ArticleTeasers
        heading={t("promoted-articles")}
        articles={articleTeasers}
      />
      <ContactList />
      <LogoStrip />
    </>
  );
}

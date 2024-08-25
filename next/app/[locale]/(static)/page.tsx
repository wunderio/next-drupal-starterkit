import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import { LogoStrip } from "@/components/logo-strip";
import { Node } from "@/components/node";
import { getArticleTeasers } from "@/lib/drupal/get-article-teasers";
import { getMetadata } from "@/lib/drupal/get-metadata";
import { getNodeQueryResult } from "@/lib/drupal/get-node";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import { Divider } from "@/ui/divider";
import { Metadata } from "next";

type FrontpageParams = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: FrontpageParams): Promise<Metadata> {
  const path = `/frontpage-${locale}`;

  const data = await getNodeQueryResult(path, locale);
  const nodeEntity = extractEntityFromRouteQueryResult(data);

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

export const revalidate = 10;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  // Get the node entity from Drupal and extract the frontpage node
  const [node, articleTeasers] = await Promise.all([
    getNodeQueryResult(path, locale),
    getArticleTeasers({ limit: 3, locale, sticky: true }),
  ]);

  const frontpage = extractEntityFromRouteQueryResult(node);

  // If the node does not exist or is not a frontpage, return 404
  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    return notFound();
  }

  // Unless we are in draftMode, return 404 if the node is set to unpublished:
  if (!draftMode().isEnabled && frontpage.status !== true) {
    notFound();
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

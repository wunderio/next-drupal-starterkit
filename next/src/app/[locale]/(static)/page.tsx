import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactFormContainer } from "@/components/forms/contact-form-container";
import { LogoStrip } from "@/components/logo-strip";
import { Node } from "@/components/node";
import { REVALIDATE_LONG } from "@/lib/constants";
import { getArticleTeasers } from "@/lib/drupal/get-article-teasers";
import { getNodeByPathQuery } from "@/lib/drupal/get-node";
import { getNodeMetadata } from "@/lib/drupal/get-node-metadata";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

import { Divider } from "@/ui/divider";

type FrontpageParams = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: FrontpageParams): Promise<Metadata> {
  const path = `/frontpage-${locale}`;
  const metadata = await getNodeMetadata(path, locale);
  return metadata;
}

export const revalidate = REVALIDATE_LONG;
export const dynamic = "force-static";

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  // Here we fetch the frontpage node and the latest 3 promoted articles in parallel to
  // avoid unnecessary delays in rendering
  const [nodeByPathResult, articleTeasers] = await Promise.all([
    getNodeByPathQuery(path, locale),
    getArticleTeasers({ limit: 3, locale, sticky: true }),
  ]);

  if (nodeByPathResult.error) {
    throw new Error(nodeByPathResult.error);
  }

  // Extract the frontpage node from the query result
  const frontpage = extractEntityFromRouteQueryResult(nodeByPathResult.data);

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
      <ContactFormContainer />
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

import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import { LogoStrip } from "@/components/logo-strip";
import { Node } from "@/components/node";
import { Separator } from "@/components/ui/separator";
import { REVALIDATE_LONG } from "@/lib/constants";
import { getArticleTeasers } from "@/lib/drupal/get-article-teasers";
import { getNodeByPathQuery } from "@/lib/drupal/get-node";
import { getNodeMetadata } from "@/lib/drupal/get-node-metadata";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

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

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  setRequestLocale(locale);
  const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  // Here we fetch the frontpage node and the latest 3 promoted articles in parallel to
  // avoid unnecessary delays in rendering
  const [nodeByPathResult, articleTeasers] = await Promise.all([
    getNodeByPathQuery(path, locale),
    getArticleTeasers({ limit: 3, locale, sticky: true }),
  ]);

  // Extract the frontpage node from the query result
  const frontpage = extractEntityFromRouteQueryResult(nodeByPathResult);

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
      <Separator className="mx-auto my-9 max-w-4xl" />
      <ContactForm />
      <Separator className="mx-auto my-9 max-w-4xl" />
      <ArticleTeasers
        heading={t("promoted-articles")}
        articles={articleTeasers}
      />
      <ContactList />
      <LogoStrip />
    </>
  );
}

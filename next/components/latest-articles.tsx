import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { NodeArticleTeaser } from "@/components/node--article--teaser";

export function LatestArticles({ articles }: { articles?: DrupalNode[] }) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {t("latest-articles")}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles?.map((node) => (
          <li key={node.id}>
            <NodeArticleTeaser node={node} />
          </li>
        ))}
      </ul>
      {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
    </>
  );
}

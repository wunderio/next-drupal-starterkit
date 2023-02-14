import Image from "next/image";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { absoluteUrl, formatDate } from "@/lib/utils";

interface NodeArticleProps {
  node: DrupalNode;
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  const { t } = useTranslation();
  return (
    <article {...props}>
      <h1 className="mb-4 text-heading-2xl font-bold leading-md">
        {node.title}
      </h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>{t("posted-by", { author: node.uid?.display_name })}</span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            alt={node.field_image.resourceIdObjMeta.alt}
            sizes="100vw"
            className="h-auto max-w-full object-cover"
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        <FormattedText
          className="mt-4 text-md leading-xl text-gray-500 sm:text-lg"
          processed={node.body?.processed}
        />
      )}
    </article>
  );
}

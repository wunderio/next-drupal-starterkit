import Image from "next/image";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";
import { FormattedText } from "components/formatted-text";
import { absoluteUrl, formatDate } from "lib/utils";

interface NodeArticleProps {
  node: DrupalNode;
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  const { t } = useTranslation("common");
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
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
            height={400}
            layout="responsive"
            objectFit="cover"
            alt={node.field_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        <FormattedText
          className="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl lg:text-xl"
          processed={node.body?.processed}
        />
      )}
    </article>
  );
}

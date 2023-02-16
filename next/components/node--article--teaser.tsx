import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { absoluteUrl, formatDate } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow.svg";

interface NodeArticleTeaserProps {
  node: DrupalNode;
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
  const { t } = useTranslation();
  return (
    <article {...props}>
      <Link
        href={node.path.alias}
        passHref
        className="text-wunderpurple-500 no-underline hover:text-wunderpurple-400"
      >
        <h2 className="mb-4 text-heading-xl font-bold">{node.title}</h2>
      </Link>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>{t("posted-by", { author: node.uid?.display_name })}</span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure className="my-4">
          <Image
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            height={480}
            alt={node.field_image.resourceIdObjMeta.alt}
            sizes="100vw"
            className="max-w-full object-cover"
          />
        </figure>
      )}
      <Link
        href={node.path.alias}
        passHref
        className="inline-flex items-center rounded-full border border-wunderpurple-500 px-6 py-2 text-wunderpurple-500 hover:bg-wunderpurple-50"
      >
        {t("read-article")}
        <ArrowIcon className="ml-2 h-4 w-4" />
      </Link>
    </article>
  );
}

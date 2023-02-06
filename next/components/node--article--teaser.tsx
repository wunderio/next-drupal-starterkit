import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";
import { absoluteUrl, formatDate } from "lib/utils";

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
        className="no-underline text-wunderpurple-500 hover:text-wunderpurple-400"
      >
        <h2 className="mb-4 text-4xl font-bold">{node.title}</h2>
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
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </figure>
      )}
      <Link
        href={node.path.alias}
        passHref
        className="inline-flex items-center px-6 py-2 border border-wunderpurple-500 text-wunderpurple-500 rounded-full hover:bg-wunderpurple-50"
      >
        {t("read-article")}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 ml-2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { absoluteUrl, formatDate } from "@/lib/utils";

interface NodeArticleTeaserProps {
  node: DrupalNode;
}

export function NodeArticleTeaser({ node }: NodeArticleTeaserProps) {
  const { t } = useTranslation();
  const author = node.uid?.display_name;
  const date = formatDate(node.created);
  return (
    <div className="relative h-full rounded p-4 transition-all hover:bg-white hover:shadow-md">
      <h3 className="text-heading-sm font-bold line-clamp-2">{node.title}</h3>
      <div className="mb-4 text-md text-gray-700 line-clamp-2">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      {node.field_image && (
        <Image
          src={absoluteUrl(node.field_image.uri.url)}
          width={384}
          height={240}
          alt={node.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )}
      <Link
        href={node.path.alias}
        className="absolute inset-0 cursor-pointer"
      />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { absoluteUrl, formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";

interface ArticleTeaserProps {
  article: ArticleTeaser;
}

export function ArticleTeaser({ article }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const date = formatDate(article.created);
  return (
    <div className="relative h-full rounded border bg-white p-4 transition-all hover:shadow-md">
      <h3 className="mb-2 text-heading-xs font-bold line-clamp-2">
        {article.title}
      </h3>
      <div className="mb-4 text-md text-gray-700 line-clamp-2">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      {article.field_image && (
        <Image
          src={absoluteUrl(article.field_image.uri.url)}
          width={384}
          height={240}
          alt={article.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )}
      <Link
        href={article.path.alias}
        className="absolute inset-0 cursor-pointer"
      />
    </div>
  );
}

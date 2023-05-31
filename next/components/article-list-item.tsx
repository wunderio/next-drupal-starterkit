import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl, formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";

interface ArticleListItemProps {
  article: ArticleTeaser;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);
  return (
    <Link
      href={article.path.alias}
      className="relative mb-4 grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {article.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {article.field_image && (
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={500}
            height={300}
            className="w-full sm:w-40"
            alt={article.field_image.resourceIdObjMeta.alt}
          />
        )}
        <p>{article.field_excerpt}</p>
      </div>
    </Link>
  );
}

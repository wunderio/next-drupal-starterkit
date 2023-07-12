import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";

interface ArticleTeaserProps {
  article: ArticleTeaser;
}

export function ArticleTeaser({ article }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);
  return (
    <Link
      href={article.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {article.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
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
    </Link>
  );
}

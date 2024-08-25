import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { cn, formatDateTimestamp } from "@/lib/utils";

interface ArticleListItemProps {
  article: FragmentArticleTeaserFragment;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const t = useTranslations();
  const locale = useLocale();
  const author = article.author?.name;
  const date = formatDateTimestamp(article.created.timestamp, locale);

  return (
    <Link
      href={article.path}
      className={cn(
        "relative mb-4 grid h-full rounded border p-4 transition-all hover:shadow-md",
        article.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-white",
      )}
    >
      <h3 className="mb-2 font-bold line-clamp-2 text-heading-xs">
        {article.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {article.image && (
          <Image
            src={article.image.url}
            width={500}
            height={300}
            className="w-full sm:w-40"
            alt={article.image.alt}
          />
        )}
        <p>{article.excerpt}</p>
      </div>
    </Link>
  );
}

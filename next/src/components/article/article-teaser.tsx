import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { formatDateTimestamp } from "@/lib/utils";
interface ArticleTeaserProps {
  article: FragmentArticleTeaserFragment;
}

export function ArticleTeaser({ article }: ArticleTeaserProps) {
  const t = useTranslations();
  const locale = useLocale();
  const date = formatDateTimestamp(article.created.timestamp, locale);
  const author = article.author?.name;

  return (
    <Link
      href={article.path}
      className="relative grid h-full p-4 transition-all border rounded border-border hover:shadow-md"
    >
      <h3 className="mb-2 font-bold text-md line-clamp-2">{article.title}</h3>
      <div className="mb-4 line-clamp-2 text-md">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      {article.image && (
        <Image
          src={article.image.url}
          width={384}
          height={240}
          alt={article.image.alt}
          className="object-cover max-w-full"
          priority
        />
      )}
    </Link>
  );
}

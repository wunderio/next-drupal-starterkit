import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { formatDateTimestamp } from "@/lib/utils";
interface ArticleTeaserProps {
  article: FragmentArticleTeaserFragment;
}

export function ArticleTeaser({ article }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.author?.name;
  const router = useRouter();
  const date = formatDateTimestamp(article.created.timestamp, router.locale);
  return (
    <Link
      href={article.path}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {article.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      {article.image && (
        <Image
          src={article.image.url}
          width={384}
          height={240}
          alt={article.image.alt}
          className="max-w-full object-cover"
        />
      )}
    </Link>
  );
}

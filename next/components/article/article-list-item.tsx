import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { formatDateTimestamp } from "@/lib/utils";

interface ArticleListItemProps {
  article: FragmentArticleTeaserFragment;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const { t } = useTranslation();
  const author = article.author?.name;
  const router = useRouter();
  const date = formatDateTimestamp(article.created.timestamp, router.locale);
  return (
    <Link
      href={article.path}
      className={classNames(
        "relative mb-4 grid h-full rounded border  p-4 transition-all hover:shadow-md",
        article.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-white",
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
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

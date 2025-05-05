import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Link href={article.path}>
      <Card className="flex h-full flex-col justify-between hover:shadow-md">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>
            {author && <>{t("posted-by", { author })} - </>}
            {date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {article.image && (
            <Image
              src={article.image.url}
              width={384}
              height={240}
              alt={article.image.alt}
              className="aspect-video h-auto w-full object-cover"
              priority
            />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

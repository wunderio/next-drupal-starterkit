import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { Heading } from "@/components/heading";
import { HeadingLevel } from "@/components/heading-level/heading-level";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { Article } from "@/lib/zod/article";

interface ArticleProps {
  article: Article;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <HeadingLevel.Boundary>
      <article {...props}>
        <Heading>{article.title}</Heading>
        {article.field_excerpt && (
          <p className="my-4 text-xl">{article.field_excerpt}</p>
        )}
        <div className="mb-4 text-scapaflow">
          {article.uid?.display_name && (
            <span>
              {t("posted-by", { author: article.uid?.display_name })} -{" "}
            </span>
          )}
          <span>{formatDate(article.created, router.locale)}</span>
        </div>
        {article.field_image && (
          <figure>
            <Image
              src={absoluteUrl(article.field_image.uri.url)}
              width={768}
              height={480}
              style={{ width: 768, height: 480 }}
              alt={article.field_image.resourceIdObjMeta.alt}
              className="object-cover"
              priority
            />
            {article.field_image.resourceIdObjMeta.title && (
              <figcaption className="py-2 text-center text-sm text-scapaflow">
                {article.field_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        )}
        {article.body?.processed && (
          <FormattedText
            className="mt-4 text-md/xl text-scapaflow sm:text-lg"
            html={article.body?.processed}
          />
        )}
      </article>
    </HeadingLevel.Boundary>
  );
}

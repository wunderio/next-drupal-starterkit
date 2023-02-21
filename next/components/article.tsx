import Image from "next/image";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { Article } from "@/lib/zod/article";

interface ArticleProps {
  article: Article;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  return (
    <article {...props}>
      <HeadingPage>{article.title}</HeadingPage>
      <div className="mb-4 text-gray-600">
        {article.uid?.display_name && (
          <span>
            {t("posted-by", { author: article.uid?.display_name })} -{" "}
          </span>
        )}
        <span>{formatDate(article.created)}</span>
      </div>
      {article.field_image && (
        <figure>
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={768}
            height={480}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="max-w-full object-cover"
            priority
          />
          {article.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-gray-600">
              {article.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {article.body?.processed && (
        <FormattedText
          className="mt-4 text-md leading-xl text-gray-500 sm:text-lg"
          html={article.body?.processed}
        />
      )}
    </article>
  );
}

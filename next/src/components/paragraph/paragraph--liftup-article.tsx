import { ArticleTeasers } from "@/components/article/article-teasers";
import type { FragmentParagraphLiftupArticleFragment } from "@/lib/gql/graphql";

export function ParagraphLiftupArticle({
  paragraph,
}: {
  paragraph: FragmentParagraphLiftupArticleFragment;
}) {
  return (
    <section data-paragraph={paragraph.__typename}>
      <ArticleTeasers
        articles={paragraph.articles}
        heading={paragraph.heading}
      />
    </section>
  );
}

import { Media } from "@/components/media";
import type { FragmentParagraphImageFragment } from "@/lib/gql/graphql";

export function ParagraphImage({
  paragraph,
}: {
  paragraph: FragmentParagraphImageFragment;
}) {
  return (
    <section data-paragraph={paragraph.__typename}>
      <Media media={paragraph.image} />
    </section>
  );
}

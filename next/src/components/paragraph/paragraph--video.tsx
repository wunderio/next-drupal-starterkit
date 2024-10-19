import { Media } from "@/components/media";
import type { FragmentParagraphVideoFragment } from "@/lib/gql/graphql";

export function ParagraphVideo({
  paragraph,
}: {
  paragraph: FragmentParagraphVideoFragment;
}) {
  return (
    <section data-paragraph={paragraph.__typename}>
      <Media media={paragraph.video} />
    </section>
  );
}

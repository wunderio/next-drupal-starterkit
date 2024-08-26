import { Media } from "@/components/media";
import type { FragmentParagraphImageFragment } from "@/lib/gql/graphql";

export function ParagraphImage({
  paragraph,
}: {
  paragraph: FragmentParagraphImageFragment;
}) {
  return <Media media={paragraph.image} />;
}

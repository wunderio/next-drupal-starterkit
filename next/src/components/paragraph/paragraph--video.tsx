import { Media } from "@/components/media";
import type { FragmentParagraphVideoFragment } from "@/lib/gql/graphql";

export function ParagraphVideo({
  paragraph,
}: {
  paragraph: FragmentParagraphVideoFragment;
}) {
  return <Media media={paragraph.video} />;
}

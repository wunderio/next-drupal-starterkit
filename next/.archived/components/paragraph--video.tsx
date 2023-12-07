import { Video } from "@/lib/zod/paragraph";

import { Media } from "@/archived-components/media";

export function ParagraphVideo({ paragraph }: { paragraph: Video }) {
  return <Media media={paragraph.field_video} />;
}

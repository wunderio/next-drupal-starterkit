import { Image } from "@/lib/zod/paragraph";

import { Media } from "@/archived-components/media";

export function ParagraphImage({ paragraph }: { paragraph: Image }) {
  return <Media media={paragraph.field_image} priority={true} />;
}

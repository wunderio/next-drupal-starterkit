import { Media } from "@/components/media";
import { Image } from "@/lib/zod/paragraph";

export function ParagraphImage({ paragraph }: { paragraph: Image }) {
  return <Media media={paragraph.field_image} priority={true} />;
}

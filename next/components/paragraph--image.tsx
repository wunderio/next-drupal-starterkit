import { MediaImage } from "@/components/media--image";
import { Image } from "@/lib/zod/paragraph";

export function ParagraphImage({ paragraph }: { paragraph: Image }) {
  return (
    <div className="mb-7">
      <MediaImage media={paragraph.field_image} priority />
    </div>
  );
}

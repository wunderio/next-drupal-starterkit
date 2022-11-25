import { MediaImage } from "components/media--image";
import { ParagraphProps } from "components/paragraph";

export function ParagraphImage({ paragraph }: ParagraphProps) {
  return (
    <div className="mb-7">
      <MediaImage media={paragraph.field_image} objectFit="cover" priority />
    </div>
  );
}

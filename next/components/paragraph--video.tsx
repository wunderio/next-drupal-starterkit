import { MediaVideo } from "@/components/media--video";
import { ParagraphProps } from "@/components/paragraph";

export function ParagraphVideo({ paragraph }: ParagraphProps) {
  return <MediaVideo media={paragraph.field_video} />;
}

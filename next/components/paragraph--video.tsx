import { MediaVideo } from "@/components/media--video";
import { Video } from "@/lib/zod/paragraph";

export function ParagraphVideo({ paragraph }: { paragraph: Video }) {
  return <MediaVideo media={paragraph.field_video} />;
}

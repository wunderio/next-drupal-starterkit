import { ParagraphProps } from "components/paragraph";

import { MediaVideo } from "./media--video";

export function ParagraphVideo({ paragraph }: ParagraphProps) {
  return <MediaVideo media={paragraph.field_video} />;
}

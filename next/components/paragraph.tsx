import { ParagraphImage } from "@/components/paragraph--image";
import { ParagraphLinks } from "@/components/paragraph--links";
import { ParagraphText } from "@/components/paragraph--text";
import { ParagraphVideo } from "@/components/paragraph--video";
import { Paragraph } from "@/lib/zod/paragraph";

import { ParagraphAccordion } from "./paragraph--accordion";

export function Paragraph({ paragraph, ...props }: { paragraph: Paragraph }) {
  if (!paragraph) {
    return null;
  }

  switch (paragraph.type) {
    case "paragraph--formatted_text":
      return <ParagraphText paragraph={paragraph} {...props} />;
    case "paragraph--image":
      return <ParagraphImage paragraph={paragraph} {...props} />;
    case "paragraph--video":
      return <ParagraphVideo paragraph={paragraph} {...props} />;
    case "paragraph--links":
      return <ParagraphLinks paragraph={paragraph} {...props} />;
    case "paragraph--accordion":
      return <ParagraphAccordion paragraph={paragraph} {...props} />;
    default:
      return null;
  }
}

import { DrupalParagraph } from "next-drupal";

import { ParagraphImage } from "@/components/paragraph--image";
import { ParagraphLinks } from "@/components/paragraph--links";
import { ParagraphText } from "@/components/paragraph--text";
import { ParagraphVideo } from "@/components/paragraph--video";

const paragraphTypes = {
  "paragraph--formatted_text": ParagraphText,
  "paragraph--image": ParagraphImage,
  "paragraph--video": ParagraphVideo,
  "paragraph--links": ParagraphLinks,
};

export interface ParagraphProps {
  paragraph: DrupalParagraph;
}

export function Paragraph({ paragraph, ...props }: ParagraphProps) {
  if (!paragraph) {
    return null;
  }

  const Component = paragraphTypes[paragraph.type];

  if (!Component) {
    return null;
  }

  return <Component paragraph={paragraph} {...props} />;
}

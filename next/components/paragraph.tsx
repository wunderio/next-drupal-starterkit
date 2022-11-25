import { DrupalParagraph } from "next-drupal";
import { ParagraphText } from "components/paragraph--text";

const paragraphTypes = {
  "paragraph--formatted_text": ParagraphText,
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

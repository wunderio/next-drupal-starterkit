import dynamic from "next/dynamic";

import { ParagraphFileAttachments } from "@/components/paragraph/paragraph--file-attachments";
import { ParagraphHero } from "@/components/paragraph/paragraph--hero";
import { ParagraphImage } from "@/components/paragraph/paragraph--image";
import { ParagraphLiftupArticle } from "@/components/paragraph/paragraph--liftup-article";
import { ParagraphLinks } from "@/components/paragraph/paragraph--links";
import { ParagraphListingArticles } from "@/components/paragraph/paragraph--listing-articles";
import { ParagraphText } from "@/components/paragraph/paragraph--text";
import type { FragmentParagraphUnionFragment } from "@/lib/gql/graphql";

// Use dynamic imports to defer loading a component until after initial page load: https://nextjs.org/docs/advanced-features/dynamic-import
const ParagraphVideo = dynamic(() =>
  import("./paragraph--video").then((mod) => mod.ParagraphVideo),
);

const ParagraphAccordion = dynamic(() =>
  import("./paragraph--accordion").then((mod) => mod.ParagraphAccordion),
);

export function Paragraph({
  paragraph,
}: {
  paragraph: FragmentParagraphUnionFragment;
}) {
  if (!paragraph) {
    return null;
  }
  switch (paragraph.__typename) {
    case "ParagraphFormattedText": {
      return <ParagraphText paragraph={paragraph} />;
    }
    case "ParagraphLink": {
      return <ParagraphLinks paragraph={paragraph} />;
    }
    case "ParagraphFileAttachment": {
      return <ParagraphFileAttachments paragraph={paragraph} />;
    }
    case "ParagraphImage": {
      return <ParagraphImage paragraph={paragraph} />;
    }
    case "ParagraphAccordion": {
      return <ParagraphAccordion paragraph={paragraph} />;
    }
    case "ParagraphVideo": {
      return <ParagraphVideo paragraph={paragraph} />;
    }
    case "ParagraphHero": {
      return <ParagraphHero paragraph={paragraph} />;
    }
    case "ParagraphListingArticle": {
      return <ParagraphListingArticles paragraph={paragraph} />;
    }
    case "ParagraphLiftupsArticle": {
      return <ParagraphLiftupArticle paragraph={paragraph} />;
    }
    default: {
      console.log(
        `components/paragraph/index.tsx: GraphQL paragraph not yet implemented: ${paragraph.__typename}`,
      );
      return null;
    }
  }
}

import { useRouter } from "next/router";

import { FormattedText } from "@/components/formatted-text";
import { ParagraphProps } from "@/components/paragraph";

export function ParagraphText({ paragraph }: ParagraphProps) {
  const router = useRouter();
  const isFrontPage = router.pathname === "/";
  const Heading = isFrontPage ? "h1" : "h2";
  return (
    <>
      {paragraph.field_heading && (
        <Heading className="text-left text-heading-md font-bold md:text-heading-lg">
          {paragraph.field_heading}
        </Heading>
      )}
      <FormattedText
        className="my-8 text-justify text-md leading-xl text-gray-500 sm:text-lg"
        html={paragraph.field_formatted_text.processed}
      />
    </>
  );
}

import { useRouter } from "next/router";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

export function ParagraphText({ paragraph }: { paragraph: FormattedTextType }) {
  const router = useRouter();
  const isFrontPage = router.pathname === "/";
  const Heading = isFrontPage ? HeadingPage : HeadingParagraph;
  return (
    <>
      {paragraph.field_heading && <Heading>{paragraph.field_heading}</Heading>}
      <FormattedText
        className="my-8 text-justify text-md leading-xl text-gray-500 sm:text-lg"
        html={paragraph.field_formatted_text.processed}
      />
    </>
  );
}

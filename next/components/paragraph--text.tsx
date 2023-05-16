// import { useRouter } from "next/router";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
// import { HeadingPage } from "@/components/heading--page";
// import { HeadingParagraph } from "@/components/heading--paragraph";
import Heading from "@/components/heading-level/heading";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

export function ParagraphText({ paragraph }: { paragraph: FormattedTextType }) {
  // const router = useRouter();
  // const isFrontPage = router.pathname === "/";
  // const Heading = isFrontPage ? HeadingPage : HeadingParagraph;
  return (
    <>
      {paragraph.field_heading && (
        <Heading.H>{paragraph.field_heading}</Heading.H>
      )}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "text-left text-md/xl text-scapaflow sm:text-lg",
          paragraph.field_heading && "mt-4"
        )}
      />
    </>
  );
}

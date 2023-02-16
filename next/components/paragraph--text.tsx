import { useRouter } from "next/router";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { ParagraphProps } from "@/components/paragraph";

export function ParagraphText({ paragraph }: ParagraphProps) {
  const router = useRouter();
  const isFrontPage = router.pathname === "/";
  const Heading = isFrontPage ? "h1" : "h2";
  return (
    <div>
      {paragraph.field_heading && (
        <Heading
          className={clsx(
            "text-left font-bold",
            isFrontPage
              ? "text-heading-md md:text-heading-lg"
              : "text-heading-lg md:text-heading-xl"
          )}
        >
          {paragraph.field_heading}
        </Heading>
      )}
      <FormattedText
        className="mt-4 text-justify text-md leading-xl text-gray-500 sm:text-lg"
        processed={paragraph.field_formatted_text.processed}
      />
    </div>
  );
}

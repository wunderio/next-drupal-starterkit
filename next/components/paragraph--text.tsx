import { FormattedText } from "@/components/formatted-text";
import { ParagraphProps } from "@/components/paragraph";

export function ParagraphText({ paragraph }: ParagraphProps) {
  return (
    <div className="mb-7 flex flex-col items-center text-center md:items-start md:text-left">
      {paragraph.field_heading && (
        <h2 className="text-heading-lg font-bold md:text-2xl">
          {paragraph.field_heading}
        </h2>
      )}
      <FormattedText
        className="mt-4 text-md leading-xl text-gray-500 sm:text-lg"
        processed={paragraph.field_formatted_text.processed}
      />
    </div>
  );
}

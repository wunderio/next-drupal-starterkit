import { FormattedText } from "@/components/formatted-text";
import { ParagraphProps } from "@/components/paragraph";

export function ParagraphText({ paragraph }: ParagraphProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left mb-7">
      {paragraph.field_heading && (
        <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
          {paragraph.field_heading}
        </h2>
      )}
      <FormattedText
        className="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl lg:text-xl"
        processed={paragraph.field_formatted_text.processed}
      />
    </div>
  );
}

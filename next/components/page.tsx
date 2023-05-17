import { HeadingLevel } from "@/components/heading-level/heading-level";
import { Paragraph } from "@/components/paragraph";
import type { Page } from "@/lib/zod/page";
interface PageProps {
  page: Page;
}

export function Page({ page }: PageProps) {
  return (
    <div className="grid gap-4">
      {page.field_content_elements?.map((paragraph, key: number) => (
        <HeadingLevel.Boundary
          levelOverride={key === 0 ? "1" : "2"}
          key={paragraph.id}
        >
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        </HeadingLevel.Boundary>
      ))}
    </div>
  );
}

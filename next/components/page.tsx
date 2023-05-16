import Heading from "@/components/heading-level/heading";
import { Paragraph } from "@/components/paragraph";
import type { Page } from "@/lib/zod/page";
interface PageProps {
  page: Page;
}

export function Page({ page }: PageProps) {
  return (
    <div className="grid gap-4">
      {page.field_content_elements?.map((paragraph, key) => (
        <Heading.Boundary key={paragraph.id}>
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        </Heading.Boundary>
      ))}
    </div>
  );
}

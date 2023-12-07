import type { Page } from "@/lib/zod/page";

import { Paragraph } from "@/archived-components/paragraph";

interface PageProps {
  page: Page;
}

export function Page({ page }: PageProps) {
  return (
    <div className="grid gap-4">
      {page.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}

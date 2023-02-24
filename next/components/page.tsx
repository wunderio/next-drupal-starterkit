import { Paragraph } from "@/components/paragraph";
import type { Page } from "@/lib/zod/page";

interface PageProps {
  page: Page;
}

export function Page({ page }: PageProps) {
  return (
    <>
      {page.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </>
  );
}

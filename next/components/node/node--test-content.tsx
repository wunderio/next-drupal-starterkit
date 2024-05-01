import { FormattedText } from "@/components/formatted-text";
import type { TestContentType } from "@/types/graphql";

export function NodeTestContent({
  testContent,
}: {
  testContent: TestContentType;
}) {
  return (
    <div className="grid gap-4">
      <h2>{testContent.title}</h2>
      <FormattedText html={testContent.body?.processed} />
      {testContent.testfield}
    </div>
  );
}

import { ResultViewProps } from "@elastic/react-search-ui-views";

import { Heading } from "@/components/heading";
import HeadingLevel from "@/components/heading-level/heading-level";

import { Badge } from "@/wunder-component-library/badge";

export function SearchResult({ result }: ResultViewProps) {
  return (
    <HeadingLevel.Boundary levelOverride={2}>
      <a
        key={result.id.raw}
        href={result.path.raw}
        className="my-4 block rounded bg-white p-8"
      >
        <Heading className="mb-4 text-xl font-bold text-primary-800">
          {result.title.raw}
        </Heading>
        <p className="mb-6 text-md text-scapaflow">{result.excerpt.raw}</p>
        <Badge variant="info" size="sm">
          {result.content_type.raw}
        </Badge>
      </a>
    </HeadingLevel.Boundary>
  );
}

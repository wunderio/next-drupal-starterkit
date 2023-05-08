import { ResultViewProps } from "@elastic/react-search-ui-views";

import { Badge } from "@/wunder-component-library/badge";

export function SearchResult({ result, onClickLink }: ResultViewProps) {
  return (
    <a
      onClick={onClickLink}
      rel="noopener noreferrer"
      key={result.id.raw}
      href={result.path.raw}
      target="_blank"
      className="my-4 block rounded bg-white p-8"
    >
      <h5 className="mb-4 text-xl font-bold text-primary-800">
        {result.title.raw}
      </h5>
      <p className="mb-6 text-md text-scapaflow">{result.excerpt.raw}</p>
      <Badge variant="info" size="sm">
        {result.content_type.raw}
      </Badge>
    </a>
  );
}

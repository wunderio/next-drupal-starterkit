import { ResultViewProps } from "@elastic/react-search-ui-views";

export function SearchResult({ result, onClickLink }: ResultViewProps) {
  return (
    <a
      onClick={onClickLink}
      rel="noopener noreferrer"
      key={result.id.raw}
      href={result.path.raw}
      target="_blank"
      className="my-2 block rounded-md border border-wunderpurple-50 bg-white p-4"
    >
      <h5 className="mb-1 text-heading-sm font-bold tracking-tight text-wunderpurple-500">
        {result.title.raw}
      </h5>
      <p className="mb-2 text-gray-700">{result.excerpt.raw}</p>
      <span className="mr-2 rounded bg-wunderpurple-100 px-2.5 py-0.5 text-sm uppercase text-wunderpurple-800">
        {result.content_type.raw}
      </span>
    </a>
  );
}

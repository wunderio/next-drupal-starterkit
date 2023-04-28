import { ResultViewProps } from "@elastic/react-search-ui-views";

export function SearchResult({ result, onClickLink }: ResultViewProps) {
  return (
    <a
      onClick={onClickLink}
      rel="noopener noreferrer"
      key={result.id.raw}
      href={result.path.raw}
      target="_blank"
      className="my-2 block rounded-md border border-primary-100 bg-white p-4"
    >
      <h5 className="mb-1 text-heading-sm font-bold tracking-tight text-primary-500">
        {result.title.raw}
      </h5>
      <p className="mb-2 text-scapaflow">{result.excerpt.raw}</p>
      <span className="mr-2 rounded bg-primary-100 px-2.5 py-0.5 text-sm uppercase text-primary-800">
        {result.content_type.raw}
      </span>
    </a>
  );
}

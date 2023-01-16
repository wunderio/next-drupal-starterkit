import React from "react";
import { ResultViewProps } from "@elastic/react-search-ui-views";

export function SearchResult({ result, onClickLink }: ResultViewProps) {
  return (
    <a
      onClick={onClickLink}
      rel="noopener noreferrer"
      key={result.id.raw}
      href={result.path.raw}
      target="_blank"
      className="block p-4 my-2 border border-wunderpurple-50 rounded-md"
    >
      <h5 className="mb-1 text-xl font-bold tracking-tight text-wunderpurple-500">
        {result.title.raw}
      </h5>
      <p className="font-normal text-gray-700 mb-2">{result.body.raw}</p>
      <span className="uppercase bg-wunderpurple-100 text-wunderpurple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
        {result.content_type.raw}
      </span>
    </a>
  );
}

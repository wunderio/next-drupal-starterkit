import { buildStateFacets } from "./buildStateFacets";

function buildTotalPages(resultsPerPage, totalResults) {
  if (!resultsPerPage) return 0;
  if (totalResults === 0) return 1;
  return Math.ceil(totalResults / resultsPerPage);
}

function buildTotalResults(hits) {
  return hits.total.value;
}

function getHighlight(hit, fieldName) {
  if (
    !hit.highlight ||
    !hit.highlight[fieldName] ||
    hit.highlight[fieldName].length < 1
  ) {
    return;
  }

  return hit.highlight[fieldName][0];
}

/**
 * Build the state results from hits.
 *
 * @param {*} hits
 */
function buildResults(hits) {
  const addEachKeyValueToObject = (acc, [key, value]) => ({
    ...acc,
    [key]: value,
  });

  const toObject = (value, snippet) => {
    return { raw: value, ...(snippet && { snippet }) };
  };

  return hits.map((record) => {
    return Object.entries(record._source)
      .map(([fieldName, fieldValue]) => [
        fieldName,
        toObject(fieldValue, getHighlight(record, fieldName)),
      ])
      .reduce(addEachKeyValueToObject, {});
  });
}

const getPagingStart = (state) => (state.current - 1) * state.resultsPerPage;

const getPagingEnd = (state, totalResults) => {
  const pagingEnd = state.current * state.resultsPerPage;
  return pagingEnd < totalResults ? pagingEnd : totalResults;
};

/*
  Converts an Elasticsearch response to new application state

  When implementing an onSearch Handler in Search UI, the handler needs to convert
  search results into a new application state that Search UI understands.

  For instance, Elasticsearch returns "hits" for search results. This maps to
  the "results" property in application state, which requires a specific format. So this
  file iterates through "hits" and reformats them to "results" that Search UI
  understands.

  We do similar things for facets and totals.
*/
export function buildState(response, resultsPerPage, state) {
  const results = buildResults(response.hits.hits);
  const totalResults = buildTotalResults(response.hits);
  const totalPages = buildTotalPages(resultsPerPage, totalResults);
  const facets = buildStateFacets(response.aggregations);
  const requestId = "";
  const resultSearchTerm = state?.searchTerm || "";
  const pagingStart = getPagingStart(state);
  const pagingEnd = getPagingEnd(state, totalResults);
  return {
    results,
    totalPages,
    totalResults,
    requestId,
    resultSearchTerm,
    ...(facets && { facets }),
    rawResponse: null,
    wasSearched: true,
    pagingStart,
    pagingEnd,
  };
}

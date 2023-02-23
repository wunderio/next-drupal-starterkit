import { buildRequestFilter } from "./buildRequestFilter";

function buildFrom(current, resultsPerPage) {
  if (!current || !resultsPerPage) return;
  return (current - 1) * resultsPerPage;
}

function buildSort(sortDirection, sortField) {
  if (sortDirection && sortField) {
    return [{ [`${sortField}.keyword`]: sortDirection }];
  }
}

function buildMatch(searchTerm) {
  const multi_match_query = [
    // Match title:
    {
      match: {
        title: {
          query: searchTerm,
          operator: "and",
          boost: 5,
        },
      },
    },
    // Match body field:
    {
      match: {
        body: {
          query: searchTerm,
          operator: "and",
          boost: 3,
        },
      },
    },
    // Match phrase for trigram fields:
    {
      match_phrase: { "title.trigram": { query: searchTerm } },
    },
    {
      match_phrase: { "body.trigram": { query: searchTerm } },
    },
    // Term query for the tags field:
    { term: { tags: searchTerm } },
  ];

  // Build the dis max query.
  const dis_max_query = {
    dis_max: {
      queries: multi_match_query,
      tie_breaker: 0.7,
    },
  };

  return searchTerm ? dis_max_query : { match_all: { boost: 1.0 } };
}

/*

  Converts current application state to an Elasticsearch request.

  When implementing an onSearch Handler in Search UI, the handler needs to take the
  current state of the application and convert it to an API request.

  For instance, there is a "current" property in the application state that you receive
  in this handler. The "current" property represents the current page in pagination. This
  method converts our "current" property to Elasticsearch's "from" parameter.

  This "current" property is a "page" offset, while Elasticsearch's "from" parameter
  is a "item" offset. In other words, for a set of 100 results and a page size
  of 10, if our "current" value is "4", then the equivalent Elasticsearch "from" value
  would be "40". This method does that conversion.

  We then do similar things for searchTerm, filters, sort, etc.
*/
export function buildRequest(state) {
  const {
    current,
    filters,
    resultsPerPage,
    searchTerm,
    sortDirection,
    sortField,
  } = state;

  const sort = buildSort(sortDirection, sortField);
  const match = buildMatch(searchTerm);
  const size = resultsPerPage;
  const from = buildFrom(current, resultsPerPage);
  const filter = buildRequestFilter(filters);

  const body = {
    // Static query Configuration
    // --------------------------

    // Define any Highlights here.
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-highlighting.html
    // highlight: {},

    // Define any source filtering here:
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-source-filtering.html#search-request-source-filtering
    _source: ["id", "link", "title", "excerpt", "path", "user", "content_type"],

    // Define aggregations here:
    aggs: {
      tags: { terms: { field: "tags" } },
      content_type: { terms: { field: "content_type" } },
    },

    // Dynamic values based on current Search UI state
    // --------------------------
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/full-text-queries.html
    query: {
      bool: {
        must: [match],
        ...(filter && { filter }),
      },
    },
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-sort.html
    ...(sort && { sort }),
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-from-size.html
    ...(size && { size }),
    ...(from && { from }),
  };

  return body;
}

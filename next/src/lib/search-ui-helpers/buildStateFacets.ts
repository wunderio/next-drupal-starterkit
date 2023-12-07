/**
 * Get and build the state facets.
 *
 * @param {*} aggregations
 * @param {*} fieldName
 */
function getValueFacet(aggregations, fieldName) {
  if (
    aggregations &&
    aggregations[fieldName] &&
    aggregations[fieldName].buckets &&
    aggregations[fieldName].buckets.length > 0
  ) {
    return [
      {
        field: fieldName,
        type: "value",
        data: aggregations[fieldName].buckets.map((bucket) => ({
          // Boolean values and date values require using `key_as_string`
          value: bucket.key_as_string || bucket.key,
          count: bucket.doc_count,
        })),
      },
    ];
  }
}

/**
 * Build the state facets according to the aggregation from query response.
 *
 * @param {*} aggregations
 */
export function buildStateFacets(aggregations) {
  // Get the facets from the tags field value.
  const tags = getValueFacet(aggregations, "tags");

  // Get the facets from the category field value.
  const content_type = getValueFacet(aggregations, "content_type");

  const facets = {
    ...(tags && { tags }),
    ...(content_type && { content_type }),
  };

  if (Object.keys(facets).length > 0) {
    return facets;
  }
}

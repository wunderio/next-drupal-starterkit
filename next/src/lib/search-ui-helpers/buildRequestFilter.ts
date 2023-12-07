function getTermFilterValue(field, fieldValue) {
  // We do this because if the value is a boolean value, we need to apply
  // our filter differently. We're also only storing the string representation
  // of the boolean value, so we need to convert it to a Boolean.

  // TODO We need better approach for boolean values
  if (fieldValue === "false" || fieldValue === "true") {
    return { [field]: fieldValue === "true" };
  }

  return { [`${field}`]: fieldValue };
}

function getTermFilter(filter) {
  if (filter.type === "any") {
    return {
      bool: {
        should: filter.values.map((filterValue) => ({
          term: getTermFilterValue(filter.field, filterValue),
        })),
        minimum_should_match: 1,
      },
    };
  } else if (filter.type === "all") {
    return {
      bool: {
        filter: filter.values.map((filterValue) => ({
          term: getTermFilterValue(filter.field, filterValue),
        })),
      },
    };
  }
}

export function buildRequestFilter(filters) {
  if (!filters) return;

  filters = filters.reduce((acc, filter) => {
    if (["tags", "content_type"].includes(filter.field)) {
      return [...acc, getTermFilter(filter)];
    }
    return acc;
  }, []);

  if (filters.length < 1) return;
  return filters;
}

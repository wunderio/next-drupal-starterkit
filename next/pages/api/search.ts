/**
 * Example backend proxy for Elasticsearch Search-UI frontend client.
 */
const Search = async (req, res) => {
  const ProxyUrl =
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/wunder_search/proxy";

  const response = await fetch(ProxyUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.statusCode = response.status;
  res.send(response.body);
};

export default Search;

/**
 * Pass the built search request to the backend proxy endpoint.
 *
 * @param {*} body
 *   The elasticsearch search request body.
 */
export default async function runRequest(body, locale) {
  // Create the request to our api route, passing the language in a header:
  const response = await fetch("/api/search", {
    method: "POST",
    headers: { "content-type": "application/json", "Accept-Language": locale },
    body: JSON.stringify(body),
  });
  return response.json();
}

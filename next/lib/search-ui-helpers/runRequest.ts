/**
 * Pass the built search request to the backend proxy endpoint.
 *
 * @param {*} body
 *   The elasticsearch search request body.
 */
export default async function runRequest(body) {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

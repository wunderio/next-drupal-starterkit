import { NextApiRequest, NextApiResponse } from "next";

export default function exit(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Get the callback URL from the query parameters
  const { callbackUrl } = request.query;
  response.clearPreviewData();
  // Redirect to the callback URL or the homepage if the callback URL is not provided
  response.redirect(307, (callbackUrl as string) ?? "/");
}

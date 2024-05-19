import { NextApiRequest, NextApiResponse } from "next";

import { drupalClientPreviewer } from "@/lib/drupal/drupal-client";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  return await drupalClientPreviewer.preview(request, response);
}

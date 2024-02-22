import { NextApiRequest, NextApiResponse } from "next";

import { env } from "@/env";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const slug = request.query.slug as string;
  const secret = request.query.secret as string;

  // Validate secret.
  if (secret !== env.DRUPAL_REVALIDATE_SECRET) {
    return response.status(401).json({ message: "Invalid secret." });
  }

  // Validate slug.
  if (!slug) {
    return response.status(400).json({ message: "Invalid slug." });
  }

  try {
    await response.revalidate(slug);
    return response.json({ revalidated: true });
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
}

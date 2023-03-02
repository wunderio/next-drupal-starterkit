import { NextApiRequest, NextApiResponse } from "next";
import { drupal } from "lib/drupal";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === "POST") {
      const url = drupal.buildUrl("/webform_rest/submit");
      const body = JSON.parse(request.body);

      // Submit to Drupal.
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          webform_id: "contact",
          name: body.name,
          email: body.email,
          message: body.message,
          subject: body.subject,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        throw new Error();
      }
      response.status(200).end();
    }
  } catch (error) {
    return response.status(400).json(error.message);
  }
}

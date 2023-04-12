import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { drupal } from "lib/drupal";

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  // Because we want to allow only registered users to submit
  // to the contact webform, we will get the jwt token here:
  const token = await getToken({ req });

  // If the token is not available, it means that the user
  // is not registered, so return access denied:
  if (!token) {
    response.status(401).end();
  }

  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl("/webform_rest/submit");
      const body = JSON.parse(req.body);

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
          // Pass the token to authenticate the request:
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      if (result.ok) {
        response.status(200).end();
      } else {
        response.status(result.status).end();
        throw new Error();
      }
    }
  } catch (error) {
    return response.status(400).json(error.message);
  }
}

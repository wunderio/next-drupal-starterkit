import { env } from "@/env";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Checking that Drupal is up:
    const drupalResponse = await fetch(
      `${env.DRUPAL_BASE_URL_INTERNAL}/_ping.php`,
    );

    const drupalStatus = drupalResponse.status;
    const isDrupalHealthy = drupalStatus === 200;

    if (!isDrupalHealthy) {
      return Response.json(
        { message: "Service Unavailable" },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        },
      );
    }

    return Response.json(
      { message: "Service up and running" },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Service Unavailable" },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}

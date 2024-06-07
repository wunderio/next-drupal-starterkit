/**
 * Gets an access token from Drupal and saves it the temporary directory,
 * so it can be used by graphql-codegen to authenticate to the Drupal GraphQL API.
 */
void (async function getAndSaveAccessToken() {
  try {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const { loadEnvConfig } = require("@next/env");
    const fs = require("fs");
    const path = require("path");
    const os = require("os");
    /* eslint-enable @typescript-eslint/no-var-requires */

    loadEnvConfig(process.cwd());

    /* eslint-disable n/no-process-env */
    const oauthUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`;
    const credentials = Buffer.from(
      `${process.env.DRUPAL_CLIENT_ID}:${process.env.DRUPAL_CLIENT_SECRET}`,
    ).toString("base64");
    /* eslint-enable n/no-process-env */

    const response = await fetch(oauthUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials`,
    });

    if (!response.ok) {
      throw new Error(response?.statusText || "Error getting access token.");
    }

    const result = await response.json();

    const tokenFilePath = path.resolve(os.tmpdir(), ".drupal-access-token.txt");

    fs.writeFileSync(tokenFilePath, result.access_token);

    console.log(`Access token saved to ${tokenFilePath}`);
  } catch (error) {
    console.log("Error getting or saving access token:", error);
  }
})();

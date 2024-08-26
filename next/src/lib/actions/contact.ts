"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { ContactFormInputs } from "@/components/forms/contact-form";

import { drupalClientViewer } from "../drupal/drupal-client";

import { auth } from "@/auth";

export async function createContactSubmissionAction(values: ContactFormInputs) {
  // Because we want to allow only registered users to submit
  // to the contact webform, let's get the session:
  const session = await auth();

  // if there is no session, return 401:
  if (!session) {
    return {
      success: false,
      error: {
        type: "AuthorizationError",
        message: "Unauthorized",
      },
    };
  }

  // Get the locale with next-intl:
  const locale = await getLocale();

  try {
    const url = drupalClientViewer.buildUrl(`/${locale}/webform_rest/submit`);

    // Submit to Drupal.
    const result = await drupalClientViewer.fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify({
        webform_id: "contact",
        ...values,
      }),
      headers: {
        "Content-Type": "application/json",
        // Pass the token to authenticate the request:
        Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
      },
    });

    if (!result.ok) {
      throw new Error();
    }

    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        type: "Error",
        message: error.message,
      },
    };
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { getAuth } from "@/lib/auth/get-auth";
import { ContactFormInputs, contactFormSchema } from "@/lib/zod/contact-form";

import { drupalClientViewer } from "../../lib/drupal/drupal-client";

export async function createContactSubmissionAction(values: ContactFormInputs) {
  // Because we want to allow only registered users to submit
  // to the contact webform, let's get the session:
  const session = await getAuth();

  // if there is no session, return an error:
  if (!session) {
    return {
      success: false,
      error: {
        type: "AuthorizationError",
        message: "Unauthorized",
      },
    };
  }

  const validatedInputs = contactFormSchema.safeParse(values);

  if (!validatedInputs.success) {
    return {
      success: false,
      error: {
        type: "ValidationError",
        message: "Name, email, subject, and message are required",
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
        ...validatedInputs.data,
      }),
      headers: {
        "Content-Type": "application/json",
        // Pass the token to authenticate the request:
        Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
      },
    });

    // Fetch does not throw on an error status, so we need to check it manually:
    if (!result.ok) {
      throw new Error("Failed to submit the contact form");
    }

    // Revalidate the path:
    revalidatePath(`/${locale}/dashboard`);

    return {
      success: true,
      error: undefined,
    };
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    return {
      success: false,
      error: {
        type: "FetchError",
        message: error.message,
      },
    };
  }
}

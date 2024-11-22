"use server";

import { getLocale } from "next-intl/server";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import {
  RegisterFormInputs,
  registerFormSchema,
} from "@/lib/zod/register-form";

export async function registerAction(values: RegisterFormInputs) {
  const locale = await getLocale();

  const validatedInputs = registerFormSchema.safeParse(values);

  if (!validatedInputs.success) {
    return {
      success: false,
      error: {
        type: "ValidationError",
        message: "Name and email are required",
      },
    };
  }

  try {
    const url = drupalClientViewer.buildUrl("/user/register?_format=json");

    // Do a call to drupal to register the user:
    const result = await drupalClientViewer.fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify({
        name: [{ value: validatedInputs.data.name }],
        mail: [{ value: validatedInputs.data.email }],
        preferred_langcode: [
          {
            value: locale,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      // Make sure we are doing this call as
      // anonymous user:
      withAuth: false,
    });

    if (!result.ok) {
      return {
        success: false,
        error: result.statusText,
      };
    }

    return { success: true, error: undefined };
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    return { error: error.message };
  }
}

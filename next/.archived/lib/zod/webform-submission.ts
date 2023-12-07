import { z } from "zod";

const WebformSubmissionRawSchema = z.object({
  title: z.string(),
  webform_submission: z.record(z.unknown()),
  // processed_submission: z.record(z.record(z.unknown())),
});

const WebformSubmissionSchema = z.object({
  formTitle: z.string(),
  formData: z.array(z.tuple([z.string(), z.any()])),
});

export function validateAndCleanupWebformSubmission(
  submission: WebformSubmissionRaw,
): WebformSubmission | null {
  try {
    const { title, webform_submission } =
      WebformSubmissionRawSchema.parse(submission);
    return {
      formTitle: title,
      formData: Object.entries(webform_submission),
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues }, null, 2));
    return null;
  }
}

export type WebformSubmissionRaw = z.infer<typeof WebformSubmissionRawSchema>;
export type WebformSubmission = z.infer<typeof WebformSubmissionSchema>;

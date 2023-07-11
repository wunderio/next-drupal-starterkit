import { z } from "zod";

const FormattedDateValue = z.object({
  value: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/),
  format: z.literal("Y-m-d\\TH:i:sP"),
});

const TargetEntity = z.object({
  target_id: z.union([z.string(), z.number()]),
  target_type: z.string(),
  target_uuid: z.string().uuid(),
  url: z.string(),
});

// const MetaTag = z.object({
//   tag: z.literal("meta"),
//   attributes: z.object({
//     name: z.string(),
//     content: z.string(),
//   }),
// });

// Commented out properties do exist, but are not currently needed.
const WebformSubmissionsListItemSchema = z.object({
  // changed: z.array(FormattedDateValue),
  completed: z.array(FormattedDateValue),
  // created: z.array(FormattedDateValue),
  // current_page: z.array(z.unknown()),
  // entity_id: z.array(z.unknown()),
  // entity_type: z.array(z.unknown()),
  // in_draft: z.array(z.object({ value: z.boolean() })),
  // langcode: z.array(z.object({ value: z.string() })),
  // locked: z.array(z.object({ value: z.boolean() })),
  // metatag: z.array(MetaTag),
  // notes: z.array(z.unknown()),
  // remote_addr: z.array(z.object({ value: z.string() })),
  // serial: z.array(z.object({ value: z.number() })),
  // sid: z.array(z.object({ value: z.number() })),
  // sticky: z.array(z.object({ value: z.boolean() })),
  // token: z.array(z.object({ value: z.string() })),
  // uid: z.array(TargetEntity),
  // uri: z.array(z.object({ value: z.string() })),
  uuid: z.array(z.object({ value: z.string().uuid() })),
  webform_id: z.array(TargetEntity),
});

export function validateAndCleanupWebformSubmissionList(
  submissions: WebformSubmissionsListItem[],
): WebformSubmissionsListItem[] | null {
  try {
    return submissions.map((s) => WebformSubmissionsListItemSchema.parse(s));
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues }, null, 2));
    return null;
  }
}

export type WebformSubmissionsListItem = z.infer<
  typeof WebformSubmissionsListItemSchema
>;

// Strangely, when there are no results, result.content is a string containing "[]"
export type WebformSubmissionsListEmpty = {
  content: "[]";
};

export function isWebformSubmissionsListEmpty(
  submissionsView: WebformSubmissionsListEmpty | WebformSubmissionsListItem[],
): submissionsView is WebformSubmissionsListEmpty {
  return "content" in submissionsView && submissionsView.content === "[]";
}

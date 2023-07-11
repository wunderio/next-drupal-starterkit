import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { env } from "@/env";

export type ResourceType = "node--frontpage" | "node--page" | "node--article";

export function getNodePageJsonApiParams(resourceType: ResourceType) {
  const apiParams = new DrupalJsonApiParams().addFilter(
    "field_site.meta.drupal_internal__target_id",
    env.DRUPAL_SITE_ID,
  );
  // The page content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      .addFields("node--page", [
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }

  // The frontpage content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--frontpage") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      // Only published frontpages:
      .addFilter("status", "1")
      .addFields("node--frontpage", [
        "title",
        "field_content_elements",
        "metatag",
      ]);
  }

  // The article content type has an image field, and author information:
  if (resourceType === "node--article") {
    apiParams.addInclude(["field_image", "uid"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }

  return apiParams;
}

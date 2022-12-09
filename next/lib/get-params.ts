import { DrupalJsonApiParams } from "drupal-jsonapi-params";

export function getNodePageJsonApiParams(resourceType: string) {
  const apiParams = new DrupalJsonApiParams().addFilter(
    "field_site.meta.drupal_internal__target_id",
    process.env.DRUPAL_SITE_ID
  );
  // The landing page content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--landing_page") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
      ])
      .addFields("node--landing_page", [
        "title",
        "field_content_elements",
        "path",
        "status",
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
    ]);
  }

  return apiParams.getQueryObject();
}

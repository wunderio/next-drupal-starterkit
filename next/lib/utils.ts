import { GetStaticPropsContext } from "next";
import { DrupalClient, DrupalNode } from "next-drupal";
import { twMerge } from "tailwind-merge";
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";

import { Translations } from "@/lib/contexts/language-links-context";
import { WebformSubmission } from "@/types";

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`;
}

/**
 * Given a node, it will return the node translations for it.
 */
export const getNodeTranslatedVersions = async (
  node: DrupalNode,
  context: GetStaticPropsContext,
  drupal: DrupalClient
) => {
  const nodeTranslations: Translations = {};
  for (let i = 0; i < context.locales.length; i++) {
    const lang = context.locales[i];
    const translated = await drupal.getResource(node.type, node.id, {
      locale: lang,
      defaultLocale: context.defaultLocale,
      withAuth: true,
    });
    // Only consider a translation if there is actually a translated node:
    nodeTranslations[translated.langcode] = translated.path.alias;
  }
  return nodeTranslations;
};

export function isRelative(url: string) {
  return !new RegExp("^(?:[a-z]+:)?//", "i").test(url);
}

/**
 * Gets a youtube id from a youtube url
 * Taken from https://gist.github.com/takien/4077195
 */
export function getYouTubeId(url: string) {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
}

/**
 * Returns an empty array if the result is empty, or the array of results.
 *
 * We are using a drupal rest view for this, and it has this strange behaviour for empty results.
 *
 * @param result
 */
export function handleWebFormSubmissionsViewResult(result: any) {
  // Strangely, when there are no results, the result is a string containing "[]"
  if (result.content === "[]") {
    return [];
  }
  return result;
}

export function handleRawWebFormSubmission(result: any): WebformSubmission {
  console.log(result);
  return {
    formTitle: result.title,
    formData: Object.entries(result.webform_submission),
  };
}

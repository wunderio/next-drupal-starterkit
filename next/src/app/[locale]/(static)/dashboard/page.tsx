import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { HeadingPage } from "@/components/heading--page";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { formatDate } from "@/lib/utils";
import {
  isWebformSubmissionsListEmpty,
  validateAndCleanupWebformSubmissionList,
  WebformSubmissionsListEmpty,
  WebformSubmissionsListItem,
} from "@/lib/zod/webform-submission-list";

import { auth } from "@/auth";
import { LinkWithLocale } from "@/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("user-dashboard"),
  };
}

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const session = await auth();

  const url = drupalClientViewer.buildUrl(
    `/${locale}/rest/my-webform-submissions?_format=json`,
  );

  const result = await drupalClientViewer.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
    },
  });

  const submissionsViewResult = (await result.json()) as
    | WebformSubmissionsListEmpty
    | WebformSubmissionsListItem[];

  const submissions = isWebformSubmissionsListEmpty(submissionsViewResult)
    ? []
    : validateAndCleanupWebformSubmissionList(submissionsViewResult);

  return (
    <>
      <HeadingPage>{t("user-dashboard")}</HeadingPage>
      <p className="my-6 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("user-dashboard-intro-greeting", { username: session.user.name })}
      </p>
      <table className="w-full text-left border-collapse">
        <thead className="font-bold text-white border border-primary-700 bg-primary-700 text-heading-xs">
          <tr>
            <th className="px-3 py-4">{t("form")}</th>
            <th className="px-3 py-4">{t("date")}</th>
            <th className="px-3 py-4">{t("more-details")}</th>
          </tr>
        </thead>
        <tbody className="text-sm bg-white text-steelgray">
          {submissions.map((submission) => (
            <tr
              key={submission.uuid[0]["value"]}
              className="border border-graysuit"
            >
              <td className="p-3">{submission.webform_id[0]["target_id"]}</td>
              <td className="p-3">
                {formatDate(submission.completed[0]["value"], locale)}
              </td>
              <td className="p-3">
                <LinkWithLocale
                  href={{
                    pathname:
                      "/dashboard/webforms/[webformName]/[webformSubmissionUuid]",
                    params: {
                      webformName: submission.webform_id[0]["target_id"],
                      webformSubmissionUuid: submission.uuid[0]["value"],
                    },
                  }}
                  className="hyperlink"
                >
                  {t("see-more")}
                </LinkWithLocale>
              </td>
            </tr>
          ))}

          {submissions.length === 0 && (
            <tr className="border border-graysuit">
              <td colSpan={3} className="p-3">
                {t("no-submissions-yet")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

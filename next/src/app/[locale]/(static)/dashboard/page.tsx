import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeadingPage } from "@/components/heading--page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAuth } from "@/lib/auth/get-auth";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { formatDate } from "@/lib/utils";
import {
  isWebformSubmissionsListEmpty,
  validateAndCleanupWebformSubmissionList,
  WebformSubmissionsListEmpty,
  WebformSubmissionsListItem,
} from "@/lib/zod/webform-submission-list";

import { LinkWithLocale } from "@/i18n/routing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t("user-dashboard"),
  };
}

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations();

  const session = await getAuth();

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
      <p className="text-md/xl text-scapaflow my-6 text-justify sm:text-lg">
        {t("user-dashboard-intro-greeting", { username: session.user.name })}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("form")}</TableHead>
            <TableHead>{t("date")}</TableHead>
            <TableHead className="text-right">{t("more-details")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.uuid[0]["value"]}>
              <TableCell className="font-medium">
                {submission.webform_id[0]["target_id"]}
              </TableCell>
              <TableCell>
                {formatDate(submission.completed[0]["value"], locale)}
              </TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
          {submissions.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="p-3">
                {t("no-submissions-yet")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

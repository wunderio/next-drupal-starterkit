import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { HeadingPage } from "@/components/heading--page";
import { getAuth } from "@/lib/auth/get-auth";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import {
  validateAndCleanupWebformSubmission,
  WebformSubmissionRaw,
} from "@/lib/zod/webform-submission";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LinkWithLocale } from "@/i18n/routing";

type DashboardPageParams = {
  params: {
    locale: string;
    webformName: string;
    webformSubmissionUuid: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("form-submission-details"),
  };
}

export default async function DashboardPage({
  params: { locale, webformName, webformSubmissionUuid },
}: DashboardPageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const session = await getAuth();

  const url = drupalClientViewer.buildUrl(
    `/${locale}/webform_rest/${webformName}/complete_submission/${webformSubmissionUuid}`,
  );

  const result = await drupalClientViewer.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
    },
  });

  if (!result.ok) {
    return notFound();
  }

  const rawSubmission = (await result.json()) as WebformSubmissionRaw;
  const submission = validateAndCleanupWebformSubmission(rawSubmission);

  return (
    <>
      <HeadingPage>{t("form-submission-details")}</HeadingPage>
      <LinkWithLocale href="/dashboard" className="block mt-4 hyperlink">
        {t("back-to-dashboard")}
      </LinkWithLocale>
      <p className="my-6 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("form-submission-intro-text", { form: submission.formTitle })}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("form-field")}</TableHead>
            <TableHead>{t("form-value")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submission.formData.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

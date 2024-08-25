import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import { Meta } from "@/components/meta";
import { redirectExpiredSessionToLoginPage } from "@/lib/auth/redirect-expired-login";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import {
  validateAndCleanupWebformSubmission,
  WebformSubmission,
  WebformSubmissionRaw,
} from "@/lib/zod/webform-submission";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function DashboardPage({
  submission,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={t("form-submission-details")} metatags={[]} />
      <HeadingPage>{t("form-submission-details")}</HeadingPage>
      <Link href="/dashboard" className="hyperlink mt-4 block">
        {t("back-to-dashboard")}
      </Link>
      <p className="my-6 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("form-submission-intro-text", { form: submission.formTitle })}
      </p>
      <table className="w-full border-collapse text-left">
        <thead className="border border-primary-700 bg-primary-700 text-heading-xs font-bold text-white">
          <tr>
            <th className="px-3 py-4">{t("form-field")}</th>
            <th className="px-3 py-4">{t("form-value")}</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-steelgray">
          {submission.formData.map(([key, value]) => (
            <tr key={key} className="border border-graysuit">
              <td className="p-3">{key}</td>
              <td className="p-3">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  CommonPageProps & {
    submission: WebformSubmission;
  }
> = async ({ locale, params, resolvedUrl, req, res }) => {
  const commonPageProps = getCommonPageProps({ locale });

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return redirectExpiredSessionToLoginPage(locale, resolvedUrl);
  }

  const url = drupalClientViewer.buildUrl(
    `/${locale}/webform_rest/${params.webformName}/complete_submission/${params.webformSubmissionUuid}`,
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
    return {
      notFound: true,
    };
  }

  const rawSubmission = (await result.json()) as WebformSubmissionRaw;
  const submission = validateAndCleanupWebformSubmission(rawSubmission);

  return {
    props: {
      ...(await commonPageProps),
      submission,
    },
  };
};
